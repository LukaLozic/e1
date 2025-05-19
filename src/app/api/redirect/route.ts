import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const to = searchParams.get('to');

  // Validate the URL
  if (!to || !to.startsWith('https://chaturbate.com/')) {
    return new NextResponse('Invalid URL', { status: 400 });
  }

  try {
    const url = new URL(to);
    const allowedHostnames = ['chaturbate.com', 'www.chaturbate.com'];

    if (!allowedHostnames.includes(url.hostname)) {
      return new NextResponse('Blocked hostname', { status: 403 });
    }

    return NextResponse.redirect(to);
  } catch {
    return new NextResponse('Invalid redirect URL', { status: 500 });
  }
}
