import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright-core';

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
    let executablePath: string | undefined;
    let launchArgs: string[] = [];

    if (process.env.VERCEL) {
      // On Vercel: download a serverless Chromium binary to /tmp at runtime
      const sparticuz = await import('@sparticuz/chromium');
      executablePath = await sparticuz.default.executablePath();
      launchArgs = sparticuz.default.args;
    }
    // Locally: playwright-core finds the browser installed by the `playwright` dev dependency

    browser = await chromium.launch({
      args: launchArgs,
      executablePath,
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto(printUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(500);

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '20mm', right: '20mm' },
    });

    return new NextResponse(new Uint8Array(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="watch-notes-${slug}.pdf"`,
      },
    });
  } catch (error) {
    console.error('[PDF] generation failed:', error);
    return NextResponse.json(
      { error: 'PDF generation failed.' },
      { status: 500 }
    );
  } finally {
    if (browser) await browser.close();
  }
}
