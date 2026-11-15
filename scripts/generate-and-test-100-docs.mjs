import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'test-assets/100-docs');
const OUTPUT_DIR = path.join(REPO_ROOT, 'test-assets/100-docs/docx_output');

fs.mkdirSync(DOCS_DIR, { recursive: true });
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 100 Distinct Document Definitions
const DOCUMENT_SPECS = [
  // 1. Financial & Commercial (1-10)
  {
    id: 1, name: 'tax_invoice', category: 'Financial & Commercial',
    title: 'COMMERCIAL TAX INVOICE', orientation: 'portrait',
    layout: 'table_grid',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 40px; color: #333;">
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #0056b3; padding-bottom: 20px;">
          <div><h1 style="color: #0056b3; margin: 0;">GLOBAL LOGISTICS CORP</h1><p style="margin: 5px 0;">100 Enterprise Way, Suite 400<br>Tax ID: US-994829104</p></div>
          <div style="text-align: right;"><h2 style="margin: 0; color: #555;">TAX INVOICE</h2><p style="margin: 5px 0;"><b>Invoice #:</b> INV-2026-8819<br><b>Date:</b> 15 Nov 2026<br><b>Due:</b> 30 Nov 2026</p></div>
        </div>
        <div style="margin: 25px 0; display: flex; justify-content: space-between;">
          <div><b>Billed To:</b><br>Vertex Innovations Ltd.<br>450 Tech Park Blvd, Silicon Valley, CA</div>
          <div><b>Payment Terms:</b> Net 15 Days<br><b>Currency:</b> USD ($)</div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background: #0056b3; color: white; text-align: left;"><th style="padding: 10px;">Item Description</th><th style="padding: 10px; text-align: center;">Qty</th><th style="padding: 10px; text-align: right;">Unit Price</th><th style="padding: 10px; text-align: right;">Total</th></tr>
          <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 10px;">Enterprise Cloud Architecture Hosting</td><td style="padding: 10px; text-align: center;">1</td><td style="padding: 10px; text-align: right;">$2,400.00</td><td style="padding: 10px; text-align: right;">$2,400.00</td></tr>
          <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 10px;">Dedicated API Security Gateway</td><td style="padding: 10px; text-align: center;">2</td><td style="padding: 10px; text-align: right;">$650.00</td><td style="padding: 10px; text-align: right;">$1,300.00</td></tr>
          <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 10px;">24/7 Priority Support SLA</td><td style="padding: 10px; text-align: center;">1</td><td style="padding: 10px; text-align: right;">$500.00</td><td style="padding: 10px; text-align: right;">$500.00</td></tr>
        </table>
        <div style="text-align: right; margin-top: 25px;">
          <p style="margin: 4px 0;"><b>Subtotal:</b> $4,200.00</p>
          <p style="margin: 4px 0;"><b>Tax (10% VAT):</b> $420.00</p>
          <h3 style="margin: 8px 0; color: #0056b3;">Total Due: $4,620.00</h3>
        </div>
      </div>
    `
  },
  {
    id: 2, name: 'proforma_invoice', category: 'Financial & Commercial',
    title: 'INTERNATIONAL PROFORMA INVOICE', orientation: 'portrait',
    layout: 'table_grid',
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px;">
        <h2 style="text-align: center; letter-spacing: 2px;">PROFORMA INVOICE</h2>
        <div style="display: flex; justify-content: space-between; margin-top: 20px;">
          <div><b>Exporter:</b> Tokyo Robotics Corp<br>Minato-ku, Tokyo, Japan</div>
          <div><b>PI Number:</b> PI-JP-9021<br><b>HS Code:</b> 8479.50.00</div>
        </div>
        <table style="width: 100%; border: 1px solid #333; margin-top: 20px; border-collapse: collapse;">
          <tr style="background: #eee;"><th style="border: 1px solid #333; padding: 8px;">Model</th><th style="border: 1px solid #333; padding: 8px;">Units</th><th style="border: 1px solid #333; padding: 8px;">CIF Price</th></tr>
          <tr><td style="border: 1px solid #333; padding: 8px;">Industrial Robotic Arm RX-40</td><td style="border: 1px solid #333; padding: 8px; text-align: center;">4</td><td style="border: 1px solid #333; padding: 8px; text-align: right;">$38,000.00</td></tr>
        </table>
        <p style="margin-top: 30px;"><b>Bank Details:</b> Sumitomo Mitsui Banking, Swift: SMBCJPJT</p>
      </div>
    `
  },
  {
    id: 3, name: 'purchase_order', category: 'Financial & Commercial',
    title: 'OFFICIAL PURCHASE ORDER', orientation: 'portrait',
    layout: 'table_grid',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 40px;">
        <h2 style="color: #2c3e50;">PURCHASE ORDER: PO-2026-4491</h2>
        <p><b>Vendor:</b> TechSupply International | <b>Delivery Date:</b> 01 Dec 2026</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background: #ecf0f1;"><th style="padding: 8px; border: 1px solid #bdc3c7;">SKU</th><th style="padding: 8px; border: 1px solid #bdc3c7;">Part Name</th><th style="padding: 8px; border: 1px solid #bdc3c7;">Qty</th><th style="padding: 8px; border: 1px solid #bdc3c7;">Amount</th></tr>
          <tr><td style="padding: 8px; border: 1px solid #bdc3c7;">CPU-990</td><td style="padding: 8px; border: 1px solid #bdc3c7;">Server Xeon Processors</td><td style="padding: 8px; border: 1px solid #bdc3c7; text-align: center;">10</td><td style="padding: 8px; border: 1px solid #bdc3c7; text-align: right;">$12,000</td></tr>
        </table>
        <p style="margin-top: 20px;"><b>Authorized Signature:</b> ___________________________</p>
      </div>
    `
  },
  {
    id: 4, name: 'sales_receipt', category: 'Financial & Commercial',
    title: 'POINT OF SALE RECEIPT', orientation: 'portrait',
    layout: 'narrow_receipt',
    html: `
      <div style="font-family: 'Courier New', monospace; padding: 30px; width: 380px; margin: auto; border: 1px dashed #666;">
        <h3 style="text-align: center; margin: 0;">METRO SUPERMARKET</h3>
        <p style="text-align: center; font-size: 12px; margin: 4px 0;">124 Main Street, NY<br>Tel: (212) 555-0199</p>
        <hr style="border: 0; border-top: 1px dashed #666;">
        <div style="display: flex; justify-content: space-between; font-size: 13px;"><span>Organic Milk 1L</span><span>$4.50</span></div>
        <div style="display: flex; justify-content: space-between; font-size: 13px;"><span>Whole Wheat Bread</span><span>$3.20</span></div>
        <div style="display: flex; justify-content: space-between; font-size: 13px;"><span>Arabica Coffee 500g</span><span>$12.90</span></div>
        <hr style="border: 0; border-top: 1px dashed #666;">
        <div style="display: flex; justify-content: space-between; font-weight: bold;"><span>TOTAL</span><span>$20.60</span></div>
        <p style="text-align: center; font-size: 11px; margin-top: 15px;">Thank you for shopping with us!</p>
      </div>
    `
  },
  {
    id: 5, name: 'commercial_quotation', category: 'Financial & Commercial',
    title: 'FORMAL PRICE QUOTATION', orientation: 'portrait',
    layout: 'table_grid',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 40px;">
        <h2 style="color: #16a085;">QUOTATION: QTE-8820</h2>
        <p><b>Prepared For:</b> Apex Media Group<br><b>Validity:</b> 30 Days from issuance</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background: #16a085; color: white;"><th style="padding: 8px;">Scope of Work</th><th style="padding: 8px; text-align: right;">Estimated Cost</th></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px;">Custom Web Application Redesign</td><td style="padding: 8px; text-align: right;">$8,500.00</td></tr>
          <tr style="border-bottom: 1px solid #eee;"><td style="padding: 8px;">Database Migration & Optimization</td><td style="padding: 8px; text-align: right;">$3,200.00</td></tr>
        </table>
        <h3 style="text-align: right; color: #16a085;">Grand Total: $11,700.00</h3>
      </div>
    `
  },
  {
    id: 6, name: 'balance_sheet', category: 'Financial & Commercial',
    title: 'CORPORATE BALANCE SHEET', orientation: 'portrait',
    layout: 'multi_row_ledger',
    html: `
      <div style="font-family: 'Times New Roman', serif; padding: 40px;">
        <h2 style="text-align: center; margin: 0;">ORION VENTURES INC.</h2>
        <h4 style="text-align: center; margin: 5px 0; color: #555;">BALANCE SHEET AS OF DECEMBER 31, 2026</h4>
        <hr>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="font-weight: bold; background: #f2f2f2;"><td style="padding: 6px;">ASSETS</td><td style="padding: 6px; text-align: right;">2026 (USD)</td></tr>
          <tr><td style="padding: 4px 15px;">Cash and Cash Equivalents</td><td style="text-align: right;">$1,450,000</td></tr>
          <tr><td style="padding: 4px 15px;">Accounts Receivable</td><td style="text-align: right;">$820,000</td></tr>
          <tr style="font-weight: bold;"><td style="padding: 6px;">Total Current Assets</td><td style="text-align: right; border-top: 1px solid #333;">$2,270,000</td></tr>
          <tr style="font-weight: bold; background: #f2f2f2; margin-top: 10px;"><td style="padding: 6px;">LIABILITIES & EQUITY</td><td style="padding: 6px; text-align: right;">2026 (USD)</td></tr>
          <tr><td style="padding: 4px 15px;">Accounts Payable</td><td style="text-align: right;">$450,000</td></tr>
          <tr><td style="padding: 4px 15px;">Retained Earnings</td><td style="text-align: right;">$1,820,000</td></tr>
          <tr style="font-weight: bold;"><td style="padding: 6px;">Total Liabilities & Equity</td><td style="text-align: right; border-top: 1px solid #333; border-bottom: 2px double #333;">$2,270,000</td></tr>
        </table>
      </div>
    `
  },
  {
    id: 7, name: 'income_statement', category: 'Financial & Commercial',
    title: 'PROFIT & LOSS STATEMENT', orientation: 'portrait',
    layout: 'multi_row_ledger',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 40px;">
        <h2 style="margin: 0; color: #2c3e50;">STATEMENT OF PROFIT AND LOSS</h2>
        <p style="color: #7f8c8d; margin-top: 4px;">For the Fiscal Year Ended 2026</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="border-bottom: 2px solid #2c3e50;"><th style="text-align: left; padding: 6px;">Revenue Stream</th><th style="text-align: right; padding: 6px;">Amount (USD)</th></tr>
          <tr><td style="padding: 6px;">Software Subscriptions</td><td style="text-align: right;">$5,400,000</td></tr>
          <tr><td style="padding: 6px;">Professional Services</td><td style="text-align: right;">$1,200,000</td></tr>
          <tr style="font-weight: bold; background: #f8f9fa;"><td style="padding: 6px;">Gross Revenue</td><td style="text-align: right;">$6,600,000</td></tr>
          <tr><td style="padding: 6px;">Cost of Goods Sold (COGS)</td><td style="text-align: right;">($1,800,000)</td></tr>
          <tr style="font-weight: bold; border-top: 1px solid #333;"><td style="padding: 6px;">Net Income</td><td style="text-align: right; color: #27ae60;">$4,800,000</td></tr>
        </table>
      </div>
    `
  },
  {
    id: 8, name: 'cash_flow_statement', category: 'Financial & Commercial',
    title: 'STATEMENT OF CASH FLOWS', orientation: 'portrait',
    layout: 'multi_row_ledger',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 40px;">
        <h2 style="text-align: center;">STATEMENT OF CASH FLOWS</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="font-weight: bold; background: #eee;"><td style="padding: 8px;">Cash flows from operating activities</td><td style="text-align: right; padding: 8px;">$3,210,000</td></tr>
          <tr><td style="padding: 8px;">Cash flows from investing activities</td><td style="text-align: right; padding: 8px;">($950,000)</td></tr>
          <tr><td style="padding: 8px;">Cash flows from financing activities</td><td style="text-align: right; padding: 8px;">($500,000)</td></tr>
          <tr style="font-weight: bold; border-top: 2px solid #000;"><td style="padding: 8px;">Net increase in cash</td><td style="text-align: right; padding: 8px;">$1,760,000</td></tr>
        </table>
      </div>
    `
  },
  {
    id: 9, name: 'expense_report', category: 'Financial & Commercial',
    title: 'EMPLOYEE TRAVEL EXPENSE CLAIM', orientation: 'portrait',
    layout: 'table_grid',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 40px;">
        <h3>EMPLOYEE EXPENSE REPORT</h3>
        <p><b>Employee:</b> Sarah Jenkins | <b>Dept:</b> Product Marketing | <b>ID:</b> EMP-772</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background: #34495e; color: white;"><th style="padding: 6px;">Date</th><th style="padding: 6px;">Category</th><th style="padding: 6px;">Notes</th><th style="padding: 6px; text-align: right;">Amount</th></tr>
          <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px;">10/11/2026</td><td style="padding: 6px;">Flight</td><td style="padding: 6px;">SFO to JFK Conference</td><td style="padding: 6px; text-align: right;">$420.00</td></tr>
          <tr style="border-bottom: 1px solid #ddd;"><td style="padding: 6px;">11/11/2026</td><td style="padding: 6px;">Hotel</td><td style="padding: 6px;">Marriott 2 Nights</td><td style="padding: 6px; text-align: right;">$380.00</td></tr>
        </table>
        <p style="text-align: right; font-weight: bold; margin-top: 15px;">Total Reimbursable: $800.00</p>
      </div>
    `
  },
  {
    id: 10, name: 'credit_debit_note', category: 'Financial & Commercial',
    title: 'CREDIT ADJUSTMENT NOTE', orientation: 'portrait',
    layout: 'table_grid',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 40px;">
        <h2 style="color: #c0392b;">CREDIT NOTE #CN-504</h2>
        <p><b>Original Invoice Ref:</b> INV-8819<br><b>Reason:</b> Volume Rebate Discount (Q4)</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background: #e74c3c; color: white;"><th style="padding: 8px;">Description</th><th style="padding: 8px; text-align: right;">Credit Amount</th></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;">Adjusted Service Fee Rebate</td><td style="padding: 8px; text-align: right; border-bottom: 1px solid #ddd;">$350.00</td></tr>
        </table>
      </div>
    `
  }
];

