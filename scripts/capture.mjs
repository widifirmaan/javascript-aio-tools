import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://javascript-aio-tools.pages.dev';
const outputDir = path.resolve(__dirname, '../raw_screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const tasks = [
  { name: 'Dashboard', path: '/' },
  { name: 'PDF to Word', path: '/tools/pdf-word' },
  { name: 'QR Code Studio', path: '/tools/qr-code' },
  { name: 'PDF Studio', path: '/tools/pdf-tools' },
  { name: 'Developer Toolbox', path: '/tools/dev-tools' },
  { name: 'Background Remover', path: '/tools/remove-bg' },
  { name: 'Image Compressor', path: '/tools/image-compressor' },
  { name: 'Scientific Calculator', path: '/tools/calculator' },
  { name: 'Image Converter', path: '/tools/image-converter' },
  { name: 'Text Editor', path: '/tools/text-editor' },
  { name: 'Tire Comparison', path: '/tools/tire-comp' },
];

async function run() {
  console.log(`Starting capture from ${BASE_URL}...`);
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const desktopViewport = { width: 1440, height: 900, deviceScaleFactor: 1.5 };
  const mobileViewport = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

  for (const task of tasks) {
    const url = `${BASE_URL}${task.path}`;
    console.log(`\nCapturing [${task.name}] -> ${url}`);

    // Desktop
    const dPage = await browser.newPage();
    await dPage.setViewport(desktopViewport);
    try {
      await dPage.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      await sleep(1000);
      const dOut = path.join(outputDir, `${task.name} Desktop.png`);
      await dPage.screenshot({ path: dOut, type: 'png' });
      console.log(`  [Desktop] -> ${dOut}`);
    } catch (e) {
      console.error(`  [Desktop Fail] ${e.message}`);
    } finally {
      await dPage.close();
    }

    // Mobile
    const mPage = await browser.newPage();
    await mPage.setViewport(mobileViewport);
    try {
      await mPage.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      await sleep(1000);
      const mOut = path.join(outputDir, `${task.name} Mobile.png`);
      await mPage.screenshot({ path: mOut, type: 'png' });
      console.log(`  [Mobile]  -> ${mOut}`);
    } catch (e) {
      console.error(`  [Mobile Fail] ${e.message}`);
    } finally {
      await mPage.close();
    }
  }

  await browser.close();
  console.log('\nAll raw screenshots captured successfully!');
}

run().catch(console.error);
