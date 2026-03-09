import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { kaguraCharacters } from '@/lib/nine/kaguraCharacters';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || '私を構成する9人のシノビ少女';

    // ?c= パラメータからキャラクター情報を解決（インデックスのダッシュ区切り）
    const characterImages: string[] = [];
    const characterNames: string[] = [];

    const cParam = searchParams.get('c');
    if (cParam) {
      const parts = cParam.split('-');
      for (let i = 0; i < 9; i++) {
        if (i < parts.length && parts[i] !== '') {
          const idx = parseInt(parts[i], 10);
          if (!isNaN(idx) && idx >= 0 && idx < kaguraCharacters.length) {
            characterImages.push(kaguraCharacters[idx].imageUrl);
            characterNames.push(kaguraCharacters[idx].name);
          } else {
            characterImages.push('');
            characterNames.push('');
          }
        } else {
          characterImages.push('');
          characterNames.push('');
        }
      }
    } else {
      // 旧形式 ?s1=slug&s2=slug... にも対応
      for (let i = 1; i <= 9; i++) {
        const slug = searchParams.get(`s${i}`);
        if (slug) {
          const char = kaguraCharacters.find(c => c.slug === slug);
          if (char) {
            characterImages.push(char.imageUrl);
            characterNames.push(char.name);
          } else {
            characterImages.push('');
            characterNames.push('未選択');
          }
        } else {
          characterImages.push('');
          characterNames.push('');
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
            backgroundColor: '#fce5f0',
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
            <div
              style={{
                display: 'flex',
                fontSize: '40px',
                fontWeight: 'bold',
                color: '#1e293b',
                marginBottom: '32px',
                textAlign: 'center',
                justifyContent: 'center',
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
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
                    backgroundColor: characterImages[index] && characterImages[index] !== '' ? 'transparent' : '#fdf2f8',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    height: '160px',
                    border: '2px solid #f9a8d4',
                    position: 'relative',
                    width: '31.5%',
                  }}
                >
                  {characterImages[index] && characterImages[index] !== '' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', position: 'relative' }}>
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {characterNames[index] || '未選択'}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                      <div
                        style={{
                          display: 'flex',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#be185d',
                          marginBottom: '8px',
                        }}
                      >
                        #{index + 1}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          fontSize: '14px',
                          color: '#f9a8d4',
                        }}
                      >
                        未選択
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              marginTop: '20px',
              fontSize: '18px',
              color: '#be185d',
              display: 'flex',
              alignItems: 'center',
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
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
