import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { kaguraCharacters } from '@/lib/nine/kaguraCharacters';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || '私を構成する9人のシノビ少女';

    // キャラクター名を解決
    const characterNames: string[] = [];

    const cParam = searchParams.get('c');
    if (cParam) {
      const parts = cParam.split('-');
      for (let i = 0; i < 9; i++) {
        if (i < parts.length && parts[i] !== '') {
          const idx = parseInt(parts[i], 10);
          if (!isNaN(idx) && idx >= 0 && idx < kaguraCharacters.length) {
            characterNames.push(kaguraCharacters[idx].name);
          } else {
            characterNames.push('');
          }
        } else {
          characterNames.push('');
        }
      }
    } else {
      // 旧形式 ?s1=slug&s2=slug...
      for (let i = 1; i <= 9; i++) {
        const slug = searchParams.get(`s${i}`);
        if (slug) {
          const char = kaguraCharacters.find(c => c.slug === slug);
          characterNames.push(char ? char.name : '');
        } else {
          characterNames.push('');
        }
      }
    }

    const hasAny = characterNames.some(n => n !== '');

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
              /* キャラクター名グリッド */
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  width: '100%',
                  justifyContent: 'center',
                }}
              >
                {characterNames.map((name, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '30%',
                      height: '64px',
                      borderRadius: '12px',
                      backgroundColor: name ? '#fdf2f8' : '#f8fafc',
                      border: name ? '2px solid #f472b6' : '2px dashed #cbd5e1',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        fontSize: name ? '20px' : '16px',
                        fontWeight: name ? 'bold' : 'normal',
                        color: name ? '#9d174d' : '#94a3b8',
                      }}
                    >
                      {name || '?'}
                    </div>
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
