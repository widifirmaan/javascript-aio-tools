import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.resolve(__dirname, '..');
const outputDir = path.resolve(REPO_ROOT, 'raw_screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const tasks = [
  { name: 'Dashboard', file: 'index.html', scrollY: 60 },
  { name: 'PDF to Word', file: 'tools/pdf-word.html' },
  { name: 'QR Code Studio', file: 'tools/qr-code.html' },
  { name: 'PDF Studio', file: 'tools/pdf-tools.html' },
  { name: 'Developer Toolbox', file: 'tools/dev-tools.html', action: (page) => page.click('#btnSampleJson').catch(() => {}) },
  { name: 'Background Remover', file: 'tools/remove-bg.html' },
  { name: 'Image Compressor', file: 'tools/image-compressor.html' },
  { name: 'Scientific Calculator', file: 'tools/calculator.html' },
  { name: 'Image Converter', file: 'tools/image-converter.html' },
  { name: 'Text Editor', file: 'tools/text-editor.html' },
  { name: 'Tire Comparison', file: 'tools/tire-comp.html' },
];

async function preparePage(page, task, isMobile) {
  // Inject style to kill preloader and force AOS visible immediately
  await page.addStyleTag({
    content: `
      #preloader { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }
      [data-aos] { opacity: 1 !important; transform: none !important; visibility: visible !important; }
    `
  });

  await page.evaluate((task) => {
    const p = document.getElementById('preloader');
    if (p) p.remove();
    document.querySelectorAll('[data-aos]').forEach(el => {
      el.classList.add('aos-animate');
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.visibility = 'visible';
    });
    if (task.scrollY) {
      window.scrollTo(0, task.scrollY);
    }
  }, task);

  if (task.action) {
    await task.action(page);
  }

  await sleep(600);
}

async function run() {
  console.log('Capturing local tools from:', REPO_ROOT);
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--allow-file-access-from-files'],
  });

  const desktopViewport = { width: 1440, height: 900, deviceScaleFactor: 1.5 };
  const mobileViewport = { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true };

  for (const task of tasks) {
    const fileUrl = `file://${path.join(REPO_ROOT, task.file)}`;
    console.log(`\nCapturing [${task.name}] from ${task.file}`);

    // Desktop
    const dPage = await browser.newPage();
    await dPage.setViewport(desktopViewport);
    try {
      await dPage.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
      await preparePage(dPage, task, false);
      const dOut = path.join(outputDir, `${task.name} Desktop.png`);
      await dPage.screenshot({ path: dOut, type: 'png' });
      console.log(`  [Desktop] -> ${path.basename(dOut)}`);
    } catch (e) {
      console.error(`  [Desktop Fail] ${e.message}`);
    } finally {
      await dPage.close();
    }

    // Mobile
    const mPage = await browser.newPage();
    await mPage.setViewport(mobileViewport);
    try {
      await mPage.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });
      await preparePage(mPage, task, true);
      const mOut = path.join(outputDir, `${task.name} Mobile.png`);
      await mPage.screenshot({ path: mOut, type: 'png' });
      console.log(`  [Mobile]  -> ${path.basename(mOut)}`);
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
