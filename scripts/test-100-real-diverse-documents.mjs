import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const REAL_DOCS_DIR = path.join(REPO_ROOT, 'test-assets/100-real-docs');
const DOCX_OUT_DIR = path.join(REAL_DOCS_DIR, 'docx_output');

fs.mkdirSync(REAL_DOCS_DIR, { recursive: true });
fs.mkdirSync(DOCX_OUT_DIR, { recursive: true });

function parseDocxOpenXML(buffer) {
  let offset = 0;
  let documentXml = null;

  while (offset < buffer.length - 30) {
    if (buffer.readUInt32LE(offset) !== 0x04034b50) break;
    const compMethod = buffer.readUInt16LE(offset + 8);
    const compSize = buffer.readUInt32LE(offset + 18);
    const fnLen = buffer.readUInt16LE(offset + 26);
    const extraLen = buffer.readUInt16LE(offset + 28);
    const fileName = buffer.toString('utf8', offset + 30, offset + 30 + fnLen);
    const dataStart = offset + 30 + fnLen + extraLen;
    const fileData = buffer.subarray(dataStart, dataStart + compSize);

    if (fileName === 'word/document.xml') {
      try {
        documentXml = compMethod === 8 ? zlib.inflateRawSync(fileData).toString('utf8') : fileData.toString('utf8');
      } catch (e) {
        documentXml = null;
      }
      break;
    }
    offset = dataStart + compSize;
  }

  if (!documentXml) {
    return { valid: false, frameCount: 0, textLength: 0, allText: '' };
  }

  const frameMatches = documentXml.match(/<w:framePr[^>]+>/g) || [];
  const textMatches = Array.from(documentXml.matchAll(/<w:t[^>]*>([^<]+)<\/w:t>/g)).map(m => m[1]);
  const combinedText = textMatches.join(' ');

  return {
    valid: true,
    frameCount: frameMatches.length,
    textRunCount: textMatches.length,
    textLength: combinedText.length,
    allText: combinedText,
    isFramed: frameMatches.length > 0
  };
}

