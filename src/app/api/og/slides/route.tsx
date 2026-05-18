import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'スライド';
    const date = searchParams.get('date') || '';

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
            background: 'linear-gradient(135deg, #1a0533 0%, #4a1d8e 50%, #1a0533 100%)',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '24px',
              padding: '48px 56px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              width: '90%',
              maxWidth: '1080px',
            }}
          >
            <div
              style={{
                display: 'flex',
                fontSize: '16px',
                color: '#c084fc',
                marginBottom: '16px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
              }}
            >
              SLIDES
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: title.length > 30 ? '36px' : '48px',
                fontWeight: 'bold',
                color: '#ffffff',
                textAlign: 'center',
                lineHeight: 1.3,
                maxWidth: '900px',
              }}
            >
              {title}
            </div>
            {date && (
              <div
                style={{
                  display: 'flex',
                  fontSize: '20px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginTop: '24px',
                }}
              >
                {date}
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: '24px',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            マグロポートフォリオ
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response('Failed to generate the image', { status: 500 });
  }
}
