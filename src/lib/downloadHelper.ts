/**
 * Utility to generate and trigger direct client-side downloads for NCERT formula
 * cheat-sheets, revision roadmaps, and verified study resources.
 */

export function downloadFormulaSheet(documentTitle: string) {
  if (typeof window === "undefined") return;

  const isMaths = documentTitle.toLowerCase().includes("math");
  const isPhysics = documentTitle.toLowerCase().includes("physic");

  let content = "";
  let filename = `${documentTitle.replace(/[^a-zA-Z0-9]+/g, "_")}.txt`;

  if (isMaths) {
    content = `================================================================================
FUKEY EDUCATION — OFFICIAL NCERT FORMULA CHEAT-SHEET & DERIVATIONS
Target: CBSE & MP State Board Exam Preparation (Classes 9th & 10th)
Prepared By: Pawan Gupta (Senior Mathematics Faculty & HOD)
================================================================================

1. QUADRATIC EQUATIONS (Standard Form: ax² + bx + c = 0)
--------------------------------------------------------------------------------
• Discriminant Formula: D = b² - 4ac
  - If D > 0: Two distinct real roots
  - If D = 0: Two equal real roots (-b / 2a)
  - If D < 0: No real roots
• Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a)
• Sum of Roots (α + β) = -b / a
• Product of Roots (α · β) = c / a

2. ARITHMETIC PROGRESSIONS (AP: a, a+d, a+2d, ...)
--------------------------------------------------------------------------------
• nth Term Formula: aₙ = a + (n - 1)d
• Sum of First n Terms: Sₙ = (n / 2) [2a + (n - 1)d] = (n / 2) [a + l]
• Common Difference: d = aₙ - aₙ₋₁

3. TRIGONOMETRY IDENTITIES & RATIOS
--------------------------------------------------------------------------------
• sin²θ + cos²θ = 1
• 1 + tan²θ = sec²θ
• 1 + cot²θ = cosec²θ
• Specific Angles:
  - sin(0°) = 0, sin(30°) = 1/2, sin(45°) = 1/√2, sin(60°) = √3/2, sin(90°) = 1
  - cos(0°) = 1, cos(30°) = √3/2, cos(45°) = 1/√2, cos(60°) = 1/2, cos(90°) = 0
  - tan(0°) = 0, tan(30°) = 1/√3, tan(45°) = 1, tan(60°) = √3, tan(90°) = Undefined

4. SURFACE AREAS AND VOLUMES
--------------------------------------------------------------------------------
• Sphere: Volume = (4/3)πr³, Surface Area = 4πr²
• Cylinder: Curved Surface = 2πrh, Total Surface = 2πr(r + h), Volume = πr²h
• Cone: Slant Height l = √(r² + h²), Curved Surface = πrl, Volume = (1/3)πr²h
• Hemisphere: Curved Surface = 2πr², Volume = (2/3)πr³

5. STATISTICS & PROBABILITY
--------------------------------------------------------------------------------
• Mean (Direct Method): x̄ = Σ(fᵢxᵢ) / Σfᵢ
• Median = l + [((n/2) - cf) / f] × h
• Mode = l + [(f₁ - f₀) / (2f₁ - f₀ - f₂)] × h
• Empirical Relationship: 3 Median = Mode + 2 Mean

================================================================================
© 2026 Fukey Education Pvt. Ltd. | Bhopal, Madhya Pradesh | fukeyeducation.com
For 1-on-1 Live Doubt Clearing and Daily Practice Papers, visit fukeyeducation.com
================================================================================`;
  } else if (isPhysics) {
    content = `================================================================================
FUKEY EDUCATION — CLASS 12TH PHYSICS CORE DERIVATIONS ROADMAP
Target: CBSE & MP State Board Exam Preparation
Prepared By: Vivek Dubey (Senior Physics Faculty Lead)
================================================================================

1. ELECTROSTATICS & GAUSS THEOREM
--------------------------------------------------------------------------------
• Coulomb\x27s Law: F = (1 / 4πε₀) · (|q₁q₂| / r²)
• Electric Field due to Point Charge: E = (1 / 4πε₀) · (q / r²)
• Gauss Law: ∮ E · dA = q_enclosed / ε₀
• Electric Field due to Infinitely Long Wire: E = λ / (2πε₀r)
• Electric Field due to Infinite Plane Sheet: E = σ / (2ε₀)
• Potential due to Dipole: V = (1 / 4πε₀) · (p cosθ / r²)

2. CURRENT ELECTRICITY & CIRCUITS
--------------------------------------------------------------------------------
• Drift Velocity: v_d = (eE / m) · τ
• Current & Drift Velocity Relation: I = n · e · A · v_d
• Resistivity: ρ = m / (n · e² · τ)
• Kirchhoff\x27s Laws:
  1. Junction Rule: Σ I = 0
  2. Loop Rule: Σ ΔV = 0
• Wheatstone Bridge Balance: P / Q = R / S

3. ELECTROMAGNETISM & OPTICS
--------------------------------------------------------------------------------
• Biot-Savart Law: dB = (μ₀ / 4π) · (I dl sinθ / r²)
• Lens Maker\x27s Formula: 1 / f = (μ - 1) · (1/R₁ - 1/R₂)
• Mirror Formula: 1/f = 1/v + 1/u
• Snell\x27s Law of Refraction: sin(i) / sin(r) = n₂ / n₁

4. DUAL NATURE & SEMICONDUCTORS
--------------------------------------------------------------------------------
• Einstein\x27s Photoelectric Equation: K_max = hν - Φ₀ = eV₀
• de Broglie Wavelength: λ = h / p = h / √(2mE)
• Mass-Energy Equivalence: E = mc² = Δm · 931.5 MeV

================================================================================
© 2026 Fukey Education Pvt. Ltd. | Bhopal, Madhya Pradesh | fukeyeducation.com
================================================================================`;
  } else {
    content = `================================================================================
FUKEY EDUCATION — NCERT REVISION CHEAT-SHEET
Document: ${documentTitle}
Official CBSE & State Board Study Notes
================================================================================

• 100% NCERT Aligned Concepts and Formula Reference.
• Step-by-Step Derivations and Memory Shortcuts for Board Scoring.
• Verified by Senior Subject Matter Experts at Fukey Education Bhopal.

For full interactive batches and daily live classes, log on to:
https://fukeyeducation.com/courses

© 2026 Fukey Education Pvt. Ltd. | Bhopal, MP | Helpline: +91 88718 35015
================================================================================`;
  }

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
