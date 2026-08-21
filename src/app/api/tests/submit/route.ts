import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { testId, studentName, studentEmail, answers, securityStrikes, timeTakenSeconds } = body;

    const answerKeys: Record<number, number> = {
      1: 2, // Option C
      2: 1, // Option B
      3: 0, // Option A
      4: 0, // Option A
      5: 2, // Option C
    };

    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let totalScore = 0;

    Object.keys(answerKeys).forEach((qKey) => {
      const qNum = parseInt(qKey, 10);
      const chosen = answers[qNum];
      if (chosen === undefined || chosen === null) {
        unattemptedCount += 1;
      } else if (chosen === answerKeys[qNum]) {
        correctCount += 1;
        totalScore += 4;
      } else {
        incorrectCount += 1;
        totalScore -= 1;
      }
    });

    totalScore = Math.max(0, totalScore);
    const maxScore = Object.keys(answerKeys).length * 4;
    const percentage = Math.round((totalScore / maxScore) * 100);
    const accuracy = correctCount + incorrectCount > 0 ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) : 0;
    const percentile = Math.min(99.4, 75 + Math.round(percentage * 0.24));

    const result = {
      id: `res-${Date.now()}`,
      testId: testId || "test-maths-10-quadratics",
      studentName: studentName || "Mayank Dubey",
      studentEmail: studentEmail || "mayank@fukeyeducation.com",
      totalScore,
      maxScore,
      percentage,
      accuracy,
      percentile,
      correctCount,
      incorrectCount,
      unattemptedCount,
      securityStrikes: securityStrikes || 0,
      integrityPassed: (securityStrikes || 0) < 3,
      timeTakenSeconds: timeTakenSeconds || 320,
      submittedAt: new Date(),
    };

    try {
      const db = await getDatabase();
      await db.collection("test_results").insertOne(result);
    } catch (e) {}

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
