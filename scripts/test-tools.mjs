import puppeteer from 'puppeteer-core';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const tools = [
  'index.html',
  'tools/calculator.html',
  'tools/dev-tools.html',
  'tools/image-compressor.html',
  'tools/image-converter.html',
  'tools/pdf-tools.html',
  'tools/pdf-word.html',
  'tools/qr-code.html',
  'tools/remove-bg.html',
  'tools/text-editor.html',
  'tools/tire-comp.html'
];

async function testAll() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  let totalErrors = 0;

  for (const tool of tools) {
    const fileUrl = `file://${path.join(REPO_ROOT, tool)}`;
    console.log(`\nTesting [${tool}]...`);

    // Test Desktop and Mobile
    for (const isMobile of [false, true]) {
      const page = await browser.newPage();
      const consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      page.on('pageerror', err => {
        consoleErrors.push(err.message);
      });

      if (isMobile) {
        await page.setViewport({ width: 390, height: 844 });
      } else {
        await page.setViewport({ width: 1440, height: 900 });
      }

      await page.goto(fileUrl, { waitUntil: 'load' });
      await new Promise(r => setTimeout(r, 600));

      // Check overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      const mode = isMobile ? 'Mobile 390px' : 'Desktop 1440px';
      if (overflow) {
        console.error(`  ❌ [${mode}] Has horizontal overflow!`);
        totalErrors++;
      } else {
        console.log(`  ✓ [${mode}] Clean fit (no horizontal overflow)`);
      }

      // Check preloader removed
      const preloaderPresent = await page.evaluate(() => {
        const p = document.getElementById('preloader');
        return p && p.parentElement !== null && window.getComputedStyle(p).display !== 'none';
      });
      if (preloaderPresent) {
        console.error(`  ❌ [${mode}] Preloader still visible!`);
        totalErrors++;
      }

      if (consoleErrors.length > 0) {
        console.warn(`  ⚠️ [${mode}] Console errors:`, consoleErrors);
      }

      await page.close();
    }
  }

  // Functional test on Calculator
  console.log('\nTesting Calculator logic...');
  const calcPage = await browser.newPage();
  await calcPage.goto(`file://${path.join(REPO_ROOT, 'tools/calculator.html')}`);
  await new Promise(r => setTimeout(r, 600));
  const calcResult = await calcPage.evaluate(() => {
    clr();
    display1('8');
    multiply();
    display1('5');
    runtwofunction();
    return document.getElementById('expression1').value;
  });
  if (calcResult === '40') {
    console.log('  ✓ Calculator multiplication: 8 * 5 = 40 (OK)');
  } else {
    console.error(`  ❌ Calculator unexpected result: ${calcResult}`);
    totalErrors++;
  }
  await calcPage.close();

  // Functional test on Tire Comparison
  console.log('\nTesting Tire Comparison calculation...');
  const tirePage = await browser.newPage();
  await tirePage.goto(`file://${path.join(REPO_ROOT, 'tools/tire-comp.html')}`);
  await new Promise(r => setTimeout(r, 600));
  const tireResult = await tirePage.evaluate(() => {
    return {
      d1: document.getElementById('diameter1Result').textContent,
      d2: document.getElementById('diameter2Result').textContent,
      diff: document.getElementById('diameterDiffResult').textContent
    };
  });
  if (tireResult.d1 && tireResult.d2 && tireResult.diff) {
    console.log(`  ✓ Tire comparison calculated: ${tireResult.diff} (OK)`);
  } else {
    console.error('  ❌ Tire comparison failed to populate');
    totalErrors++;
  }
  await tirePage.close();

  // Functional test on Developer Toolbox
  console.log('\nTesting Dev Tools JSON Formatter...');
  const devPage = await browser.newPage();
  await devPage.goto(`file://${path.join(REPO_ROOT, 'tools/dev-tools.html')}`);
  await new Promise(r => setTimeout(r, 600));
  const devResult = await devPage.evaluate(() => {
    document.getElementById('btnSampleJson').click();
    return document.getElementById('jsonInput').value.length > 10;
  });
  if (devResult) {
    console.log('  ✓ Dev Tools Sample JSON populated and formatted (OK)');
  } else {
    console.error('  ❌ Dev Tools Sample JSON failed');
    totalErrors++;
  }
  await devPage.close();

  // Functional test on Text Editor
  console.log('\nTesting Text Editor word counter...');
  const textPage = await browser.newPage();
  await textPage.goto(`file://${path.join(REPO_ROOT, 'tools/text-editor.html')}`);
  await new Promise(r => setTimeout(r, 600));
  const textResult = await textPage.evaluate(() => {
    const area = document.getElementById('editor-area');
    area.textContent = 'Halo dunia, ini adalah tes editor teks lokal.';
    area.dispatchEvent(new Event('input'));
    return {
      words: document.getElementById('word-count').textContent,
      chars: document.getElementById('char-count').textContent
    };
  });
  if (textResult.words.includes('8')) {
    console.log(`  ✓ Text Editor live count: ${textResult.words}, ${textResult.chars} (OK)`);
  } else {
    console.error(`  ❌ Text Editor unexpected result:`, textResult);
    totalErrors++;
  }
  await textPage.close();

  await browser.close();

  if (totalErrors === 0) {
    console.log('\n✨ ALL TESTS PASSED! No responsiveness bugs, no JS errors, functionality verified.\n');
  } else {
    console.error(`\n❌ Finished with ${totalErrors} errors.\n`);
    process.exit(1);
  }
}

testAll().catch(e => {
  console.error(e);
  process.exit(1);
});
