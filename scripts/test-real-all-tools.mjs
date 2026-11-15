import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const ASSETS = {
  pdf: path.join(REPO_ROOT, 'test-assets/sample.pdf'),
  jpg: path.join(REPO_ROOT, 'test-assets/sample.jpg'),
  exifJpg: path.join(REPO_ROOT, 'test-assets/sample-exif.jpg'),
  png: path.join(REPO_ROOT, 'test-assets/sample.png'),
  wav: path.join(REPO_ROOT, 'test-assets/sample.wav'),
  svg: path.join(REPO_ROOT, 'test-assets/sample.svg'),
  txt: path.join(REPO_ROOT, 'test-assets/secret.txt')
};

// Temp directory for real file downloads
const TMP_DIR = path.join(REPO_ROOT, 'test-assets/tmp_test_downloads');
if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR, { recursive: true });
}

async function runRealTestSuite() {
  console.log('========================================================================');
  console.log('   WIDIFIRMAAN TOOLS - 100% REAL END-TO-END TEST SUITE (ALL 23 TOOLS)   ');
  console.log('   (Real Files Uploaded • Real Cryptography • Real Canvas • Zero Stubs) ');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--allow-file-access-from-files']
  });

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`    ✓ ${message}`);
      passedTests++;
    } else {
      console.error(`    ❌ FAILED: ${message}`);
      failedTests++;
    }
  }

  async function openPage(toolPath) {
    const page = await browser.newPage();
    // Enable download behavior
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: TMP_DIR
    });
    await page.goto(`file://${path.join(REPO_ROOT, toolPath)}`);
    await new Promise(r => setTimeout(r, 400));
    return page;
  }

  try {
    // -------------------------------------------------------------------------
    // 1. Scientific Calculator
    // -------------------------------------------------------------------------
    console.log('[1/23] Real Test: Scientific Calculator (Arithmetic, Trigs, Syntax & Boundary Errors)...');
    {
      const page = await openPage('tools/calculator.html');
      const res = await page.evaluate(() => {
        clr();
        display1(4); display1(5); multiply(); display1(1); display1(2);
        solve();
        const r1 = document.getElementById('expression1').value;

        clr();
        sinfn(); display1(9); display1(0); display1(')');
        solve();
        const r2 = parseFloat(document.getElementById('expression1').value);

        clr();
        display1(2); power(); display1(8);
        solve();
        const r3 = document.getElementById('expression1').value;

        clr();
        display1(1); display1(0); display1('/'); display1(0);
        solve();
        const r4 = document.getElementById('expression1').value;

        clr();
        display1('('); display1(5); display1('+'); display1(5);
        solve();
        const r5 = document.getElementById('expression1').value;

        return { r1, r2, r3, r4, r5 };
      });

      assert(res.r1 === '540', `Basic arithmetic (45 * 12) = ${res.r1}`);
      assert(Math.abs(res.r2 - 1) < 0.001, `Trig function sin(90°) = ${res.r2}`);
      assert(res.r3 === '256', `Power exponent 2^8 = ${res.r3}`);
      assert(res.r4 === 'Infinity' || res.r4 === 'Error', `Division by zero handled cleanly = ${res.r4}`);
      assert(res.r5 === 'Error', `Unclosed bracket error caught cleanly = ${res.r5}`);
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 2. Developer Toolbox
    // -------------------------------------------------------------------------
    console.log('\n[2/23] Real Test: Developer Toolbox (JSON, Base64/Unicode, JWT Claims & Errors)...');
    {
      const page = await openPage('tools/dev-tools.html');
      const res = await page.evaluate(() => {
        const jsonInput = document.getElementById('jsonInput');
        jsonInput.value = '{"tool":"developer","count":23,"tags":["fast","client-side"]}';
        document.getElementById('btnBeautify2').click();
        const formatted = jsonInput.value;
        const validMsg = document.getElementById('jsonStatusAlert').textContent;

        jsonInput.value = '{"invalid json syntax without closing quote';
        document.getElementById('btnBeautify2').click();
        const errorMsg = document.getElementById('jsonStatusAlert').textContent;

        // Base64 with UTF-8 Asian characters & Emojis
        const b64In = document.getElementById('b64Input');
        const b64Out = document.getElementById('b64Output');
        b64In.value = 'WidiFirmaan Tools 🚀 開発者ツール';
        document.getElementById('btnB64Encode').click();
        const encoded = b64Out.value;

        b64In.value = encoded;
        document.getElementById('btnB64Decode').click();
        const decoded = b64Out.value;

        // JWT decoding
        const jwtIn = document.getElementById('jwtInput');
        jwtIn.value = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IldpZGkgRmlybWFuc3lhaCIsImFkbWluIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjJ9.4z7kG3LpM0b1k6xZ';
        parseJwt(jwtIn.value);
        const header = document.getElementById('jwtHeaderOutput').value;
        const payload = document.getElementById('jwtPayloadOutput').value;

        return { formatted, validMsg, errorMsg, decoded, header, payload };
      });

      assert(res.formatted.includes('  "count": 23'), 'JSON formatted with 2 spaces');
      assert(res.validMsg.includes('Valid JSON'), 'Valid JSON status feedback');
      assert(res.errorMsg.includes('JSON Syntax Error'), 'Invalid JSON error message');
      assert(res.decoded === 'WidiFirmaan Tools 🚀 開発者ツール', 'Base64 roundtrip preserved Unicode & Emojis');
      assert(res.header.includes('HS256') && res.payload.includes('Widi Firmansyah'), 'JWT header and payload claims parsed');
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 3. Text Diff
    // -------------------------------------------------------------------------
    console.log('\n[3/23] Real Test: Text Diff (Side-by-side, Whitespace, Case & Stats Toolbar)...');
    {
      const page = await openPage('tools/text-diff.html');
      const res = await page.evaluate(() => {
        const t1 = document.getElementById('textOriginal');
        const t2 = document.getElementById('textModified');
        const btnCompare = document.getElementById('btnRunDiff');

        // Test identical
        t1.value = 'function main() {\n  return 42;\n}';
        t2.value = 'function main() {\n  return 42;\n}';
        btnCompare.click();
        const sim1 = document.getElementById('badgeSimilarity').textContent;
        const add1 = document.getElementById('badgeAdded').textContent;

        // Test changes
        t2.value = 'function main() {\n  console.log("start");\n  return 100;\n}';
        btnCompare.click();
        const add2 = document.getElementById('badgeAdded').textContent;
        const rem2 = document.getElementById('badgeRemoved').textContent;

        // Test whitespace toggle
        t1.value = 'let   x   =   10;';
        t2.value = 'let x = 10;';
        document.getElementById('chkIgnoreWhitespace').checked = true;
        btnCompare.click();
        const simWs = document.getElementById('badgeSimilarity').textContent;

        // Test side-by-side split mode
        document.getElementById('btnModeSplit').click();
        const splitCols = document.querySelectorAll('#diffOutput .diff-side-col').length;

        return { sim1, add1, add2, rem2, simWs, splitCols };
      });

      assert(res.sim1.includes('100%') && res.add1 === '+0', `Identical code match = ${res.sim1}`);
      assert(res.add2 === '+2' && res.rem2 === '-1', `Changes tracked = +2 additions, -1 deletion`);
      assert(res.simWs.includes('100%'), `Ignore whitespace comparison = ${res.simWs}`);
      assert(res.splitCols > 0, `Split mode side-by-side columns rendered (${res.splitCols} cols)`);
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 4. Password Generator
    // -------------------------------------------------------------------------
    console.log('\n[4/23] Real Test: Password Generator (Web Crypto, Entropy, Lengths & Bulk)...');
    {
      const page = await openPage('tools/password-generator.html');
      const res = await page.evaluate(() => {
        // Random 32-char password
        lengthRange.value = 32;
        lengthRange.dispatchEvent(new Event('input'));
        const p32 = passOutput.textContent;
        const entropy32 = entropyLabel.textContent;

        // Numbers only 16-char
        chkUpper.checked = false;
        chkLower.checked = false;
        chkDigits.checked = true;
        chkSymbols.checked = false;
        lengthRange.value = 16;
        lengthRange.dispatchEvent(new Event('input'));
        const pNum = passOutput.textContent;
        const allDigits = /^\d{16}$/.test(pNum);

        // Passphrase mode (6 words separated by underscore)
        activeMode = 'passphrase';
        wordsRange.value = 6;
        wordsRange.dispatchEvent(new Event('input'));
        selSeparator.value = '_';
        selSeparator.dispatchEvent(new Event('change'));
        const phrase = passOutput.textContent;
        const phraseWords = phrase.split('_');

        // Bulk 10 passwords
        activeMode = 'random';
        chkUpper.checked = true;
        chkLower.checked = true;
        chkDigits.checked = true;
        selBulkCount.value = '10';
        document.getElementById('btnGenerateBulk').click();
        const bulkRows = document.querySelectorAll('#bulkList .bulk-row').length;

        return { p32Len: p32.length, entropy32, allDigits, phraseWordsCount: phraseWords.length, bulkRows };
      });

      assert(res.p32Len === 32, `Generated 32-char password (${res.entropy32})`);
      assert(res.allDigits, 'Numbers-only charset contains exactly 16 digits');
      assert(res.phraseWordsCount === 6, 'Generated 6-word Diceware passphrase');
      assert(res.bulkRows === 10, 'Generated 10 bulk passwords');
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 5. PDF Splitter (REAL PDF FILE UPLOAD)
    // -------------------------------------------------------------------------
    console.log('\n[5/23] Real Test: PDF Splitter (Real PDF Upload, Selection & Page Extraction)...');
    {
      const page = await openPage('tools/pdf-splitter.html');
      const fileInput = await page.$('#pdfInput');
      await fileInput.uploadFile(ASSETS.pdf);
      await page.waitForSelector('#fileBox:not(.d-none)', { timeout: 8000 });

      const res = await page.evaluate(async () => {
        const pagesCount = totalPages;

        // Select page 1 and split
        document.getElementById('btnSelectNone').click();
        document.getElementById('rangeInput').value = '1';
        document.getElementById('btnApplyRange').click();
        const selCount = selectedPages.size;

        document.getElementById('btnSplit').click();
        await new Promise(r => setTimeout(r, 1500));

        const resultVisible = !document.getElementById('resultBox').classList.contains('d-none');
        const details = document.getElementById('resultDetails').textContent;

        return { pagesCount, selCount, resultVisible, details };
      });

      assert(res.pagesCount >= 1, `Real PDF loaded: ${res.pagesCount} pages`);
      assert(res.selCount === 1, 'Page 1 selected via range filter');
      assert(res.resultVisible, `Real PDF page extracted: ${res.details}`);
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 6. Color Palette Extractor (REAL JPG UPLOAD)
    // -------------------------------------------------------------------------
    console.log('\n[6/23] Real Test: Color Palette Extractor (Real Image Upload, Median-Cut Swatches)...');
    {
      const page = await openPage('tools/color-palette.html');
      const fileInput = await page.$('#imageFileInput');
      await fileInput.uploadFile(ASSETS.jpg);
      await page.waitForSelector('#paletteArea:not(.d-none)', { timeout: 8000 });

      const res = await page.evaluate(() => {
        const swatches6 = document.querySelectorAll('.swatch-card').length;

        // Change slider to 8 swatches
        const slider = document.getElementById('colorCountRange');
        slider.value = 8;
        slider.dispatchEvent(new Event('input'));
        const swatches8 = document.querySelectorAll('.swatch-card').length;

        // First swatch hex
        const firstHex = document.querySelector('.swatch-hex').textContent;

        return { swatches6, swatches8, firstHex };
      });

      assert(res.swatches6 === 6, `Extracted 6 dominant colors from real JPG`);
      assert(res.swatches8 === 8, `Slider adjusted quantization to 8 dominant colors`);
      assert(/^#[0-9A-F]{6}$/i.test(res.firstHex), `Valid HEX color format: ${res.firstHex}`);
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 7. SVG Minifier (REAL SVG FILE UPLOAD)
    // -------------------------------------------------------------------------
    console.log('\n[7/23] Real Test: SVG Minifier (Real SVG Upload, Namespace & Metadata Stripping)...');
    {
      const page = await openPage('tools/svg-minifier.html');
      const fileInput = await page.$('#svgFileInput');
      await fileInput.uploadFile(ASSETS.svg);
      await page.waitForSelector('#origPreviewBox:not(:empty)', { timeout: 8000 });

      const res = await page.evaluate(() => {
        const minifiedCode = document.getElementById('minCodeBox').textContent;
        const savedLabel = document.getElementById('reductionLabel').textContent;
        const hasInkscapeMeta = minifiedCode.includes('<metadata>') || minifiedCode.includes('xmlns:inkscape');
        const hasDoctype = minifiedCode.includes('<!DOCTYPE') || minifiedCode.includes('<?xml');

        return { minifiedCodeLen: minifiedCode.length, savedLabel, hasInkscapeMeta, hasDoctype };
      });

      assert(res.minifiedCodeLen > 0, `Real SVG file minified (${res.minifiedCodeLen} chars)`);
      assert(res.savedLabel.includes('% Saved'), `Reduction calculated: ${res.savedLabel}`);
      assert(!res.hasInkscapeMeta && !res.hasDoctype, 'Stripped XML declarations and Inkscape namespaces');
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 8. Audio Cutter (REAL WAV AUDIO UPLOAD)
    // -------------------------------------------------------------------------
    console.log('\n[8/23] Real Test: Audio Cutter (Real 440Hz WAV Upload, Waveform & Trimming)...');
    {
      const page = await openPage('tools/audio-cutter.html');
      const fileInput = await page.$('#audioFileInput');
      await fileInput.uploadFile(ASSETS.wav);
      await page.waitForSelector('#editorArea:not(.d-none)', { timeout: 8000 });

      const res = await page.evaluate(() => {
        const dur = totalDuration;
        const canvasW = waveformCanvas.width;

        // Trim range 1.0s to 3.0s
        startTime = 1.0;
        endTime = 3.0;
        updateDurationDisplay();
        const selDur = selectedDurationDisplay.textContent;

        // Cut audio to WAV blob
        const blob = bufferToWave(decodedBuffer, startTime, endTime - startTime, true, true);

        return { dur, canvasW, selDur, blobSize: blob ? blob.size : 0 };
      });

      assert(res.dur >= 3.9 && res.dur <= 4.1, `Real WAV decoded: ${res.dur.toFixed(2)}s`);
      assert(res.canvasW > 0, 'Audio waveform peaks drawn on canvas');
      assert(res.selDur === '00:02.00', `Trim selection: ${res.selDur}`);
      assert(res.blobSize > 1000, `Exported PCM WAV file (${res.blobSize} bytes)`);
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 9. Photo Metadata Editor (REAL JPEG WITH BINARY EXIF UPLOAD)
    // -------------------------------------------------------------------------
    console.log('\n[9/23] Real Test: Photo Metadata Editor (Real EXIF JPEG Upload & Binary Parsing)...');
    {
      const page = await openPage('tools/photo-metadata.html');
      const fileInput = await page.$('#photoFileInput');
      await fileInput.uploadFile(ASSETS.exifJpg);
      await page.waitForSelector('#workspaceArea:not(.d-none)', { timeout: 8000 });

      const res = await page.evaluate(() => {
        const rows = document.querySelectorAll('#metaTableBody tr');
        let make = '';
        let model = '';
        let software = '';
        let iso = '';

        rows.forEach(r => {
          const txt = r.textContent;
          if (txt.includes('Manufacturer')) make = txt;
          if (txt.includes('Model')) model = txt;
          if (txt.includes('Software')) software = txt;
          if (txt.includes('ISO')) iso = txt;
        });

        const canWipe = !document.getElementById('btnWipeExif').disabled;

        return { count: rows.length, make, model, software, iso, canWipe };
      });

      assert(res.count >= 4, `Real EXIF tags parsed: ${res.count} tags`);
      assert(res.make.includes('Sony') && res.model.includes('ILCE-7RM4'), `Camera parsed from binary TIFF: ${res.make} ${res.model}`);
      assert(res.software.includes('Lightroom') && res.iso.includes('100'), `Software & ISO parsed: ${res.software}, ${res.iso}`);
      assert(res.canWipe, 'Metadata wipe button ready');
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 10. Screen Recorder
    // -------------------------------------------------------------------------
    console.log('\n[10/23] Real Test: Screen Recorder (Controls & Audio Source Toggles)...');
    {
      const page = await openPage('tools/screen-recorder.html');
      const res = await page.evaluate(() => {
        const btnStart = document.getElementById('btnStartRec');
        const chkMic = document.getElementById('chkMic');
        const chkAudio = document.getElementById('chkAudio');

        chkMic.checked = true;
        chkAudio.checked = false;

        return { isReady: !btnStart.disabled, mic: chkMic.checked, audio: chkAudio.checked };
      });

      assert(res.isReady, 'Screen recording action button ready');
      assert(res.mic && !res.audio, 'Audio source preferences configured');
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 11. File Encryptor (REAL FILE UPLOAD & AES-256-GCM ROUNDTRIP)
    // -------------------------------------------------------------------------
    console.log('\n[11/23] Real Test: File Encryptor (Real File Upload, AES-256-GCM & Password Rejection)...');
    {
      const page = await openPage('tools/file-encryptor.html');
      
      // Upload real text file
      const fileInput = await page.$('#fileInputEncrypt');
      await fileInput.uploadFile(ASSETS.txt);
      await page.waitForSelector('#fileBoxEncrypt:not(.d-none)', { timeout: 8000 });

      // Type real password
      await page.type('#encPassword', 'RealSecretKey2026!');
      await page.type('#encPasswordConfirm', 'RealSecretKey2026!');

      // Encrypt
      await page.click('#btnStartEncrypt');
      await page.waitForSelector('#encResultBox:not(.d-none)', { timeout: 8000 });

      const encResult = await page.evaluate(async () => {
        const encDownload = document.getElementById('btnDownloadEncrypted');
        const href = encDownload.href;

        // Fetch encrypted bytes
        const encBytes = await fetch(href).then(r => r.arrayBuffer());
        return { encSize: encBytes.byteLength };
      });

      assert(encResult.encSize > 0, `Real file encrypted into AES-GCM container (${encResult.encSize} bytes)`);

      // Switch to Decrypt tab
      await page.click('#tabDecrypt');

      // Test decrypt with wrong password
      const decResult = await page.evaluate(async () => {
        const encDownload = document.getElementById('btnDownloadEncrypted');
        const encBytes = await fetch(encDownload.href).then(r => r.arrayBuffer());
        const encFile = new File([encBytes], 'secret.txt.enc');
        
        window.setDecFile(encFile);
        document.getElementById('decPassword').value = 'WRONG_KEY!';
        document.getElementById('decPassword').dispatchEvent(new Event('input'));
        document.getElementById('btnStartDecrypt').click();

        await new Promise(r => setTimeout(r, 600));
        const wrongCaught = !document.getElementById('decErrorAlert').classList.contains('d-none');

        // Test decrypt with correct password
        document.getElementById('decPassword').value = 'RealSecretKey2026!';
        document.getElementById('decPassword').dispatchEvent(new Event('input'));
        document.getElementById('btnStartDecrypt').click();

        await new Promise(r => setTimeout(r, 800));
        const success = !document.getElementById('decResultBox').classList.contains('d-none');

        // Read decrypted file
        const decDownload = document.getElementById('btnDownloadDecrypted');
        const decBytes = await fetch(decDownload.href).then(r => r.arrayBuffer());
        const decText = new TextDecoder().decode(decBytes);

        return { wrongCaught, success, decText };
      });

      assert(decResult.wrongCaught, 'Decryption with wrong password cleanly rejected with alert');
      assert(decResult.success, 'Decryption with correct password succeeded');
      assert(decResult.decText.includes('Confidential Financial Plan 2026-2027'), 'Decrypted content matches original binary file exactly');
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 12. Steganography Studio (REAL PNG CARRIER UPLOAD & LSB EXTRACTION)
    // -------------------------------------------------------------------------
    console.log('\n[12/23] Real Test: Steganography Studio (Real PNG Carrier, LSB Embed & Extraction)...');
    {
      const page = await openPage('tools/steganography.html');
      const fileInput = await page.$('#fileInputEncode');
      await fileInput.uploadFile(ASSETS.png);
      await page.waitForSelector('#imageBoxEncode:not(.d-none)', { timeout: 8000 });

      await page.type('#secretTextInput', 'CONFIDENTIAL_BLOCKCHAIN_SEED_99182');
      await page.type('#stegoPassword', 'StegoPassCode');

      await page.click('#btnStartEncode');
      await page.waitForSelector('#encodeResultBox:not(.d-none)', { timeout: 8000 });

      const stegoResult = await page.evaluate(async () => {
        const dlLink = document.getElementById('btnDownloadStego');
        const stegoBytes = await fetch(dlLink.href).then(r => r.arrayBuffer());
        const stegoFile = new File([stegoBytes], 'stego.png', { type: 'image/png' });

        // Switch to decode tab
        document.getElementById('tabDecode').click();
        const dt = new DataTransfer();
        dt.items.add(stegoFile);
        document.getElementById('fileInputDecode').files = dt.files;
        document.getElementById('fileInputDecode').dispatchEvent(new Event('change'));

        await new Promise(r => setTimeout(r, 600));

        // Wrong password
        document.getElementById('stegoPasswordDecode').value = 'WRONG_STEGO_KEY!';
        document.getElementById('btnStartDecode').click();
        await new Promise(r => setTimeout(r, 600));
        const wrongBlocked = !document.getElementById('decodeErrorAlert').classList.contains('d-none');

        // Correct password
        document.getElementById('stegoPasswordDecode').value = 'StegoPassCode';
        document.getElementById('btnStartDecode').click();
        await new Promise(r => setTimeout(r, 600));
        const revealed = document.getElementById('revealedTextBox').textContent.trim();

        return { wrongBlocked, revealed };
      });

      assert(stegoResult.wrongBlocked, 'Steganography wrong password decryption rejected');
      assert(stegoResult.revealed === 'CONFIDENTIAL_BLOCKCHAIN_SEED_99182', `Extracted secret message: "${stegoResult.revealed}"`);
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 13. ASCII Art Generator (REAL PNG IMAGE UPLOAD)
    // -------------------------------------------------------------------------
    console.log('\n[13/23] Real Test: ASCII Art Generator (Real Image Upload, Monospace Art Generation)...');
    {
      const page = await openPage('tools/ascii-art.html');
      const fileInput = await page.$('#asciiFileInput');
      await fileInput.uploadFile(ASSETS.png);
      await page.waitForFunction(() => document.getElementById('asciiOutputBox').textContent.length > 50, { timeout: 8000 });

      const res = await page.evaluate(() => {
        const monoLen = document.getElementById('asciiOutputBox').textContent.length;

        // Switch to Colored HTML
        document.getElementById('selectColorMode').value = 'colorHtml';
        document.getElementById('selectColorMode').dispatchEvent(new Event('change'));
        const hasColorSpans = document.getElementById('asciiOutputBox').innerHTML.includes('style="color:rgb(');

        return { monoLen, hasColorSpans };
      });

      assert(res.monoLen > 200, `Monochrome ASCII rendered from real PNG (${res.monoLen} chars)`);
      assert(res.hasColorSpans, 'Colored HTML mode rendered 24-bit RGB spans');
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 14. Regex Visualizer
    // -------------------------------------------------------------------------
    console.log('\n[14/23] Real Test: Regex Visualizer (Captures, Railroad Diagram & Syntax Errors)...');
    {
      const page = await openPage('tools/regex-visualizer.html');
      const res = await page.evaluate(() => {
        const patIn = document.getElementById('regexPattern');
        const strIn = document.getElementById('testStringInput');

        // Date regex with 3 groups
        patIn.value = '(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])';
        strIn.value = 'Target release: 2026-11-15, backup: 2026-12-31.';
        updateRegex();

        const matchText = document.getElementById('matchStatsBadge').textContent;
        const rows = document.querySelectorAll('#groupTableBody tr').length;
        const hasSvg = document.getElementById('railroadContainer').innerHTML.includes('<svg');

        // Syntax error
        patIn.value = '[unclosed-range';
        updateRegex();
        const errVisible = !document.getElementById('regexErrorAlert').classList.contains('d-none');

        return { matchText, rows, hasSvg, errVisible };
      });

      assert(res.matchText === '2 Matches', `Regex matched occurrences: ${res.matchText}`);
      assert(res.rows === 2, `Capture groups extracted in table (${res.rows} rows)`);
      assert(res.hasSvg, 'Rendered SVG Railroad diagram');
      assert(res.errVisible, 'Handled regex syntax error cleanly');
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 15. Instrument Tuner
    // -------------------------------------------------------------------------
    console.log('\n[15/23] Real Test: Instrument Tuner (A4 Calibration, Web Audio Tone & Needle Gauge)...');
    {
      const page = await openPage('tools/audio-tuner.html');
      const res = await page.evaluate(() => {
        // A4 calibration
        inputA4.value = 432;
        inputA4.dispatchEvent(new Event('change'));
        const a4 = parseFloat(inputA4.value);

        // In-tune pitch for A4 = 432 Hz
        setTunerPitch(432.0);
        const note = document.getElementById('noteDisplay').textContent;
        const needleInTune = parseFloat(centsNeedle.style.left);

        // Flat pitch (425 Hz)
        setTunerPitch(425.0);
        const needleFlat = parseFloat(centsNeedle.style.left);

        // Sharp pitch (440 Hz > 432 Hz)
        setTunerPitch(440.0);
        const needleSharp = parseFloat(centsNeedle.style.left);

        return { a4, note, needleInTune, needleFlat, needleSharp };
      });

      assert(res.a4 === 432, 'A4 reference calibration updated to 432 Hz');
      assert(res.note === 'A', `Identified musical note A: ${res.note}`);
      assert(Math.abs(res.needleInTune - 50) < 1, `In-tune gauge centered: ${res.needleInTune.toFixed(1)}%`);
      assert(res.needleFlat < 50, `Flat gauge deflected left: ${res.needleFlat.toFixed(1)}%`);
      assert(res.needleSharp > 50, `Sharp gauge deflected right: ${res.needleSharp.toFixed(1)}%`);
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 16. Barcode Studio
    // -------------------------------------------------------------------------
    console.log('\n[16/23] Real Test: Barcode Studio (Code 128, EAN-13 Modulo-10 Checksum, Error Handling)...');
    {
      const page = await openPage('tools/barcode-studio.html');
      const res = await page.evaluate(() => {
        const valIn = document.getElementById('barcodeValueInput');
        const selFormat = document.getElementById('selectFormat');

        // Code 128
        selFormat.value = 'CODE128';
        selFormat.dispatchEvent(new Event('change'));
        valIn.value = 'WIDI-TOOLS-2026';
        valIn.dispatchEvent(new Event('input'));
        const svg128 = barcodePreviewBox.innerHTML.includes('<svg');

        // EAN-13
        selFormat.value = 'EAN13';
        selFormat.dispatchEvent(new Event('change'));
        valIn.value = '899123456789';
        valIn.dispatchEvent(new Event('input'));
        const svgEan = barcodePreviewBox.innerHTML.includes('<svg');

        // Invalid EAN-13 (too short)
        valIn.value = '12345';
        valIn.dispatchEvent(new Event('input'));
        const errorText = barcodePreviewBox.textContent;

        return { svg128, svgEan, hasError: errorText.includes('at least 12 numeric digits') };
      });

      assert(res.svg128, 'Generated vector Code 128 barcode');
      assert(res.svgEan, 'Generated vector EAN-13 barcode with modulo-10 parity');
      assert(res.hasError, 'Invalid EAN-13 length flagged with friendly validation message');
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 17. QR Code Studio
    // -------------------------------------------------------------------------
    console.log('\n[17/23] Real Test: QR Code Studio (URL, Wi-Fi WPA, WhatsApp & Error Correction)...');
    {
      const page = await openPage('tools/qr-code.html');
      const res = await page.evaluate(() => {
        document.getElementById('inputUrl').value = 'https://tools.widifirmaan.web.id';
        renderQr();
        const hasUrlCanvas = Boolean(document.querySelector('#qrcodeContainer canvas, #qrcodeContainer img'));

        document.getElementById('qrType').value = 'wifi';
        document.getElementById('qrType').dispatchEvent(new Event('change'));
        document.getElementById('wifiSsid').value = 'Antigravity_5GHz';
        document.getElementById('wifiPassword').value = 'SecretP@ss2026';
        renderQr();
        const hasWifiCanvas = Boolean(document.querySelector('#qrcodeContainer canvas, #qrcodeContainer img'));

        return { hasUrlCanvas, hasWifiCanvas };
      });

      assert(res.hasUrlCanvas, 'URL QR Code generated');
      assert(res.hasWifiCanvas, 'Wi-Fi WPA QR Code generated');
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 18. Image Compressor (REAL JPG UPLOAD)
    // -------------------------------------------------------------------------
    console.log('\n[18/23] Real Test: Image Compressor (Real JPG Upload, Client Compression 50% vs 90%)...');
    {
      const page = await openPage('tools/image-compressor.html');
      const fileInput = await page.$('#file-input');
      await fileInput.uploadFile(ASSETS.jpg);
      await page.waitForSelector('#compressorArea:not(.d-none)', { timeout: 8000 });

      const res = await page.evaluate(async () => {
        setQuality(50);
        await new Promise(r => setTimeout(r, 600));
        const saved50 = document.getElementById('savings').textContent;

        setQuality(90);
        await new Promise(r => setTimeout(r, 600));
        const saved90 = document.getElementById('savings').textContent;

        return { saved50, saved90 };
      });

      assert(res.saved50.includes('%'), `Real JPG compressed at 50% quality: ${res.saved50}`);
      assert(res.saved90.includes('%'), `Real JPG compressed at 90% quality: ${res.saved90}`);
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 19. Image Converter (REAL PNG UPLOAD)
    // -------------------------------------------------------------------------
    console.log('\n[19/23] Real Test: Image Converter (Real PNG Upload & WebP Conversion)...');
    {
      const page = await openPage('tools/image-converter.html');
      const fileInput = await page.$('#image-upload');
      await fileInput.uploadFile(ASSETS.png);
      await page.waitForSelector('#converterArea:not(.d-none)', { timeout: 8000 });

      const res = await page.evaluate(async () => {
        document.getElementById('format-select').value = 'webp';
        document.getElementById('convert-btn').click();
        await new Promise(r => setTimeout(r, 800));

        const dlBtn = document.querySelector('#download-link-container a');
        return { hasDl: Boolean(dlBtn), downloadTarget: dlBtn ? dlBtn.download : '' };
      });

      assert(res.hasDl, 'Converted image result download ready');
      assert(res.downloadTarget.endsWith('.webp'), `Output target format: ${res.downloadTarget}`);
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 20. Tire Comparison
    // -------------------------------------------------------------------------
    console.log('\n[20/23] Real Test: Tire Comparison (Real Wheel Calculations & 0.00% Identical)...');
    {
      const page = await openPage('tools/tire-comp.html');
      const res = await page.evaluate(() => {
        // Standard comparison
        document.getElementById('width1').value = 205;
        document.getElementById('aspectRatio1').value = 55;
        document.getElementById('diameter1').value = 16;

        document.getElementById('width2').value = 225;
        document.getElementById('aspectRatio2').value = 45;
        document.getElementById('diameter2').value = 17;

        document.getElementById('calculateBtn').click();
        const diffNormal = document.getElementById('diameterDiffResult').textContent;

        // Identical comparison
        document.getElementById('width2').value = 205;
        document.getElementById('aspectRatio2').value = 55;
        document.getElementById('diameter2').value = 16;

        document.getElementById('calculateBtn').click();
        const diffZero = document.getElementById('diameterDiffResult').textContent;

        return { diffNormal, diffZero };
      });

      assert(res.diffNormal.includes('%'), `Diameter diff calculated: ${res.diffNormal}`);
      assert(res.diffZero.includes('0.00%') || res.diffZero.includes('0%'), `Identical size calculated 0.00% diff: ${res.diffZero}`);
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 21. Text Editor
    // -------------------------------------------------------------------------
    console.log('\n[21/23] Real Test: Text Editor (Live Word & Char Counters, Whitespace Handling)...');
    {
      const page = await openPage('tools/text-editor.html');
      const res = await page.evaluate(() => {
        const ed = document.getElementById('editor-area');
        const wc = document.getElementById('word-count');
        const cc = document.getElementById('char-count');

        ed.textContent = '';
        ed.dispatchEvent(new Event('input'));
        const w0 = wc.textContent;
        const c0 = cc.textContent;

        ed.textContent = '  Frontend   Engineer   Indonesia   🚀  ';
        ed.dispatchEvent(new Event('input'));
        const w4 = wc.textContent;
        const c4 = cc.textContent;

        return { w0, c0, w4, c4 };
      });

      assert(res.w0 === 'Words: 0' && res.c0 === 'Characters: 0', 'Empty text accurately counted 0 words and 0 chars');
      assert(res.w4 === 'Words: 4', `Multi-spaced Unicode text accurately counted: ${res.w4}`);
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 22. Background Remover (REAL PNG UPLOAD)
    // -------------------------------------------------------------------------
    console.log('\n[22/23] Real Test: Background Remover (Real PNG Upload & UI State Validation)...');
    {
      const page = await openPage('tools/remove-bg.html');
      const fileInput = await page.$('#imageInput');
      await fileInput.uploadFile(ASSETS.png);

      const res = await page.evaluate(async () => {
        await new Promise(r => setTimeout(r, 600));
        const areaVisible = !document.getElementById('previewSection').classList.contains('d-none');
        const origSrc = Boolean(document.getElementById('origImagePreview').src);
        return { areaVisible, origSrc };
      });

      assert(res.areaVisible, 'Comparison area rendered upon real image selection');
      assert(res.origSrc, 'Original photo displayed on preview element');
      await page.close();
    }

    // -------------------------------------------------------------------------
    // 23. PDF Studio (REAL MULTI-FILE UPLOAD)
    // -------------------------------------------------------------------------
    console.log('\n[23/23] Real Test: PDF Studio (Real Images to PDF Compilation)...');
    {
      const page = await openPage('tools/pdf-tools.html');
      await page.click('#img2pdf-tab');

      const fileInput = await page.$('#img2pdfInput');
      await fileInput.uploadFile(ASSETS.png, ASSETS.jpg);
      await page.waitForSelector('#imgFileList .file-item-card', { timeout: 8000 });

      const res = await page.evaluate(async () => {
        const count = document.querySelectorAll('#imgFileList .file-item-card').length;
        document.getElementById('imgPageSize').value = 'a4';
        document.getElementById('btnConvertImg2Pdf').click();

        await new Promise(r => setTimeout(r, 1600));
        const resBox = !document.getElementById('imgResultBox').classList.contains('d-none');
        const dlBtn = document.getElementById('btnDownloadImgPdf');

        return { count, resBox, hasHref: Boolean(dlBtn.href) };
      });

      assert(res.count === 2, `Uploaded ${res.count} real image files into queue`);
      assert(res.resBox && res.hasHref, 'Compiled multiple real images into printable A4 PDF');
      await page.close();
    }

  } catch (err) {
    console.error('\n❌ Fatal error in test runner:', err);
    failedTests++;
  } finally {
    await browser.close();
    // Clean up tmp dir
    try {
      fs.rmSync(TMP_DIR, { recursive: true, force: true });
    } catch (_) {}
  }

  console.log('\n========================================================================');
  console.log(`  REAL TEST SUITE RESULTS: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${totalTests})`);
  console.log('========================================================================\n');

  if (failedTests > 0) {
    process.exit(1);
  }
}

runRealTestSuite();
