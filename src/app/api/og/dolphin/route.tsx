import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || '私を構成する9つのドルフィンウェーブキャラクター';
    
    const characters: string[] = [];
    for (let i = 1; i <= 9; i++) {
      const char = searchParams.get(`c${i}`);
      if (char) characters.push(decodeURIComponent(char));
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
              padding: '40px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              width: '90%',
              maxWidth: '1100px',
            }}
          >
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '40px',
                textAlign: 'center',
              }}
            >
              {title}
            </h1>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
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
                    backgroundColor: '#f1f5f9',
                    borderRadius: '12px',
                    padding: '20px',
                    height: '140px',
                    border: '2px solid #cbd5e1',
                  }}
                >
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
                      fontSize: '16px',
                      color: '#334155',
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {characters[index] || '未選択'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              marginTop: '24px',
              fontSize: '20px',
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
