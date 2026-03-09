import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { kaguraCharacters } from '@/lib/nine/kaguraCharacters';

export const runtime = 'edge';

// slug から拡張子を判定（marv.jp/seesaawiki は jpg）
function getImageExt(slug: string): string {
  const char = kaguraCharacters.find(c => c.slug === slug);
  if (!char) return 'png';
  if (char.imageUrl.endsWith('.jpg')) return 'jpg';
  return 'png';
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
}

async function fetchImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const base64 = arrayBufferToBase64(buf);
    const contentType = res.headers.get('content-type') || 'image/png';
    return `data:${contentType};base64,${base64}`;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = new URL(request.url).origin;
    const title = searchParams.get('title') || '私を構成する9人のシノビ少女';

    // キャラクター情報を解決
    const characters: { name: string; slug: string }[] = [];

    const cParam = searchParams.get('c');
    if (cParam) {
      const parts = cParam.split('-');
      for (let i = 0; i < 9; i++) {
        if (i < parts.length && parts[i] !== '') {
          const idx = parseInt(parts[i], 10);
          if (!isNaN(idx) && idx >= 0 && idx < kaguraCharacters.length) {
            characters.push({ name: kaguraCharacters[idx].name, slug: kaguraCharacters[idx].slug });
          } else {
            characters.push({ name: '', slug: '' });
          }
        } else {
          characters.push({ name: '', slug: '' });
        }
      }
    } else {
      for (let i = 1; i <= 9; i++) {
        const slug = searchParams.get(`s${i}`);
        if (slug) {
          const char = kaguraCharacters.find(c => c.slug === slug);
          characters.push(char ? { name: char.name, slug: char.slug } : { name: '', slug: '' });
        } else {
          characters.push({ name: '', slug: '' });
        }
      }
    }

    const hasAny = characters.some(c => c.name !== '');

    // 全画像を並列で事前取得し、base64 data URLに変換
    const imageDataUrls: (string | null)[] = await Promise.all(
      characters.map(char => {
        if (!char.slug) return Promise.resolve(null);
        const ext = getImageExt(char.slug);
        return fetchImageAsDataUrl(`${origin}/og-images/kagura/${char.slug}.${ext}`);
      })
    );
    const useImages = imageDataUrls.some(url => url !== null);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f472b6 0%, #c084fc 100%)',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '40px 48px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              width: '90%',
              maxWidth: '1080px',
            }}
          >
            {/* タイトル */}
            <div
              style={{
                display: 'flex',
                fontSize: '42px',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: hasAny ? '28px' : '12px',
                textAlign: 'center',
              }}
            >
              {title}
            </div>

            {hasAny ? (
              /* キャラクターグリッド */
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                {characters.map((char, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '30%',
                      height: useImages ? '160px' : '64px',
                      borderRadius: '12px',
                      backgroundColor: char.name ? '#fdf2f8' : '#f8fafc',
                      border: char.name ? '2px solid #f472b6' : '2px dashed #cbd5e1',
                      overflow: 'hidden',
                    }}
                  >
                    {imageDataUrls[index] ? (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imageDataUrls[index]!}
                          width={110}
                          height={110}
                          style={{ objectFit: 'contain' }}
                          alt=""
                        />
                        <div
                          style={{
                            display: 'flex',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: '#9d174d',
                            marginTop: '4px',
                          }}
                        >
                          {char.name}
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          fontSize: char.name ? '20px' : '16px',
                          fontWeight: char.name ? 'bold' : 'normal',
                          color: char.name ? '#9d174d' : '#94a3b8',
                        }}
                      >
                        {char.name || '?'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  fontSize: '20px',
                  color: '#64748b',
                  marginTop: '4px',
                }}
              >
                9人の閃乱カグラのキャラクターを選んで画像として保存
              </div>
            )}
          </div>

          {/* フッター */}
          <div
            style={{
              display: 'flex',
              marginTop: '20px',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.9)',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            🌸 閃乱カグラ
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response('Failed to generate the image', {
      status: 500,
    });
  }
}
