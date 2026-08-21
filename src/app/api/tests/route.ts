import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { sampleTests, MockTest } from "@/data/testsData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cls = searchParams.get("class");
    const subject = searchParams.get("subject");
    const targetBatch = searchParams.get("targetBatch") || searchParams.get("batch");
    const enrolledSlugs = searchParams.get("enrolledSlugs");
    const instructorEmail = searchParams.get("instructorEmail");
    const instructor = searchParams.get("instructor");

    const db = await getDatabase();
    const query: any = {};

    if (cls && cls !== "All") query.class = cls;
    if (subject && subject !== "All") query.subject = subject;

    // Faculty filter: only tests created by this faculty
    if (instructorEmail || instructor) {
      const orList: any[] = [];
      if (instructorEmail) orList.push({ instructorEmail: instructorEmail.toLowerCase() });
      if (instructor) orList.push({ instructorName: new RegExp(instructor, "i") });
      if (orList.length > 0) query.$or = orList;
    }

    // Student filter: tests matching enrolled batches OR public practice tests
    if (enrolledSlugs) {
      const slugList = enrolledSlugs.split(",").map((s) => s.trim().replace(/^[-]+|[-]+$/g, "")).filter(Boolean);
      query.$or = [
        { isPublic: true },
        { targetBatch: "all" },
        { targetBatch: { $in: slugList } },
        { courseSlug: { $in: slugList } }
      ];
    } else if (targetBatch && targetBatch !== "all") {
      query.$or = [{ targetBatch: targetBatch }, { courseSlug: targetBatch }];
    }

    let tests = await db.collection("tests").find(query).sort({ createdAt: -1 }).toArray();

    if (tests.length === 0 && !cls && !subject && !targetBatch && !enrolledSlugs && !instructorEmail) {
      await db.collection("tests").insertMany(
        sampleTests.map((t) => ({ ...t, isPublic: true, targetBatch: "all", createdAt: new Date() }))
      );
      tests = await db.collection("tests").find({}).toArray();
    }

    return NextResponse.json({ success: true, count: tests.length, tests });
  } catch (e) {
    return NextResponse.json({ success: true, count: sampleTests.length, tests: sampleTests });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDatabase();

    const testId = body.id || body.testId || `test_${Date.now()}`;
    const newTest = {
      id: testId,
      testId,
      title: body.title || "Academic Chapter Mock Test",
      description: body.description || "Comprehensive timed test with board-level scoring & explanation.",
      class: body.class || "Class 10",
      subject: body.subject || "Mathematics",
      targetBatch: body.targetBatch ? body.targetBatch.replace(/^[-]+|[-]+$/g, "") : "all",
      courseSlug: body.targetBatch ? body.targetBatch.replace(/^[-]+|[-]+$/g, "") : "all",
      instructorName: body.instructorName || "Senior Faculty",
      instructorEmail: body.instructorEmail ? body.instructorEmail.toLowerCase().trim() : "",
      duration: Number(body.duration) || 60,
      totalMarks: Number(body.totalMarks) || 40,
      totalQuestions: Array.isArray(body.questions) ? body.questions.length : Number(body.totalQuestions) || 10,
      passingMarks: Number(body.passingMarks) || 16,
      isPublic: body.isPublic !== undefined ? Boolean(body.isPublic) : true,
      questions: Array.isArray(body.questions) && body.questions.length > 0 ? body.questions : [
        {
          id: 1,
          question: "Find the roots of the quadratic equation 2x² - 5x + 3 = 0.",
          options: ["x = 1, 3/2", "x = 2, 1/2", "x = -1, -3/2", "x = 3, 2"],
          correctAnswer: 0,
          explanation: "Factorizing gives (2x - 3)(x - 1) = 0 => x = 3/2 or x = 1.",
          marks: 4
        }
      ],
      createdAt: new Date(),
    };

    await db.collection("tests").insertOne(newTest);
    return NextResponse.json({ success: true, test: newTest });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, testId, ...updates } = body;
    const targetId = id || testId;

    if (!targetId) {
      return NextResponse.json({ success: false, error: "Test ID required" }, { status: 400 });
    }

    const db = await getDatabase();
    updates.updatedAt = new Date();

    await db.collection("tests").updateOne(
      { $or: [{ id: targetId }, { testId: targetId }] },
      { $set: updates }
    );

    return NextResponse.json({ success: true, updated: updates });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Test ID required" }, { status: 400 });
    }

    const db = await getDatabase();
    await db.collection("tests").deleteOne({ $or: [{ id: id }, { testId: id }] });

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