// Dynamically generate the remaining 90 distinct document types
const CATEGORIES_MAP = [
  // Banking & Payroll (11-20)
  { id: 11, name: 'bank_account_statement', cat: 'Banking & Payroll', title: 'MONTHLY BANK ACCOUNT STATEMENT', desc: 'Account No: 4892-0012-9938 | Balance Forward: $42,100.50' },
  { id: 12, name: 'employee_payslip', cat: 'Banking & Payroll', title: 'BI-WEEKLY SALARY PAYSLIP', desc: 'Employee: David Miller | Gross Pay: $4,500.00 | Net Pay: $3,650.00' },
  { id: 13, name: 'tax_return_form_1040', cat: 'Banking & Payroll', title: 'INDIVIDUAL TAX RETURN FORM 1040', desc: 'IRS Department of Treasury | Filing Status: Single | Adjusted Gross Income' },
  { id: 14, name: 'wage_tax_statement_w2', cat: 'Banking & Payroll', title: 'WAGE AND TAX STATEMENT W-2', desc: 'Box 1 Wages: $85,000.00 | Box 2 Federal Income Tax Withheld: $14,200.00' },
  { id: 15, name: 'wire_transfer_receipt', cat: 'Banking & Payroll', title: 'SWIFT WIRE TRANSFER CONFIRMATION', desc: 'Sender: BNP Paribas | Beneficiary: Deutsche Bank | Swift: DEUTDEDDF' },
  { id: 16, name: 'loan_amortization_schedule', cat: 'Banking & Payroll', title: 'LOAN REPAYMENT AMORTIZATION SCHEDULE', desc: 'Principal: $250,000 | Interest Rate: 4.5% | Monthly Payment: $1,266.71' },
  { id: 17, name: 'tax_clearance_certificate', cat: 'Banking & Payroll', title: 'OFFICIAL TAX COMPLIANCE CLEARANCE', desc: 'Certificate of Good Standing | Issued by Department of Revenue' },
  { id: 18, name: 'customs_duty_declaration', cat: 'Banking & Payroll', title: 'CUSTOMS IMPORT DUTY DECLARATION', desc: 'Declaration Ref: CUST-2026-9921 | Origin Port: Shanghai | Destination: Long Beach' },
  { id: 19, name: 'dividend_distribution_voucher', cat: 'Banking & Payroll', title: 'SHAREHOLDER DIVIDEND VOUCHER', desc: 'Ordinary Shares: 10,000 | Dividend per Share: $0.45 | Net Paid: $4,500.00' },
  { id: 20, name: 'petty_cash_voucher', cat: 'Banking & Payroll', title: 'OFFICE PETTY CASH DISBURSEMENT LOG', desc: 'Voucher No: PC-104 | Authorized by Office Manager | Amount: $85.50' },

  // Legal & Contracts (21-30)
  { id: 21, name: 'non_disclosure_agreement', cat: 'Legal & Contracts', title: 'MUTUAL NON-DISCLOSURE AGREEMENT', desc: 'This Confidentiality Agreement is entered into between Party A and Party B.' },
  { id: 22, name: 'employment_contract', cat: 'Legal & Contracts', title: 'PERMANENT EMPLOYMENT CONTRACT', desc: 'Terms of employment, duties, remuneration, non-compete covenants, and termination clauses.' },
  { id: 23, name: 'service_level_agreement', cat: 'Legal & Contracts', title: 'ENTERPRISE SERVICE LEVEL AGREEMENT (SLA)', desc: '99.99% Uptime Guarantee | P1 Incident Response: 15 Minutes' },
  { id: 24, name: 'residential_lease_agreement', cat: 'Legal & Contracts', title: 'RESIDENTIAL LEASE AGREEMENT', desc: 'Premises: 742 Evergreen Terrace | Monthly Rent: $2,100 | Security Deposit: $2,100' },
  { id: 25, name: 'power_of_attorney', cat: 'Legal & Contracts', title: 'GENERAL POWER OF ATTORNEY', desc: 'Know all men by these presents, that I do hereby appoint my true and lawful attorney.' },
  { id: 26, name: 'partnership_agreement', cat: 'Legal & Contracts', title: 'GENERAL PARTNERSHIP DEED', desc: 'Partnership capital contribution, profit sharing ratio: 50% / 50%.' },
  { id: 27, name: 'articles_of_incorporation', cat: 'Legal & Contracts', title: 'ARTICLES OF INCORPORATION', desc: 'State Corporation Commission | Authorized Capital Stock: 10,000,000 shares' },
  { id: 28, name: 'board_meeting_minutes', cat: 'Legal & Contracts', title: 'MINUTES OF THE BOARD OF DIRECTORS', desc: 'Meeting held at Corporate Headquarters. Resolution to expand operations approved.' },
  { id: 29, name: 'affidavit_sworn_statement', cat: 'Legal & Contracts', title: 'SWORN AFFIDAVIT UNDER OATH', desc: 'Subscribed and sworn to before me, a Notary Public in and for the state.' },
  { id: 30, name: 'cease_and_desist_letter', cat: 'Legal & Contracts', title: 'LEGAL CEASE AND DESIST NOTICE', desc: 'Formal demand to immediately discontinue unauthorized trademark infringement.' },

  // Academic & Scientific (31-40)
  { id: 31, name: 'research_paper_2col', cat: 'Academic & Scientific', title: 'DEEP NEURAL LAYOUT ANALYSIS IN PDFS', desc: 'Abstract: We present an exact coordinate spatial extraction framework for heterogeneous documents.' },
  { id: 32, name: 'academic_journal_1col', cat: 'Academic & Scientific', title: 'JOURNAL OF HISTORICAL LINGUISTICS', desc: 'A Comparative Study of Proto-Indo-European Morphological Syntax in Classical Texts.' },
  { id: 33, name: 'laboratory_experiment_report', cat: 'Academic & Scientific', title: 'ORGANIC CHEMISTRY LAB EXPERIMENT', desc: 'Synthesis of Acetylsalicylic Acid: Yield Analysis, Melting Point Verification (135 C).' },
  { id: 34, name: 'dissertation_abstract', cat: 'Academic & Scientific', title: 'DOCTORAL DISSERTATION ABSTRACT', desc: 'In Partial Fulfillment of the Requirements for the Degree of Doctor of Philosophy.' },
  { id: 35, name: 'course_syllabus', cat: 'Academic & Scientific', title: 'CS-401: DISTRIBUTED SYSTEMS SYLLABUS', desc: 'Week 1-14 Schedule: Consensus Algorithms, Raft, Paxos, Vector Clocks, Grading Rubric.' },
  { id: 36, name: 'academic_conference_agenda', cat: 'Academic & Scientific', title: 'INTERNATIONAL SYMPOSIUM ON AI SCHEDULE', desc: 'Keynote Track 1: Scalable Inference Models | Workshop: Layout Transformers' },
  { id: 37, name: 'peer_review_evaluation', cat: 'Academic & Scientific', title: 'MANUSCRIPT PEER REVIEW EVALUATION', desc: 'Originality: 9/10 | Methodology: Sound | Recommendation: Accept with Minor Revisions.' },
  { id: 38, name: 'mathematical_proof_paper', cat: 'Academic & Scientific', title: 'ON THE CONVERGENCE OF RIEMANN SERIES', desc: 'Theorem 4.1: Let f(z) be an analytic function bounded on the open unit disc.' },
  { id: 39, name: 'clinical_study_protocol', cat: 'Academic & Scientific', title: 'PHASE III CLINICAL STUDY PROTOCOL', desc: 'Double-blind, placebo-controlled trial evaluating therapeutic efficacy.' },
  { id: 40, name: 'student_thesis_title_page', cat: 'Academic & Scientific', title: 'MASTER OF SCIENCE THESIS COVER', desc: 'Department of Computer Science and Engineering | Faculty of Graduate Studies' },

  // Healthcare & Medical (41-50)
  { id: 41, name: 'doctor_prescription_pad', cat: 'Healthcare & Medical', title: 'PHYSICIAN RX PRESCRIPTION SLIP', desc: 'Rx: Amoxicillin 500mg capsules | Sig: 1 cap PO TID x 10 days | Disp: #30' },
  { id: 42, name: 'complete_blood_count_test', cat: 'Healthcare & Medical', title: 'HEMATOLOGY LAB REPORT (CBC)', desc: 'WBC: 6.8 x10^3/uL | RBC: 4.75 x10^6/uL | Hemoglobin: 14.2 g/dL | Platelets: 245K' },
  { id: 43, name: 'hospital_discharge_summary', cat: 'Healthcare & Medical', title: 'INPATIENT DISCHARGE SUMMARY', desc: 'Admission Diagnosis: Acute Bronchitis | Discharge Condition: Stable | Follow-up in 14 days.' },
  { id: 44, name: 'radiology_imaging_report', cat: 'Healthcare & Medical', title: 'DIAGNOSTIC RADIOLOGY MRI REPORT', desc: 'Procedure: MRI Lumbar Spine without Contrast | Impression: Normal spinal canal caliber.' },
  { id: 45, name: 'patient_intake_medical_history', cat: 'Healthcare & Medical', title: 'PATIENT MEDICAL HISTORY REGISTRATION', desc: 'Allergies: Penicillin | Past Surgeries: Appendectomy (2018) | Emergency Contact listed.' },
  { id: 46, name: 'vaccination_immunization_record', cat: 'Healthcare & Medical', title: 'INTERNATIONAL CERTIFICATE OF VACCINATION', desc: 'Vaccine: Hepatitis B, MMR, COVID-19 mRNA | Batch: FA8820 | Administered date recorded.' },
  { id: 47, name: 'dental_examination_chart', cat: 'Healthcare & Medical', title: 'DENTAL EXAMINATION ODONTOGRAM', desc: 'Prophylaxis completed | Tooth #14 MO composite restoration recommended.' },
  { id: 48, name: 'health_insurance_claim', cat: 'Healthcare & Medical', title: 'CMS-1500 HEALTH INSURANCE CLAIM', desc: 'ICD-10 Code: J20.9 Acute bronchitis | CPT Code: 99213 Office Visit Level 3' },
  { id: 49, name: 'specialist_referral_letter', cat: 'Healthcare & Medical', title: 'MEDICAL SPECIALIST REFERRAL LETTER', desc: 'Referring Dr. Robert Evans to Cardiology Clinic for comprehensive stress echo evaluation.' },
  { id: 50, name: 'clinical_pathology_report', cat: 'Healthcare & Medical', title: 'SURGICAL PATHOLOGY BIOPSY REPORT', desc: 'Specimen: Dermal punch biopsy | Microscopic: Benign seborrheic keratosis, margins clear.' },

  // Education & Certification (51-60)
  { id: 51, name: 'university_degree_diploma', cat: 'Education & Certification', title: 'BACHELOR OF SCIENCE DIPLOMA', desc: 'Conferred with all the Rights, Honors, and Privileges thereunto appertaining.' },
  { id: 52, name: 'certificate_of_achievement', cat: 'Education & Certification', title: 'CERTIFICATE OF EXCELLENCE', desc: 'In recognition of outstanding dedication and exemplary leadership performance.' },
  { id: 53, name: 'official_academic_transcript', cat: 'Education & Certification', title: 'OFFICIAL UNIVERSITY TRANSCRIPT', desc: 'Cumulative GPA: 3.89 / 4.00 | Total Credits: 128 | Degree Conferred: Summa Cum Laude.' },
  { id: 54, name: 'course_completion_certificate', cat: 'Education & Certification', title: 'FULL STACK DEVELOPER CERTIFICATE', desc: 'Successfully completed 120 hours of advanced cloud computing and software architecture.' },
  { id: 55, name: 'letter_of_recommendation', cat: 'Education & Certification', title: 'ACADEMIC RECOMMENDATION LETTER', desc: 'I write this letter to give my highest recommendation for graduate program admission.' },
  { id: 56, name: 'internship_completion_letter', cat: 'Education & Certification', title: 'INTERNSHIP APPRAISAL CERTIFICATE', desc: 'Successfully concluded 6-month software engineering internship with outstanding rating.' },
  { id: 57, name: 'high_school_report_card', cat: 'Education & Certification', title: 'SECONDARY SCHOOL PROGRESS REPORT', desc: 'Mathematics: A (95%) | Physics: A (92%) | English Literature: A- (89%)' },
  { id: 58, name: 'honor_roll_certificate', cat: 'Education & Certification', title: 'DEANS HONOR ROLL RECOGNITION', desc: 'Awarded for maintaining superior academic standing throughout the academic year.' },
  { id: 59, name: 'scholarship_award_letter', cat: 'Education & Certification', title: 'MERIT SCHOLARSHIP GRANT NOTICE', desc: 'Awarded $15,000 Annual Presidential Fellowship Grant for continuing graduate studies.' },
  { id: 60, name: 'workshop_participation_pass', cat: 'Education & Certification', title: 'PROFESSIONAL WORKSHOP ATTENDANCE', desc: 'Continuing Professional Development (CPD) accreditation: 8 Contact Hours.' },

  // Shipping & Logistics (61-70)
  { id: 61, name: 'bill_of_lading', cat: 'Shipping & Logistics', title: 'OCEAN BILL OF LADING (BOL)', desc: 'Vessel: Maersk Mc-Kinney | Port of Loading: Rotterdam | Port of Discharge: Singapore.' },
  { id: 62, name: 'commercial_shipping_manifest', cat: 'Shipping & Logistics', title: 'CARGO FLIGHT SHIPPING MANIFEST', desc: 'Total Gross Weight: 4,820 KG | 24 Wooden Crates | Non-Hazardous Electronic Parts.' },
  { id: 63, name: 'warehouse_packing_slip', cat: 'Shipping & Logistics', title: 'ORDER FULFILLMENT PACKING LIST', desc: 'Order #ORD-7710 | Packed by Station 4 | Verified against inventory barcodes.' },
  { id: 64, name: 'delivery_order_receipt', cat: 'Shipping & Logistics', title: 'PROOF OF DELIVERY (POD) RECEIPT', desc: 'Delivered in good condition to recipient security desk | Signed & Timestamped.' },
  { id: 65, name: 'customs_commercial_invoice', cat: 'Shipping & Logistics', title: 'CUSTOMS EXPORT DECLARATION INVOICE', desc: 'Country of Origin: USA | Incoterms 2020: FOB | Total Declared Value: $58,000.' },
  { id: 66, name: 'freight_waybill', cat: 'Shipping & Logistics', title: 'AIR WAYBILL (AWB) CONSIGNMENT', desc: 'AWB No: 020-94819201 | Shipper: DHL Express Hub | Consignee: Nexus Corp.' },
  { id: 67, name: 'warehouse_inventory_count', cat: 'Shipping & Logistics', title: 'ANNUAL PHYSICAL INVENTORY AUDIT', desc: 'Bin Location A-12 through F-40 | Discrepancy Rate: 0.02% (Well within tolerance).' },
  { id: 68, name: 'rma_return_authorization', cat: 'Shipping & Logistics', title: 'RETURN MERCHANDISE FORM (RMA)', desc: 'RMA Number: RMA-2026-09 | Reason: Hardware warranty replacement unit requested.' },
  { id: 69, name: 'cargo_inspection_certificate', cat: 'Shipping & Logistics', title: 'PRE-SHIPMENT QUALITY INSPECTION', desc: 'Quality assurance certificate verifying zero structural defects and secure packaging.' },
  { id: 70, name: 'certificate_of_origin', cat: 'Shipping & Logistics', title: 'CERTIFICATE OF ORIGIN (CHAMBER OF COMMERCE)', desc: 'Under authority of National Chamber of Commerce | Goods produced in Germany.' },

  // Travel & Hospitality (71-80)
  { id: 71, name: 'flight_electronic_ticket', cat: 'Travel & Hospitality', title: 'PASSENGER ITINERARY & E-TICKET', desc: 'Airline: Singapore Airlines | SQ 22 | PNR: X89QW | Seat: 14A | Baggage: 30kg' },
  { id: 72, name: 'airline_boarding_pass', cat: 'Travel & Hospitality', title: 'AIRLINE BOARDING PASS', desc: 'Gate: B22 | Boarding: 08:45 | Flight: AA 104 | Class: Business | Zone: 1' },
  { id: 73, name: 'hotel_reservation_confirmation', cat: 'Travel & Hospitality', title: 'HOTEL BOOKING CONFIRMATION', desc: 'Grand Hyatt Tokyo | Check-in: 10 Dec 2026 | Check-out: 15 Dec 2026 | Deluxe King Room.' },
  { id: 74, name: 'car_rental_agreement', cat: 'Travel & Hospitality', title: 'VEHICLE RENTAL MASTER AGREEMENT', desc: 'Vehicle: Tesla Model 3 | Unlimited Mileage | CDW Full Insurance Coverage Included.' },
  { id: 75, name: 'restaurant_menu_landscape', cat: 'Travel & Hospitality', title: 'A LA CARTE DINING MENU', desc: 'Starters: Truffle Soup $18 | Mains: Wagyu Ribeye $65 | Desserts: Tiramisu $14', orientation: 'landscape' },
  { id: 76, name: 'travel_insurance_certificate', cat: 'Travel & Hospitality', title: 'WORLDWIDE TRAVEL INSURANCE POLICY', desc: 'Policy: TI-882910 | Emergency Medical Coverage: $1,000,000 | 24/7 Assistance.' },
  { id: 77, name: 'event_conference_ticket', cat: 'Travel & Hospitality', title: 'GLOBAL TECH SUMMIT VIP PASS', desc: 'Badge Name: Johnathan Doe | Access: All Keynotes, VIP Lounge, Networking Dinners.' },
  { id: 78, name: 'travel_itinerary_schedule', cat: 'Travel & Hospitality', title: '7-DAY GUIDED TOUR ITINERARY', desc: 'Day 1: Arrival in Zurich | Day 2: Lucerne & Mount Pilatus | Day 3: Interlaken Train.' },
  { id: 79, name: 'cruise_ship_boarding_pass', cat: 'Travel & Hospitality', title: 'ROYAL CRUISE LINE BOARDING PASS', desc: 'Ship: Symphony of the Seas | Stateroom: Balcony 9214 | Port: Miami Terminal A.' },
  { id: 80, name: 'embassy_visa_invitation', cat: 'Travel & Hospitality', title: 'FOREIGN VISA SPONSORSHIP LETTER', desc: 'Formal sponsorship declaration covering accommodation and living expenses for visit.' },

  // Real Estate & Construction (81-90)
  { id: 81, name: 'real_estate_property_flyer', cat: 'Real Estate & Construction', title: 'LUXURY WATERFRONT PENTHOUSE', desc: '4 Bedrooms | 3.5 Baths | 3,400 Sq Ft | Panoramic Skyline & Bay Views | $2,450,000.' },
  { id: 82, name: 'property_inspection_report', cat: 'Real Estate & Construction', title: 'HOME STRUCTURAL INSPECTION AUDIT', desc: 'Roofing: Excellent | Foundation: Sound | HVAC System: Functional | Plumbing: Passed.' },
  { id: 83, name: 'architectural_specification_sheet', cat: 'Real Estate & Construction', title: 'ARCHITECTURAL FINISHES SPECIFICATION', desc: 'Flooring: White Oak Engineered Hardwood | Countertops: Calacatta Quartz Slab.' },
  { id: 84, name: 'construction_scope_of_work', cat: 'Real Estate & Construction', title: 'CONSTRUCTION SCOPE OF WORK (SOW)', desc: 'Phase 1: Excavation | Phase 2: Structural Framing | Phase 3: MEP Rough-in | Phase 4: Finishes.' },
  { id: 85, name: 'building_permit_application', cat: 'Real Estate & Construction', title: 'MUNICIPAL BUILDING PERMIT APPLICATION', desc: 'Project: Commercial Renovation | Zoning: C-2 General Commercial | Code Compliant.' },
  { id: 86, name: 'land_title_deed', cat: 'Real Estate & Construction', title: 'OFFICIAL REGISTERED LAND TITLE DEED', desc: 'Parcel Identification No: 48-192-004 | County Recorder of Deeds Office.' },
  { id: 87, name: 'subcontractor_agreement', cat: 'Real Estate & Construction', title: 'SUBCONTRACTOR WORK AGREEMENT', desc: 'Electrical and Telecommunications Wiring Subcontract: Fixed Price Lump Sum.' },
  { id: 88, name: 'hvac_maintenance_checklist', cat: 'Real Estate & Construction', title: 'HVAC SYSTEM PREVENTATIVE SERVICE LOG', desc: 'Refrigerant pressure checked | Air filters replaced | Blower motor lubricated.' },
  { id: 89, name: 'commercial_lease_abstract', cat: 'Real Estate & Construction', title: 'COMMERCIAL LEASE SUMMARY ABSTRACT', desc: 'Tenant: Horizon Media | Leased Space: 12,000 RSF | Base Year Expense Stop: $14.50/RSF.' },
  { id: 90, name: 'closing_disclosure_statement', cat: 'Real Estate & Construction', title: 'MORTGAGE CLOSING DISCLOSURE', desc: 'Loan Amount: $400,000 | Interest Rate: 5.25% | Estimated Cash to Close: $62,400.' },

  // HR, Operations & Legal Personal (91-100)
  { id: 91, name: 'formal_job_offer_letter', cat: 'HR & Operations', title: 'EXECUTIVE EMPLOYMENT OFFER', desc: 'Position: VP of Engineering | Base Salary: $240,000 | Equity Incentive Grant: 50,000 Units.' },
  { id: 92, name: 'employee_resignation_letter', cat: 'HR & Operations', title: 'FORMAL NOTICE OF RESIGNATION', desc: 'Please accept this letter as formal notification of my resignation, effective two weeks hence.' },
  { id: 93, name: 'annual_performance_appraisal', cat: 'HR & Operations', title: 'ANNUAL EMPLOYEE PERFORMANCE REVIEW', desc: 'Overall Rating: Exceeds Expectations (4.8/5.0) | Key Strengths: Strategic Leadership.' },
  { id: 94, name: 'onboarding_checklist', cat: 'HR & Operations', title: 'NEW HIRE HR ONBOARDING CHECKLIST', desc: 'I-9 Verification | Direct Deposit Setup | Laptop Provisioning | Security Badging.' },
  { id: 95, name: 'employee_disciplinary_notice', cat: 'HR & Operations', title: 'HUMAN RESOURCES FORMAL COUNSELING', desc: 'Documentation of workplace policy review and performance improvement milestones.' },
  { id: 96, name: 'timesheet_attendance_log', cat: 'HR & Operations', title: 'BI-WEEKLY EMPLOYEE TIMESHEET', desc: 'Week 1: 40.0 Regular Hours | Week 2: 40.0 Regular Hours + 4.5 OT Hours | Approved.' },
  { id: 97, name: 'press_release_announcement', cat: 'HR & Operations', title: 'FOR IMMEDIATE RELEASE: PRODUCT LAUNCH', desc: 'SAN FRANCISCO - Next-Gen Autonomous AI Platform Achieves Breakthrough In Document Intelligence.' },
  { id: 98, name: 'corporate_newsletter_3col', cat: 'HR & Operations', title: 'COMPANY QUARTERLY INSIGHTS', desc: 'Q4 Financial Highlights | Global Expansion Updates | Employee Spotlights & Community Outreach.' },
  { id: 99, name: 'security_incident_report', cat: 'HR & Operations', title: 'CYBERSECURITY INCIDENT INVESTIGATION', desc: 'Incident ID: SEC-2026-401 | Severity: Low | Root Cause: Phishing simulation contained.' },
  { id: 100, name: 'last_will_and_testament', cat: 'HR & Operations', title: 'LAST WILL AND TESTAMENT', desc: 'I, being of sound mind and memory, do hereby make, publish, and declare this my Last Will.' }
];