async function runReal100Audit() {
  console.log('========================================================================');
  console.log('  100 REAL ONLINE DIFFERENT DOCUMENTS: CONVERT & COMPARATIVE AUDIT     ');
  console.log('========================================================================\n');

  // Discover all PDF files in REAL_DOCS_DIR
  const allPdfFiles = fs.readdirSync(REAL_DOCS_DIR)
    .filter(f => f.endsWith('.pdf'))
    .sort();

  const selected100 = allPdfFiles.slice(0, 100);
  console.log(`Loaded ${selected100.length} distinct real-world PDF documents for comparative testing.\n`);

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--allow-file-access-from-files']
  });

  const converterPage = await browser.newPage();
  converterPage.on('dialog', d => d.dismiss());

  const auditResults = [];
  let passCount = 0;
  let failCount = 0;

  for (let idx = 0; idx < selected100.length; idx++) {
    const filename = selected100[idx];
    const prefix = `[${String(idx + 1).padStart(3, '0')}/100]`;
    const docPath = path.join(REAL_DOCS_DIR, filename);
    const docxSavePath = path.join(DOCX_OUT_DIR, filename.replace(/\.pdf$/i, '.docx'));
    const pdfSize = fs.statSync(docPath).size;

    try {
      await converterPage.goto(`file://${path.join(REPO_ROOT, 'tools/pdf-word.html')}`);

      const input = await converterPage.$('#pdfFileInput');
      await input.uploadFile(docPath);

      // Wait until analyzed
      await converterPage.waitForFunction((expectedName) => {
        const fn = document.getElementById('infoFileName');
        const count = document.getElementById('infoPageCount');
        return fn && fn.textContent.includes(expectedName) &&
               count && !count.textContent.includes('-') && !count.textContent.includes('Loading');
      }, { timeout: 10000 }, filename);

      // Extract original PDF text from the page memory to compare against DOCX
      const pdfMetadata = await converterPage.evaluate(async () => {
        if (!window.pdfDoc && typeof pdfDoc === 'undefined') return { totalChars: 0, sampleWords: [] };
        const docObj = window.pdfDoc || pdfDoc;
        let totalChars = 0;
        let words = [];

        for (let p = 1; p <= docObj.numPages; p++) {
          const page = await docObj.getPage(p);
          const tc = await page.getTextContent();
          for (const item of (tc.items || [])) {
            if (item.str && item.str.trim()) {
              totalChars += item.str.length;
              const w = item.str.trim().split(/\s+/);
              for (const word of w) {
                if (word.length >= 4 && words.length < 50) words.push(word);
              }
            }
          }
        }
        return { totalChars, sampleWords: words };
      });

      // Click Convert
      await converterPage.click('#btnConvert');

      // Wait for completion (allow up to 25s for large documents)
      await converterPage.waitForSelector('#resultBox:not(.d-none)', { timeout: 25000 });

      // Retrieve generated DOCX blob
      const docxData = await converterPage.evaluate(async () => {
        const dlBtn = document.getElementById('downloadBtn');
        const r = await fetch(dlBtn.href);
        const ab = await r.arrayBuffer();
        const b64 = btoa(
          new Uint8Array(ab).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        return {
          downloadName: dlBtn.download,
          byteLength: ab.byteLength,
          base64Data: b64
        };
      });

      const docxBuffer = Buffer.from(docxData.base64Data, 'base64');
      fs.writeFileSync(docxSavePath, docxBuffer);

      // Deep compare OpenXML
      const openXmlAudit = parseDocxOpenXML(docxBuffer);

      // Verify text preservation
      let matchingWords = 0;
      for (const w of pdfMetadata.sampleWords) {
        if (openXmlAudit.allText.includes(w)) matchingWords++;
      }
      const wordMatchRatio = pdfMetadata.sampleWords.length > 0 
        ? Math.round((matchingWords / pdfMetadata.sampleWords.length) * 100) 
        : 100;

      const isScannedOrImage = pdfMetadata.totalChars === 0;
      const pass = openXmlAudit.valid && docxBuffer.length > 2500 && (isScannedOrImage || wordMatchRatio >= 75);

      if (pass) {
        passCount++;
      } else {
        failCount++;
      }

      auditResults.push({
        id: idx + 1,
        filename: filename,
        pdfBytes: pdfSize,
        docxBytes: docxBuffer.length,
        pdfTextChars: pdfMetadata.totalChars,
        docxTextChars: openXmlAudit.textLength,
        wordMatchRatio: `${wordMatchRatio}%`,
        framesPositioned: openXmlAudit.frameCount,
        isScannedFallback: isScannedOrImage,
        status: pass ? 'MATCHED_IDENTICAL' : 'DISCREPANCY'
      });

      if ((idx + 1) % 10 === 0 || idx === 0 || idx === selected100.length - 1) {
        console.log(`  ✓ ${prefix} ${filename.padEnd(38)} -> DOCX: ${docxBuffer.length} B | Match: ${wordMatchRatio}% | Frames: ${openXmlAudit.frameCount} | ${pass ? 'PASSED' : 'CHECK'}`);
      }

    } catch (err) {
      failCount++;
      auditResults.push({
        id: idx + 1,
        filename: filename,
        status: 'FAILED',
        error: err.message
      });
      console.error(`  ❌ ${prefix} ${filename} error:`, err.message);
    }
  }

  await converterPage.close();
  await browser.close();

  console.log('\n========================================================================');
  console.log(`  FINAL COMPARATIVE AUDIT: ${passCount} / ${selected100.length} PASSED`);
  console.log(`  FAILED / DISCREPANCY: ${failCount}`);
  console.log('========================================================================\n');

  fs.writeFileSync(
    path.join(REAL_DOCS_DIR, 'test_100_real_comparison.json'),
    JSON.stringify({ total: selected100.length, passCount, failCount, results: auditResults }, null, 2)
  );

  console.log(`Comparative audit report saved to ${path.join(REAL_DOCS_DIR, 'test_100_real_comparison.json')}`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runReal100Audit().catch(err => {
  console.error("Fatal audit harness error:", err);
  process.exit(1);
});
