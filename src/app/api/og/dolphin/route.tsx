import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || '私を構成する9つのドルフィンウェーブキャラクター';
    
    // キャラクター画像URLを取得（最大9個）
    const characterImages: string[] = [];
    const characterNames: string[] = [];
    for (let i = 1; i <= 9; i++) {
      const img = searchParams.get(`img${i}`);
      const name = searchParams.get(`c${i}`);
      if (img) characterImages.push(decodeURIComponent(img));
      if (name) characterNames.push(decodeURIComponent(name));
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
            backgroundColor: '#e5f2fc',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
              width: '90%',
              maxWidth: '1100px',
            }}
          >
            <h1
              style={{
                fontSize: '40px',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '32px',
                textAlign: 'center',
              }}
            >
              {title}
            </h1>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                width: '100%',
              }}
            >
              {[...Array(9)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: characterImages[index] ? 'transparent' : '#f1f5f9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    height: '160px',
                    border: '2px solid #cbd5e1',
                    position: 'relative',
                  }}
                >
                  {characterImages[index] ? (
                    <>
                      <img
                        src={characterImages[index]}
                        alt={characterNames[index] || `Character ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                          padding: '8px',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '12px',
                            color: 'white',
                            textAlign: 'center',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {characterNames[index] || '未選択'}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#64748b',
                          marginBottom: '8px',
                        }}
                      >
                        #{index + 1}
                      </div>
                      <div
                        style={{
                          fontSize: '14px',
                          color: '#94a3b8',
                        }}
                      >
                        未選択
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              marginTop: '20px',
              fontSize: '18px',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
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
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
