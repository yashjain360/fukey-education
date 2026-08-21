import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ testId: string }> }
) {
  const resolvedParams = await params;
  const testId = resolvedParams.testId || "test-maths-10-quadratics";

  const questions = [
    {
      id: 1,
      section: "Section A: Multiple Choice Questions (1 Mark Each)",
      marks: 4,
      negativeMarks: 1,
      statement: "If the roots of the quadratic equation 2x² - 8x + k = 0 are real and equal, then the value of k is:",
      options: [
        "A) 2",
        "B) 4",
        "C) 8",
        "D) 16"
      ],
      correctAnswer: 2, // Option C (8)
      explanation: "For real and equal roots, discriminant D = b² - 4ac = 0. Here a = 2, b = -8, c = k. Hence (-8)² - 4(2)(k) = 0 => 64 - 8k = 0 => 8k = 64 => k = 8. (NCERT Class 10th Maths Ch 4).",
      ncertRef: "NCERT Class 10 Mathematics, Chapter 4 (Quadratic Equations), Exercise 4.4"
    },
    {
      id: 2,
      section: "Section A: Multiple Choice Questions (1 Mark Each)",
      marks: 4,
      negativeMarks: 1,
      statement: "Which of the following is NOT a quadratic equation?",
      options: [
        "A) (x - 2)² + 1 = 2x - 3",
        "B) x(x + 1) + 8 = (x + 2)(x - 2)",
        "C) x(2x + 3) = x² + 1",
        "D) (x + 2)³ = x³ - 4"
      ],
      correctAnswer: 1, // Option B
      explanation: "Simplifying Option B: x² + x + 8 = x² - 4 => x + 12 = 0. The x² term cancels out, making it a linear equation of degree 1.",
      ncertRef: "NCERT Class 10 Mathematics, Chapter 4, Exercise 4.1"
    },
    {
      id: 3,
      section: "Section A: Multiple Choice Questions (1 Mark Each)",
      marks: 4,
      negativeMarks: 1,
      statement: "The discriminant of the quadratic equation 3x² - 2x + 1/3 = 0 is:",
      options: [
        "A) 0",
        "B) 1/3",
        "C) -4/3",
        "D) 4"
      ],
      correctAnswer: 0, // Option A (0)
      explanation: "D = b² - 4ac = (-2)² - 4(3)(1/3) = 4 - 4 = 0.",
      ncertRef: "NCERT Class 10 Mathematics, Chapter 4, Exercise 4.4"
    },
    {
      id: 4,
      section: "Section B: Conceptual & Analytical Questions (2 Marks Each)",
      marks: 4,
      negativeMarks: 1,
      statement: "If α and β are the roots of 3x² + 5x - 2 = 0, then the value of (α + β) + αβ is:",
      options: [
        "A) -7/3",
        "B) -1",
        "C) 1",
        "D) 7/3"
      ],
      correctAnswer: 0, // Option A (-7/3)
      explanation: "Sum of roots (α + β) = -b/a = -5/3. Product of roots αβ = c/a = -2/3. (α + β) + αβ = -5/3 + (-2/3) = -7/3.",
      ncertRef: "NCERT Class 10 Mathematics, Chapter 4, Board High-Yield Formula"
    },
    {
      id: 5,
      section: "Section C: Case-Based Numerical Question",
      marks: 4,
      negativeMarks: 1,
      statement: "A motor boat whose speed is 18 km/h in still water takes 1 hour more to go 24 km upstream than to return downstream to the same spot. The speed of the stream is:",
      options: [
        "A) 4 km/h",
        "B) 5 km/h",
        "C) 6 km/h",
        "D) 8 km/h"
      ],
      correctAnswer: 2, // Option C (6 km/h)
      explanation: "Let stream speed = x km/h. Upstream speed = 18 - x, Downstream speed = 18 + x. [24 / (18 - x)] - [24 / (18 + x)] = 1. Solving gives x² + 48x - 324 = 0 => (x + 54)(x - 6) = 0 => x = 6 km/h.",
      ncertRef: "NCERT Class 10 Mathematics, Chapter 4, Example 15 (PYQ 2023, 2024)"
    }
  ];

  return NextResponse.json({
    success: true,
    test: {
      id: testId,
      title: "Class 10th Mathematics: Full Chapter Test – Quadratic Equations & AP",
      class: "Class 10",
      subject: "Mathematics",
      durationMinutes: 45,
      totalQuestions: questions.length,
      totalMarks: 20,
      instructions: [
        "This examination is monitored with active Anti-Cheating & Integrity Guard.",
        "Leaving fullscreen or switching browser tabs will record a strike (3 strikes = automatic submit).",
        "Right-click, copy-paste, and keyboard shortcuts are strictly disabled.",
        "+4 marks for every correct response, -1 mark for every incorrect response, 0 for unattempted."
      ],
      questions
    }
  });
}
