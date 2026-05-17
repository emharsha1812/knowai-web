import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const printUrl = `${baseUrl}/watch-notes/${slug}/print`;

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(printUrl, { waitUntil: 'networkidle', timeout: 30000 });

    // Give KaTeX an extra moment to finish rendering math
    await page.waitForTimeout(500);

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '20mm', right: '20mm' },
    });

    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="watch-notes-${slug}.pdf"`,
      },
    });
  } catch (error) {
    console.error('[PDF] generation failed:', error);
    return NextResponse.json(
      { error: 'PDF generation failed. Make sure the dev server is running.' },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}