// Append remaining 90 specs
for (const item of CATEGORIES_MAP) {
  DOCUMENT_SPECS.push({
    id: item.id,
    name: item.name,
    category: item.cat,
    title: item.title,
    orientation: item.orientation || 'portrait',
    layout: 'standard_semantic',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 40px; color: #222; line-height: 1.5;">
        <div style="border-bottom: 2px solid #2c3e50; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
          <div>
            <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #7f8c8d;">${item.cat}</span>
            <h2 style="margin: 4px 0 0 0; color: #2c3e50;">${item.title}</h2>
          </div>
          <div style="text-align: right; font-size: 12px; color: #555;">
            <b>Doc Ref:</b> DOC-2026-${String(item.id).padStart(4, '0')}<br>
            <b>Date:</b> 15 November 2026
          </div>
        </div>

        <div style="background: #f8f9fa; border-left: 4px solid #3498db; padding: 12px 16px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 13.5px; color: #333;"><b>Summary / Scope:</b> ${item.desc}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px;">
          <thead>
            <tr style="background: #ecf0f1; text-align: left;">
              <th style="padding: 8px 12px; border: 1px solid #bdc3c7;">Clause / Item</th>
              <th style="padding: 8px 12px; border: 1px solid #bdc3c7;">Specification & Details</th>
              <th style="padding: 8px 12px; border: 1px solid #bdc3c7; text-align: right;">Status / Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #bdc3c7;">Section 1.01</td>
              <td style="padding: 8px 12px; border: 1px solid #bdc3c7;">Primary Document Intent & Scope of Provisions</td>
              <td style="padding: 8px 12px; border: 1px solid #bdc3c7; text-align: right; color: #27ae60;"><b>Verified Active</b></td>
            </tr>
            <tr style="background: #fafafa;">
              <td style="padding: 8px 12px; border: 1px solid #bdc3c7;">Section 1.02</td>
              <td style="padding: 8px 12px; border: 1px solid #bdc3c7;">Compliance with Regulatory & Organizational Guidelines</td>
              <td style="padding: 8px 12px; border: 1px solid #bdc3c7; text-align: right; color: #2980b9;"><b>Compliant</b></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; border: 1px solid #bdc3c7;">Section 1.03</td>
              <td style="padding: 8px 12px; border: 1px solid #bdc3c7;">Operational Term & Obligation Fulfillment Deadlines</td>
              <td style="padding: 8px 12px; border: 1px solid #bdc3c7; text-align: right;">31 Dec 2027</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 35px; display: flex; justify-content: space-between; font-size: 13px;">
          <div style="border-top: 1px solid #777; width: 220px; padding-top: 6px;">
            <b>Authorized Signatory:</b><br>
            Managing Director / Officer
          </div>
          <div style="border-top: 1px solid #777; width: 220px; padding-top: 6px; text-align: right;">
            <b>Countersigned / Sealed:</b><br>
            Office of Records & Audits
          </div>
        </div>
      </div>
    `
  });
}

function verifyDocxZip(buffer) {
  // Simple check for valid ZIP and document.xml existence
  let offset = 0;
  let hasDocumentXml = false;
  let hasFramePr = false;

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
      hasDocumentXml = true;
      try {
        const xml = compMethod === 8 ? zlib.inflateRawSync(fileData).toString('utf8') : fileData.toString('utf8');
        hasFramePr = xml.includes('w:framePr');
      } catch (e) {
        // ignore inflate error
      }
    }
    offset = dataStart + compSize;
  }

  return { hasDocumentXml, hasFramePr };
}

async function run100DocumentsTest() {
  console.log('========================================================================');
  console.log('   MASSIVE TEST HARNESS: 100 DISTINCT DOCUMENT TYPES PDF -> WORD DOCX   ');
  console.log('========================================================================\n');

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--allow-file-access-from-files']
  });

  // STEP 1: Generate all 100 PDFs
  console.log(`[Phase 1] Generating ${DOCUMENT_SPECS.length} distinct document PDFs...`);
  const genPage = await browser.newPage();

  const generatedDocs = [];
  for (const docSpec of DOCUMENT_SPECS) {
    const filename = `${String(docSpec.id).padStart(3, '0')}_${docSpec.name}.pdf`;
    const filePath = path.join(DOCS_DIR, filename);

    if (!fs.existsSync(filePath)) {
      await genPage.setContent(docSpec.html, { waitUntil: 'load' });
      const pdfBuffer = await genPage.pdf({
        format: 'A4',
        landscape: docSpec.orientation === 'landscape',
        printBackground: true,
        margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' }
      });
      fs.writeFileSync(filePath, pdfBuffer);
      generatedDocs.push({ ...docSpec, filename, filePath, size: pdfBuffer.length });
    } else {
      const stats = fs.statSync(filePath);
      generatedDocs.push({ ...docSpec, filename, filePath, size: stats.size });
    }
  }
  await genPage.close();
  console.log(`  ✓ All ${generatedDocs.length} distinct PDF documents ready in ${DOCS_DIR}!\n`);

  // STEP 2: Test each of the 100 documents in tools/pdf-word.html
  console.log(`[Phase 2] Executing PDF to Word Converter on ALL ${generatedDocs.length} documents...`);
  const converterPage = await browser.newPage();
  converterPage.on('dialog', d => d.dismiss());

  let passedCount = 0;
  let failedCount = 0;
  const testResults = [];

  for (let idx = 0; idx < generatedDocs.length; idx++) {
    const doc = generatedDocs[idx];
    const docNum = `[${String(idx + 1).padStart(3, '0')}/100]`;

    try {
      await converterPage.goto(`file://${path.join(REPO_ROOT, 'tools/pdf-word.html')}`);

      const fileInput = await converterPage.$('#pdfFileInput');
      await fileInput.uploadFile(doc.filePath);

      // Wait until PDF.js finishes analyzing the document
      await converterPage.waitForFunction((expectedName) => {
        const fn = document.getElementById('infoFileName');
        const count = document.getElementById('infoPageCount');
        return fn && fn.textContent.includes(expectedName) &&
               count && !count.textContent.includes('-') && !count.textContent.includes('Loading');
      }, { timeout: 6000 }, doc.filename);

      // Trigger conversion
      await converterPage.click('#btnConvert');

      // Wait for result box
      await converterPage.waitForSelector('#resultBox:not(.d-none)', { timeout: 12000 });

      const result = await converterPage.evaluate(async () => {
        const dlBtn = document.getElementById('downloadBtn');
        const info = document.getElementById('resultFileName');
        if (!dlBtn || !dlBtn.href || !dlBtn.href.startsWith('blob:')) {
          return { success: false, reason: 'No blob URL generated' };
        }

        const res = await fetch(dlBtn.href);
        const arrayBuf = await res.arrayBuffer();
        const base64 = btoa(
          new Uint8Array(arrayBuf).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        return {
          success: true,
          downloadName: dlBtn.download,
          infoText: info ? info.textContent : '',
          byteLength: arrayBuf.byteLength,
          base64Data: base64
        };
      });

      if (result.success && result.byteLength > 2000 && result.downloadName.endsWith('.docx')) {
        const docxBuffer = Buffer.from(result.base64Data, 'base64');
        const outDocxPath = path.join(OUTPUT_DIR, result.downloadName);
        fs.writeFileSync(outDocxPath, docxBuffer);

        const zipAudit = verifyDocxZip(docxBuffer);

        passedCount++;
        testResults.push({
          id: doc.id,
          name: doc.name,
          category: doc.category,
          title: doc.title,
          status: 'PASSED',
          pdfSize: doc.size,
          docxSize: result.byteLength,
          hasDocumentXml: zipAudit.hasDocumentXml,
          hasFramePr: zipAudit.hasFramePr,
          downloadName: result.downloadName
        });

        if ((idx + 1) % 10 === 0 || idx === 0 || idx === generatedDocs.length - 1) {
          console.log(`  ✓ ${docNum} ${doc.name.padEnd(32)} -> DOCX: ${result.byteLength} B | framePr: ${zipAudit.hasFramePr} | [${doc.category}]`);
        }
      } else {
        failedCount++;
        testResults.push({
          id: doc.id,
          name: doc.name,
          category: doc.category,
          title: doc.title,
          status: 'FAILED',
          reason: result.reason || 'Invalid byte length'
        });
        console.error(`  ❌ ${docNum} ${doc.name} failed:`, result);
      }
    } catch (err) {
      failedCount++;
      testResults.push({
        id: doc.id,
        name: doc.name,
        category: doc.category,
        title: doc.title,
        status: 'FAILED',
        error: err.message
      });
      console.error(`  ❌ ${docNum} ${doc.name} exception:`, err.message);
    }
  }

  await converterPage.close();
  await browser.close();

  console.log('\n========================================================================');
  console.log(`  FINAL VERIFICATION: ${passedCount} / ${generatedDocs.length} PASSED (Failed: ${failedCount})`);
  console.log('========================================================================\n');

  // STEP 3: Write Comprehensive Results Summary JSON
  const summaryReport = {
    totalDocuments: generatedDocs.length,
    passed: passedCount,
    failed: failedCount,
    timestamp: new Date().toISOString(),
    results: testResults
  };

  fs.writeFileSync(
    path.join(DOCS_DIR, 'test_100_results.json'),
    JSON.stringify(summaryReport, null, 2)
  );

  console.log(`Audit report persisted to ${path.join(DOCS_DIR, 'test_100_results.json')}`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

run100DocumentsTest().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
