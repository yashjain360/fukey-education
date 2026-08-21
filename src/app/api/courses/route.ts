import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { coursesData, Course } from "@/data/coursesData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cls = searchParams.get("class");
    const lang = searchParams.get("lang");
    const subject = searchParams.get("subject");
    const slug = searchParams.get("slug");

    const db = await getDatabase();
    const query: Record<string, any> = {};
    if (slug) query.slug = slug;
    if (cls && cls !== "All") query.class = cls;
    if (lang && lang !== "All") query.language = lang;
    if (subject && subject !== "All") query.subject = subject;

    let courses = await db.collection("courses").find(query).toArray();

    // Auto-seed if database is empty
    if (courses.length === 0 && !slug && !cls && !lang && !subject) {
      await db.collection("courses").insertMany(
        coursesData.map((c) => ({ ...c, timestamp: new Date() }))
      );
      courses = await db.collection("courses").find({}).toArray();
    }

    if (courses && courses.length > 0) {
      return NextResponse.json({ success: true, count: courses.length, courses, source: "mongodb" });
    }
    return NextResponse.json({ success: true, count: coursesData.length, courses: coursesData, source: "fallback" });
  } catch (error) {
    return NextResponse.json({ success: true, count: coursesData.length, courses: coursesData, source: "fallback", error: String(error) });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDatabase();

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const newCourse: Course = {
      id: body.id || `course-${Date.now()}`,
      slug,
      title: body.title,
      price: Number(body.price) || 1499,
      originalPrice: Number(body.originalPrice) || 2499,
      discountPercent: Number(body.discountPercent) || 40,
      thumbnail: body.thumbnail || "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png",
      instructor: body.instructor || "Pawan Gupta",
      instructorAvatar: body.instructorAvatar || "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-06-15-02-14-08-1645.webp",
      instructorTitle: body.instructorTitle || "Senior Mathematics Faculty",
      class: body.class || "Class 10",
      classNum: Number(body.classNum) || 10,
      subject: body.subject || "Mathematics",
      language: body.language || "Hindi",
      rating: Number(body.rating) || 5.0,
      reviewsCount: Number(body.reviewsCount) || 18,
      lessonsCount: Number(body.lessonsCount) || 36,
      duration: body.duration || "45 Hours Live",
      enrolledCount: Number(body.enrolledCount) || 140,
      isFeatured: body.isFeatured ?? true,
      description: body.description || "Comprehensive live online board preparation batch mapped 100% to NCERT curriculum with daily 15-minute doubt solving.",
      curriculum: body.curriculum || [
        {
          title: "Module 1: Fundamental Concepts & Theorems",
          lessons: ["Live Lecture 1: Concept Introduction", "Live Lecture 2: Derivations", "15-Min Live Doubt Room"]
        }
      ],
      features: body.features || [
        "100% NCERT Syllabus Coverage",
        "Live 1-on-1 Doubt Clearing",
        "Handwritten Formula PDF Notes"
      ]
    };

    await db.collection("courses").insertOne(newCourse);
    return NextResponse.json({ success: true, course: newCourse });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Course ID required" }, { status: 400 });
    }

    const db = await getDatabase();
    updates.updatedAt = new Date();

    await db.collection("courses").updateOne(
      { $or: [{ id: id }, { slug: id }] },
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
      return NextResponse.json({ success: false, error: "Course ID required" }, { status: 400 });
    }

    const db = await getDatabase();
    await db.collection("courses").deleteOne({ $or: [{ id: id }, { slug: id }] });

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
