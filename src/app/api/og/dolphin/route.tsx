import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { dolphinCharacters } from '@/lib/nine/dolphinCharacters';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const origin = new URL(request.url).origin;
    const title = searchParams.get('title') || '私を構成する9人のドルフィン';

    // slug からキャラクター情報を解決
    const characters: { name: string; slug: string }[] = [];
    for (let i = 1; i <= 9; i++) {
      const slug = searchParams.get(`s${i}`);
      if (slug) {
        const char = dolphinCharacters.find(c => c.slug === slug);
        characters.push(char ? { name: char.name, slug: char.slug } : { name: '', slug: '' });
      } else {
        characters.push({ name: '', slug: '' });
      }
    }

    const hasAny = characters.some(c => c.name !== '');

    // ローカル画像が利用可能かチェック（最初のキャラで判定）
    let useImages = false;
    if (hasAny) {
      const firstChar = characters.find(c => c.slug !== '');
      if (firstChar) {
        try {
          const res = await fetch(`${origin}/og-images/dolphin/${firstChar.slug}.png`, { method: 'HEAD' });
          useImages = res.ok;
        } catch {
          useImages = false;
        }
      }
    }

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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
                      backgroundColor: char.name ? '#eef2ff' : '#f8fafc',
                      border: char.name ? '2px solid #818cf8' : '2px dashed #cbd5e1',
                      overflow: 'hidden',
                    }}
                  >
                    {useImages && char.slug ? (
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
                          src={`${origin}/og-images/dolphin/${char.slug}.png`}
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
                            color: '#3730a3',
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
                          color: char.name ? '#3730a3' : '#94a3b8',
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
                9人のドルフィンウェーブのキャラクターを選んで画像として保存
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
            🐬 ドルフィンウェーブ
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
