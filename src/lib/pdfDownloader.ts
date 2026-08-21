/**
 * Utility to download formatted documents (Invoices, Receipts, Study Notes, Formula Sheets)
 */

export function downloadDocument(filename: string, contentHtml: string) {
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${filename}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 32px;
      line-height: 1.5;
    }
    .print-container {
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    }
    @media print {
      body { padding: 0; background: transparent; }
      .print-container { border: none; box-shadow: none; padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="print-container">
    ${contentHtml}
  </div>
  <script>
    window.onload = function() {
      // Auto-trigger print if query param is set
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('autoprint') === 'true') {
        window.print();
      }
    };
  </script>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadStudyNote(title: string, category: string, classLevel: string) {
  const content = `
    <div style="border-bottom: 2px solid #5751E1; padding-bottom: 24px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <h1 style="font-size: 24px; font-weight: 900; color: #050071; margin: 0 0 4px 0;">FUKEY EDUCATION</h1>
        <p style="font-size: 12px; color: #64748b; margin: 0;">Premier Board Exam & Academic Excellence Hub</p>
      </div>
      <div style="text-align: right;">
        <span style="display: inline-block; background: #e0e7ff; color: #3730a3; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 800; text-transform: uppercase;">
          ${classLevel} • ${category}
        </span>
      </div>
    </div>

    <div style="margin-bottom: 32px;">
      <h2 style="font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 8px 0;">${title}</h2>
      <p style="font-size: 12px; color: #64748b; margin: 0;">Verified by Fukey Senior Subject Academic Committee • Session 2026–27</p>
    </div>

    <div style="background: #f8fafc; border-left: 4px solid #5751E1; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <h3 style="font-size: 14px; font-weight: 800; color: #050071; margin: 0 0 6px 0;">📚 Chapter Learning Objectives &amp; Exam Strategy</h3>
      <ul style="font-size: 12px; color: #334155; margin: 0; padding-left: 18px; line-height: 1.8;">
        <li>100% NCERT &amp; CBSE/State Board aligned theoretical breakdown</li>
        <li>Step-by-step solved exemplar derivations and formula derivations</li>
        <li>10-Year Previous Board Question (PYQ) pattern analysis and marking scheme</li>
        <li>High-yield common pitfalls and board exam presentation shortcuts</li>
      </ul>
    </div>

    <div style="margin-bottom: 28px;">
      <h3 style="font-size: 15px; font-weight: 800; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 12px;">
        1. Core Concept Summary &amp; Essential Formulas
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 16px;">
        <thead>
          <tr style="background: #f1f5f9; text-align: left;">
            <th style="padding: 10px; border: 1px solid #cbd5e1;">Topic</th>
            <th style="padding: 10px; border: 1px solid #cbd5e1;">Key Formula / Derivation</th>
            <th style="padding: 10px; border: 1px solid #cbd5e1;">Board Weightage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: 700;">Standard Form &amp; Roots</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">ax² + bx + c = 0 (a ≠ 0) &amp; D = b² - 4ac</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: 700;">High (4–6 Marks)</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: 700;">Nature of Roots</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">D > 0: Real &amp; Distinct | D = 0: Real &amp; Equal | D < 0: Imaginary</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: 700;">Mandatory MCQ</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: 700;">Quadratic Formula</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0;">x = (-b ± √(b² - 4ac)) / (2a)</td>
            <td style="padding: 10px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: 700;">Direct Application</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="background: #fef3c7; border: 1px solid #fde68a; border-radius: 8px; padding: 14px; margin-bottom: 28px; font-size: 12px; color: #92400e;">
      <strong>⚠️ Pro Board Exam Tip:</strong> Always state the formula explicitly with defined variables before substituting numerical values to secure full step-marking credit.
    </div>

    <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #94a3b8;">
      <span>© 2026 Fukey Education • All Rights Reserved</span>
      <span>Helpline: +91 94251 14619 • support@fukeyeducation.com</span>
    </div>
  `;

  downloadDocument(`${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-notes`, content);
}
