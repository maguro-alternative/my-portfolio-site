import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  // 許可されたドメインのみ
  const allowedDomains = ['hpgames.jp', 'www.marv.jp', 'seesaawiki.jp'];
  const url = new URL(decodeURIComponent(imageUrl));
  
  if (!allowedDomains.some(domain => url.hostname.includes(domain))) {
    return new NextResponse('Domain not allowed', { status: 403 });
  }

  try {
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      return new NextResponse('Failed to fetch image', { status: response.status });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Failed to proxy image', { status: 500 });
  }
}
