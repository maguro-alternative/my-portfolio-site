import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { dolphinCharacters } from '@/lib/nine/dolphinCharacters';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || '私を構成する9人のドルフィン';

    // slug からキャラクター名を解決
    const characterNames: string[] = [];
    for (let i = 1; i <= 9; i++) {
      const slug = searchParams.get(`s${i}`);
      if (slug) {
        const char = dolphinCharacters.find(c => c.slug === slug);
        characterNames.push(char ? char.name : '');
      } else {
        characterNames.push('');
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
                      backgroundColor: name ? '#eef2ff' : '#f8fafc',
                      border: name ? '2px solid #818cf8' : '2px dashed #cbd5e1',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        fontSize: name ? '20px' : '16px',
                        fontWeight: name ? 'bold' : 'normal',
                        color: name ? '#3730a3' : '#94a3b8',
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
