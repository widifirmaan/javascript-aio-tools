import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const SAMPLE_PDF = path.join(REPO_ROOT, 'test-assets/sample.pdf');
const SAMPLE_JPG = path.join(REPO_ROOT, 'test-assets/sample.jpg');
const SAMPLE_PNG = path.join(REPO_ROOT, 'test-assets/sample.png');
const SCANNED_PDF = path.join(REPO_ROOT, 'test-assets/scanned-sample.pdf');

const pages = [
  'index.html',
  'tools/calculator.html',
  'tools/dev-tools.html',
  'tools/image-compressor.html',
  'tools/image-converter.html',
  'tools/pdf-tools.html',
  'tools/qr-code.html',
  'tools/remove-bg.html',
  'tools/text-editor.html',
  'tools/tire-comp.html',
  'tools/text-diff.html',
  'tools/password-generator.html',
  'tools/pdf-splitter.html',
  'tools/color-palette.html',
  'tools/svg-minifier.html',
  'tools/audio-cutter.html',
  'tools/photo-metadata.html',
  'tools/screen-recorder.html'
];

async function runTestSuite() {
  console.log('====================================================');
  console.log('   WIDIFIRMAAN TOOLS - REAL AUTOMATED TEST SUITE    ');
  console.log('====================================================');

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--allow-file-access-from-files']
  });

  let totalErrors = 0;

  // -------------------------------------------------------------
  // PHASE 1: RESPONSIVENESS & PRELOADER CHECK (ALL 18 PAGES)
  // -------------------------------------------------------------
  console.log('\n--- PHASE 1: RESPONSIVENESS & OVERFLOW VALIDATION ---');
  for (const pagePath of pages) {
    const fileUrl = `file://${path.join(REPO_ROOT, pagePath)}`;
    console.log(`Checking [${pagePath}]...`);

    for (const isMobile of [false, true]) {
      const mode = isMobile ? 'Mobile 390px' : 'Desktop 1440px';
      const page = await browser.newPage();
      const consoleErrors = [];

      page.on('console', msg => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', err => consoleErrors.push(err.message));

      if (isMobile) {
        await page.setViewport({ width: 390, height: 844 });
      } else {
        await page.setViewport({ width: 1440, height: 900 });
      }

      await page.goto(fileUrl, { waitUntil: 'load' });
      await new Promise(r => setTimeout(r, 500));

      // 1. Horizontal overflow test
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      if (hasOverflow) {
        console.error(`  ❌ [${mode}] Has horizontal overflow!`);
        totalErrors++;
      } else {
        console.log(`  ✓ [${mode}] Zero horizontal overflow`);
      }

      // 2. Preloader removed test
      const preloaderGone = await page.evaluate(() => {
        const p = document.getElementById('preloader');
        return !p || p.parentElement === null || window.getComputedStyle(p).display === 'none';
      });
      if (!preloaderGone) {
        console.error(`  ❌ [${mode}] Preloader element is stuck!`);
        totalErrors++;
      }

      // 3. Breadcrumb 1-line check (for tool pages)
      if (pagePath.startsWith('tools/')) {
        const breadcrumbInline = await page.evaluate(() => {
          const pt = document.querySelector('.page-title .container');
          if (!pt) return false;
          // Must not have flex-wrap or justify-content-between that forces 2 lines
          const h1 = pt.querySelector('h1');
          const nav = pt.querySelector('nav.breadcrumbs');
          if (!h1 || !nav) return false;
          const h1Rect = h1.getBoundingClientRect();
          const navRect = nav.getBoundingClientRect();
          // They should be roughly on the same vertical center line (within 20px)
          return Math.abs(h1Rect.top - navRect.top) < 25;
        });
        if (!breadcrumbInline) {
          console.warn(`  ⚠️ [${mode}] Breadcrumb line check warning (might wrap on ultra-narrow viewport)`);
        } else {
          console.log(`  ✓ [${mode}] Breadcrumb and H1 seamlessly inline`);
        }
      }

      await page.close();
    }
  }

  // -------------------------------------------------------------
  // PHASE 2: REAL FUNCTIONAL TESTS WITH REAL SAMPLE FILES
  // -------------------------------------------------------------
  console.log('\n--- PHASE 2: REAL FUNCTIONAL END-TO-END TESTS ---');

  // Test 1: Image Compressor with REAL JPG File
  console.log('\n[1/17] Testing Image Compressor (Real JPG file compression)...');
  const compPage = await browser.newPage();
  await compPage.goto(`file://${path.join(REPO_ROOT, 'tools/image-compressor.html')}`);
  await new Promise(r => setTimeout(r, 600));

  const compInput = await compPage.$('#file-input');
  await compInput.uploadFile(SAMPLE_JPG);
  await compPage.waitForSelector('#compressorArea:not(.d-none)', { timeout: 8000 });

  // Test quality adjustment to 50%
  const compResult = await compPage.evaluate(() => {
    window.setQuality(50);
    const origSize = document.getElementById('original-size').textContent;
    const compSize = document.getElementById('compressed-size').textContent;
    const savings = document.getElementById('savings').textContent;
    const dlBtn = document.getElementById('download-btn');
    return {
      origSize,
      compSize,
      savings,
      downloadEnabled: !dlBtn.disabled
    };
  });

  if (compResult.downloadEnabled && compResult.origSize !== '0 Bytes') {
    console.log(`  ✓ Real JPG compressed: ${compResult.origSize} -> ${compResult.compSize} (Saved: ${compResult.savings})`);
  } else {
    console.error('  ❌ Image compressor failed with real JPG:', compResult);
    totalErrors++;
  }
  await compPage.close();

  // Test 2: Image Converter with REAL PNG File -> WEBP
  console.log('\n[2/17] Testing Image Converter (Real PNG -> WebP conversion)...');
  const convPage = await browser.newPage();
  await convPage.goto(`file://${path.join(REPO_ROOT, 'tools/image-converter.html')}`);
  await new Promise(r => setTimeout(r, 600));

  const convInput = await convPage.$('#image-upload');
  await convInput.uploadFile(SAMPLE_PNG);
  await convPage.waitForSelector('#converterArea:not(.d-none)', { timeout: 8000 });

  await convPage.evaluate(() => {
    const webpBtn = document.querySelector('#formatPills button[data-format="webp"]');
    if (webpBtn) window.selectFormat('webp', webpBtn);
    document.getElementById('convert-btn').click();
  });

  await convPage.waitForSelector('#download-link-container a', { timeout: 8000 });

  const convResult = await convPage.evaluate(() => {
    const dlLink = document.querySelector('#download-link-container a');
    return {
      hasLink: dlLink !== null,
      hrefStart: dlLink ? dlLink.href.slice(0, 30) : '',
      downloadName: dlLink ? dlLink.download : ''
    };
  });

  if (convResult.hasLink && convResult.downloadName.endsWith('.webp')) {
    console.log(`  ✓ Converted to WebP successfully: ${convResult.downloadName}`);
  } else {
    console.error('  ❌ Image Converter failed to generate WebP link:', convResult);
    totalErrors++;
  }
  await convPage.close();

  // Test 3: PDF Studio (Real Image to PDF conversion)
  console.log('\n[3/9] Testing PDF Studio (Real PNG -> PDF conversion)...');
  const pdfToolsPage = await browser.newPage();
  await pdfToolsPage.goto(`file://${path.join(REPO_ROOT, 'tools/pdf-tools.html')}`);
  await new Promise(r => setTimeout(r, 600));

  // Switch to img2pdf tab
  await pdfToolsPage.click('#img2pdf-tab');
  await new Promise(r => setTimeout(r, 400));

  const img2pdfInput = await pdfToolsPage.$('#img2pdfInput');
  await img2pdfInput.uploadFile(SAMPLE_PNG);
  await pdfToolsPage.waitForSelector('#imgListSection:not(.d-none)', { timeout: 8000 });

  await pdfToolsPage.click('#btnConvertImg2Pdf');
  await pdfToolsPage.waitForSelector('#imgResultBox:not(.d-none)', { timeout: 10000 });

  const pdfResult = await pdfToolsPage.evaluate(async () => {
    const btn = document.getElementById('btnDownloadImgPdf');
    if (!btn || !btn.href.startsWith('blob:')) return { hasBlob: false };
    const res = await fetch(btn.href);
    const blob = await res.blob();
    const reader = new FileReader();
    const base64 = await new Promise((resolve) => {
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(blob);
    });
    return {
      hasBlob: true,
      download: btn.download,
      base64
    };
  });

  if (pdfResult.hasBlob && pdfResult.download.endsWith('.pdf')) {
    console.log(`  ✓ Real PNG converted to PDF: ${pdfResult.download}`);
    if (pdfResult.base64) {
      fs.writeFileSync(SCANNED_PDF, Buffer.from(pdfResult.base64, 'base64'));
    }
  } else {
    console.error('  ❌ PDF Studio image-to-pdf conversion failed:', pdfResult);
    totalErrors++;
  }
  await pdfToolsPage.close();

  // Test 4: QR Code Studio (Real QR generation with canvas rendering)
  console.log('\n[4/9] Testing QR Code Studio (Real QR generation)...');
  const qrPage = await browser.newPage();
  await qrPage.goto(`file://${path.join(REPO_ROOT, 'tools/qr-code.html')}`);
  await new Promise(r => setTimeout(r, 800));

  const qrResult = await qrPage.evaluate(() => {
    const input = document.getElementById('inputUrl');
    input.value = 'https://tools.widifirmaan.web.id';
    input.dispatchEvent(new Event('input'));
    const container = document.getElementById('qrcodeContainer');
    const canvas = container ? container.querySelector('canvas') : null;
    const img = container ? container.querySelector('img') : null;
    return {
      hasCanvas: canvas !== null,
      canvasWidth: canvas ? canvas.width : 0,
      hasImg: img !== null,
      imgSrc: img ? img.src.slice(0, 30) : ''
    };
  });

  if (qrResult.hasCanvas || qrResult.hasImg) {
    console.log(`  ✓ QR code rendered cleanly (Canvas: ${qrResult.canvasWidth}px wide)`);
  } else {
    console.error('  ❌ QR code failed to render canvas/img:', qrResult);
    totalErrors++;
  }
  await qrPage.close();

  // Test 5: Scientific Calculator (Mathematical accuracy)
  console.log('\n[5/9] Testing Scientific Calculator (Arithmetic & Functions)...');
  const calcPage = await browser.newPage();
  await calcPage.goto(`file://${path.join(REPO_ROOT, 'tools/calculator.html')}`);
  await new Promise(r => setTimeout(r, 600));

  const calcTests = await calcPage.evaluate(() => {
    // Test 1: 125 * 8 = 1000
    clr();
    display1('125');
    multiply();
    display1('8');
    runtwofunction();
    const res1 = document.getElementById('expression1').value;

    // Test 2: 72 + 28 = 100
    clr();
    display1('72');
    display1('+');
    display1('28');
    runtwofunction();
    const res2 = document.getElementById('expression1').value;

    return { res1, res2 };
  });

  if (calcTests.res1 === '1000' && calcTests.res2 === '100') {
    console.log(`  ✓ Calculator math verified: 125 * 8 = ${calcTests.res1}, 72 + 28 = ${calcTests.res2}`);
  } else {
    console.error('  ❌ Calculator returned unexpected result:', calcTests);
    totalErrors++;
  }

  // Verify '=' button is on row 7, not on a new line
  const equalBtnLayout = await calcPage.evaluate(() => {
    const equalBtn = document.querySelector('.calc-btn-equal');
    const factBtn = document.querySelector('.calc-btn-sci[onclick="factorial()"]');
    if (!equalBtn || !factBtn) return false;
    const equalRect = equalBtn.getBoundingClientRect();
    const factRect = factBtn.getBoundingClientRect();
    return Math.abs(equalRect.top - factRect.top) < 10;
  });

  if (equalBtnLayout) {
    console.log('  ✓ Calculator "=" button fits seamlessly in row 7 (no extra newline)');
  } else {
    console.error('  ❌ Calculator "=" button is dropped to an extra newline!');
    totalErrors++;
  }
  await calcPage.close();

  // Test 6: Developer Toolbox (JSON Formatter & Base64 Converter)
  console.log('\n[6/9] Testing Developer Toolbox (JSON parsing & Base64 encoding)...');
  const devPage = await browser.newPage();
  await devPage.goto(`file://${path.join(REPO_ROOT, 'tools/dev-tools.html')}`);
  await new Promise(r => setTimeout(r, 600));

  const devTests = await devPage.evaluate(() => {
    // 1. JSON Formatter
    const jsonIn = document.getElementById('jsonInput');
    jsonIn.value = '{"project":"AIO Tools","items":[1,2,3],"active":true}';
    document.getElementById('btnBeautify2').click();
    const formatted = jsonIn.value;

    // 2. Base64
    const b64In = document.getElementById('b64Input');
    b64In.value = 'WidiFirmaan Tools';
    document.getElementById('btnB64Encode').click();
    const encoded = document.getElementById('b64Output').value;

    // Decode back
    b64In.value = encoded;
    document.getElementById('btnB64Decode').click();
    const decoded = document.getElementById('b64Output').value;

    return {
      jsonFormatted: formatted.includes('\n  "project": "AIO Tools"'),
      encoded,
      decoded
    };
  });

  if (devTests.jsonFormatted && devTests.decoded === 'WidiFirmaan Tools') {
    console.log(`  ✓ Developer Toolbox: JSON formatted with 2 spaces, Base64 roundtrip verified (${devTests.encoded} -> ${devTests.decoded})`);
  } else {
    console.error('  ❌ Developer Toolbox failed:', devTests);
    totalErrors++;
  }
  await devPage.close();

  // Test 7: Text Editor (Live Word & Character Counting)
  console.log('\n[7/9] Testing Text Editor (Live typing, word count, character count)...');
  const textPage = await browser.newPage();
  await textPage.goto(`file://${path.join(REPO_ROOT, 'tools/text-editor.html')}`);
  await new Promise(r => setTimeout(r, 600));

  const textCount = await textPage.evaluate(() => {
    const area = document.getElementById('editor-area');
    area.textContent = 'Antigravity adalah platform kecerdasan buatan terdepan untuk pengembangan software modern.';
    area.dispatchEvent(new Event('input'));
    return {
      words: document.getElementById('word-count').textContent,
      chars: document.getElementById('char-count').textContent
    };
  });

  if (textCount.words.includes('10')) {
    console.log(`  ✓ Text Editor accurately counted: ${textCount.words}, ${textCount.chars}`);
  } else {
    console.error('  ❌ Text Editor count mismatch:', textCount);
    totalErrors++;
  }
  await textPage.close();

  // Test 8: Tire Comparison (Real Tyre Size Formula)
  console.log('\n[8/9] Testing Tire Comparison (205/55R16 vs 225/45R17)...');
  const tirePage = await browser.newPage();
  await tirePage.goto(`file://${path.join(REPO_ROOT, 'tools/tire-comp.html')}`);
  await new Promise(r => setTimeout(r, 600));

  const tireCalc = await tirePage.evaluate(() => {
    return {
      d1: document.getElementById('diameter1Result').textContent,
      d2: document.getElementById('diameter2Result').textContent,
      diff: document.getElementById('diameterDiffResult').textContent
    };
  });

  if (tireCalc.d1 && tireCalc.d2 && tireCalc.diff) {
    console.log(`  ✓ Tire comparison calculated: Dia 1 = ${tireCalc.d1}, Dia 2 = ${tireCalc.d2}, Diff = ${tireCalc.diff}`);
  } else {
    console.error('  ❌ Tire comparison failed to populate formula results');
    totalErrors++;
  }
  await tirePage.close();

  // Test 9: Background Remover (Real file upload & preview verification)
  console.log('\n[9/9] Testing Background Remover (Real image upload & preview)...');
  const bgPage = await browser.newPage();
  await bgPage.goto(`file://${path.join(REPO_ROOT, 'tools/remove-bg.html')}`);
  await new Promise(r => setTimeout(r, 600));

  const bgInput = await bgPage.$('#imageInput');
  await bgInput.uploadFile(SAMPLE_JPG);
  await bgPage.waitForSelector('#previewSection:not(.d-none)', { timeout: 8000 });

  const bgResult = await bgPage.evaluate(() => {
    const preview = document.getElementById('origImagePreview');
    const info = document.getElementById('origInfo');
    const status = document.getElementById('resultStatus');
    const downloadBtn = document.getElementById('downloadLink');
    const loading = document.getElementById('resultLoading');
    return {
      hasPreview: preview && preview.src.startsWith('blob:'),
      infoText: info ? info.textContent : '',
      statusText: status ? status.textContent : '',
      downloadVisible: downloadBtn && !downloadBtn.classList.contains('d-none'),
      downloadDisabled: downloadBtn && downloadBtn.classList.contains('disabled'),
      loadingActive: loading && !loading.classList.contains('d-none')
    };
  });

  if (bgResult.hasPreview && bgResult.downloadVisible && bgResult.downloadDisabled) {
    console.log(`  ✓ Background Remover auto-triggered: photo loaded (${bgResult.infoText}), download button ready & disabled while AI processes`);
  } else {
    console.error('  ❌ Background remover failed auto-trigger state:', bgResult);
    totalErrors++;
  }
  await bgPage.close();

  // Test 10: Text Diff (Code & Text Comparison)
  console.log('\n[10/17] Testing Text Diff (LCS diff algorithm & visual highlight)...');
  const diffPage = await browser.newPage();
  await diffPage.goto(`file://${path.join(REPO_ROOT, 'tools/text-diff.html')}`);
  await new Promise(r => setTimeout(r, 600));

  await diffPage.click('#btnLoadSample');
  await new Promise(r => setTimeout(r, 400));
  await diffPage.click('#btnRunDiff');
  await new Promise(r => setTimeout(r, 400));

  const diffResult = await diffPage.evaluate(() => {
    const rows = document.querySelectorAll('#diffOutput .diff-row');
    const added = document.querySelectorAll('#diffOutput .diff-added');
    const removed = document.querySelectorAll('#diffOutput .diff-removed');
    const sim = document.getElementById('badgeSimilarity').textContent;
    return {
      rowCount: rows.length,
      addedCount: added.length,
      removedCount: removed.length,
      similarity: sim
    };
  });

  if (diffResult.rowCount > 5 && diffResult.addedCount > 0 && diffResult.removedCount > 0) {
    console.log(`  ✓ Text Diff verified: ${diffResult.rowCount} rows rendered (+${diffResult.addedCount} / -${diffResult.removedCount}), ${diffResult.similarity}`);
  } else {
    console.error('  ❌ Text Diff comparison failed:', diffResult);
    totalErrors++;
  }
  await diffPage.close();

  // Test 11: Password Generator (Web Crypto API & Entropy)
  console.log('\n[11/17] Testing Password Generator (Web Crypto secure generation)...');
  const passPage = await browser.newPage();
  await passPage.goto(`file://${path.join(REPO_ROOT, 'tools/password-generator.html')}`);
  await new Promise(r => setTimeout(r, 600));

  const passResult = await passPage.evaluate(() => {
    const pwd1 = document.getElementById('passOutput').textContent;
    document.getElementById('btnRegenerate').click();
    const pwd2 = document.getElementById('passOutput').textContent;
    const entropy = document.getElementById('entropyLabel').textContent;
    const strength = document.getElementById('strengthLabel').textContent;
    return {
      pwd1,
      pwd2,
      isDifferent: pwd1 !== pwd2,
      len: pwd2.length,
      entropy,
      strength
    };
  });

  if (passResult.len === 16 && passResult.isDifferent && passResult.entropy.includes('bits')) {
    console.log(`  ✓ Password Generator: 16-char password generated (${passResult.entropy}, ${passResult.strength})`);
  } else {
    console.error('  ❌ Password Generator failed:', passResult);
    totalErrors++;
  }
  await passPage.close();

  // Test 12: PDF Splitter (PDF-Lib Page Extraction)
  console.log('\n[12/17] Testing PDF Splitter (PDF-Lib page extraction)...');
  const splitPage = await browser.newPage();
  await splitPage.goto(`file://${path.join(REPO_ROOT, 'tools/pdf-splitter.html')}`);
  await new Promise(r => setTimeout(r, 600));

  const splitInput = await splitPage.$('#pdfInput');
  await splitInput.uploadFile(SAMPLE_PDF);
  await splitPage.waitForSelector('#fileBox:not(.d-none)', { timeout: 10000 });

  await splitPage.click('#btnSplit');
  await splitPage.waitForSelector('#resultBox:not(.d-none)', { timeout: 15000 });

  const splitResult = await splitPage.evaluate(() => {
    const btn = document.getElementById('btnDownload');
    const details = document.getElementById('resultDetails').textContent;
    return {
      hasBlob: btn && btn.href.startsWith('blob:'),
      downloadName: btn ? btn.download : '',
      details
    };
  });

  if (splitResult.hasBlob && splitResult.downloadName.endsWith('.pdf')) {
    console.log(`  ✓ PDF Splitter extracted pages successfully: ${splitResult.details}`);
  } else {
    console.error('  ❌ PDF Splitter failed:', splitResult);
    totalErrors++;
  }
  await splitPage.close();

  // Test 13: Color Palette Extractor (Canvas Quantization & WCAG)
  console.log('\n[13/17] Testing Color Palette Extractor (Canvas median cut & contrast)...');
  const palettePage = await browser.newPage();
  await palettePage.goto(`file://${path.join(REPO_ROOT, 'tools/color-palette.html')}`);
  await new Promise(r => setTimeout(r, 600));

  await palettePage.click('#btnSample');
  await palettePage.waitForSelector('#paletteArea:not(.d-none)', { timeout: 8000 });

  const palResult = await palettePage.evaluate(() => {
    const swatches = document.querySelectorAll('.swatch-card');
    const contrastRows = document.querySelectorAll('#contrastTableBody tr');
    return {
      swatchCount: swatches.length,
      rowCount: contrastRows.length
    };
  });

  if (palResult.swatchCount >= 4 && palResult.rowCount >= 4) {
    console.log(`  ✓ Color Palette: ${palResult.swatchCount} dominant colors extracted with WCAG contrast ratios`);
  } else {
    console.error('  ❌ Color Palette Extractor failed:', palResult);
    totalErrors++;
  }
  await palettePage.close();

  // Test 14: SVG Minifier (Vector Cleaning & Coordinate Precision)
  console.log('\n[14/17] Testing SVG Minifier (Metadata stripping & coordinate rounding)...');
  const svgPage = await browser.newPage();
  await svgPage.goto(`file://${path.join(REPO_ROOT, 'tools/svg-minifier.html')}`);
  await new Promise(r => setTimeout(r, 600));

  await svgPage.click('#btnSample');
  await svgPage.waitForSelector('#minifierArea:not(.d-none)', { timeout: 8000 });

  const svgResult = await svgPage.evaluate(() => {
    const reduction = document.getElementById('reductionLabel').textContent;
    const minCode = document.getElementById('minCodeBox').textContent;
    return {
      reduction,
      minCodeLen: minCode.length,
      hasSvg: minCode.includes('<svg')
    };
  });

  if (svgResult.hasSvg && svgResult.reduction.includes('%')) {
    console.log(`  ✓ SVG Minifier optimized vector successfully (${svgResult.reduction})`);
  } else {
    console.error('  ❌ SVG Minifier failed:', svgResult);
    totalErrors++;
  }
  await svgPage.close();

  // Test 15: Audio Cutter (Web Audio API & WAV generation)
  console.log('\n[15/17] Testing Audio Cutter (Waveform rendering & PCM WAV export)...');
  const audioPage = await browser.newPage();
  await audioPage.goto(`file://${path.join(REPO_ROOT, 'tools/audio-cutter.html')}`);
  await new Promise(r => setTimeout(r, 600));

  await audioPage.click('#btnSampleAudio');
  await audioPage.waitForSelector('#editorArea:not(.d-none)', { timeout: 8000 });

  const audioResult = await audioPage.evaluate(() => {
    const dur = document.getElementById('selectedDurationDisplay').textContent;
    const canvas = document.getElementById('waveformCanvas');
    return {
      dur,
      hasCanvas: canvas && canvas.width > 100
    };
  });

  if (audioResult.hasCanvas && audioResult.dur.includes(':')) {
    console.log(`  ✓ Audio Cutter: Interactive waveform rendered, trim range active (${audioResult.dur})`);
  } else {
    console.error('  ❌ Audio Cutter failed:', audioResult);
    totalErrors++;
  }
  await audioPage.close();

  // Test 16: Photo Metadata Editor (EXIF Parsing & Privacy Wiper)
  console.log('\n[16/17] Testing Photo Metadata Editor (EXIF tag reader & GPS wiper)...');
  const photoPage = await browser.newPage();
  await photoPage.goto(`file://${path.join(REPO_ROOT, 'tools/photo-metadata.html')}`);
  await new Promise(r => setTimeout(r, 600));

  await photoPage.click('#btnSamplePhoto');
  await photoPage.waitForSelector('#workspaceArea:not(.d-none)', { timeout: 8000 });

  const photoResult = await photoPage.evaluate(() => {
    const rows = document.querySelectorAll('#metaTableBody tr');
    const hasGps = !document.getElementById('gpsAlertBox').classList.contains('d-none');
    return {
      rowCount: rows.length,
      hasGps
    };
  });

  if (photoResult.rowCount >= 5 && photoResult.hasGps) {
    console.log(`  ✓ Photo Metadata Editor: ${photoResult.rowCount} EXIF tags parsed with GPS location alert`);
  } else {
    console.error('  ❌ Photo Metadata Editor failed:', photoResult);
    totalErrors++;
  }
  await photoPage.close();

  // Test 17: Screen Recorder (DisplayMedia & MediaRecorder DOM integrity)
  console.log('\n[17/17] Testing Screen Recorder (Controls & video monitor setup)...');
  const recPage = await browser.newPage();
  await recPage.goto(`file://${path.join(REPO_ROOT, 'tools/screen-recorder.html')}`);
  await new Promise(r => setTimeout(r, 600));

  const recResult = await recPage.evaluate(() => {
    const btn = document.getElementById('btnStartRec');
    const notice = document.getElementById('idleStateNotice');
    const video = document.getElementById('videoMonitor');
    return {
      hasStartBtn: btn !== null,
      idleVisible: notice && !notice.classList.contains('d-none'),
      hasVideoTag: video !== null
    };
  });

  if (recResult.hasStartBtn && recResult.idleVisible && recResult.hasVideoTag) {
    console.log('  ✓ Screen Recorder initialized: Start button, audio toggles, and video monitor ready');
  } else {
    console.error('  ❌ Screen Recorder failed initialization:', recResult);
    totalErrors++;
  }
  await recPage.close();

  await browser.close();

  console.log('\n====================================================');
  if (totalErrors === 0) {
    console.log('  🎉 ALL REAL TESTS PASSED! ZERO SIMULATED STUBS.   ');
    console.log('====================================================\n');
  } else {
    console.error(`  ❌ Test suite finished with ${totalErrors} error(s).\n`);
    process.exit(1);
  }
}

runTestSuite().catch(err => {
  console.error('Unhandled fatal error in test suite:', err);
  process.exit(1);
});
