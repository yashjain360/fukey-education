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
    const instructor = searchParams.get("instructor");
    const instructorEmail = searchParams.get("instructorEmail");
    const slugs = searchParams.get("slugs");

    const reseed = searchParams.get("reseed") === "true";

    const db = await getDatabase();

    if (reseed) {
      await db.collection("courses").deleteMany({});
      await db.collection("courses").insertMany(
        coursesData.map((c) => ({ ...c, timestamp: new Date() }))
      );
    }

    const query: Record<string, any> = {};
    if (slug) query.slug = slug.replace(/^[-]+|[-]+$/g, "");
    if (slugs) {
      const slugArr = slugs.split(",").map((s) => s.trim().replace(/^[-]+|[-]+$/g, "")).filter(Boolean);
      if (slugArr.length > 0) query.slug = { $in: slugArr };
    }
    if (cls && cls !== "All") query.class = new RegExp(`^${cls}$`, "i");
    if (lang && lang !== "All") query.language = new RegExp(`^${lang}`, "i");
    if (subject && subject !== "All") query.subject = new RegExp(`^${subject}$`, "i");
    if (instructor || instructorEmail) {
      const orConditions: any[] = [];
      if (instructor) orConditions.push({ instructor: new RegExp(instructor, "i") });
      if (instructorEmail) orConditions.push({ instructorEmail: instructorEmail.toLowerCase() });
      if (orConditions.length > 0) query.$or = orConditions;
    }

    let courses = await db.collection("courses").find(query).toArray();

    // Auto-seed if database is empty
    if (courses.length === 0 && !slug && !cls && !lang && !subject) {
      await db.collection("courses").insertMany(
        coursesData.map((c) => ({ ...c, timestamp: new Date() }))
      );
      courses = await db.collection("courses").find({}).toArray();
    }

    if (courses && courses.length > 0) {
      // Deduplicate courses by slug / id so duplicates never leak
      const uniqueMap = new Map<string, any>();
      courses.forEach((c: any) => {
        const key = c.slug || c.id;
        if (key && !uniqueMap.has(key)) {
          uniqueMap.set(key, c);
        }
      });
      const uniqueCourses = Array.from(uniqueMap.values());
      return NextResponse.json({ success: true, count: uniqueCourses.length, courses: uniqueCourses, source: "mongodb" });
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
      subTitle: body.subTitle || `Complete CBSE & State Board coaching for ${body.title}`,
      class: body.class || "Class 10",
      classNum: Number(body.classNum) || 10,
      subject: body.subject || "Mathematics",
      stream: body.stream || "General",
      language: body.language || "Hindi",
      price: Number(body.price) || 1499,
      originalPrice: Number(body.originalPrice) || 2499,
      discountPercent: Number(body.discountPercent) || 40,
      rating: Number(body.rating) || 5.0,
      reviewsCount: Number(body.reviewsCount) || 18,
      studentsEnrolled: Number(body.studentsEnrolled || body.enrolledCount) || 140,
      instructor: body.instructor || "Pawan Gupta",
      instructorRole: body.instructorRole || body.instructorTitle || "Senior Mathematics Faculty",
      duration: body.duration || "45 Hours Live",
      lessonsCount: Number(body.lessonsCount) || 36,
      resourcesCount: Number(body.resourcesCount) || 12,
      badge: body.badge || "Live Batch",
      description: body.description || "Comprehensive live online board preparation batch mapped 100% to NCERT curriculum with daily 15-minute doubt solving.",
      thumbnail: body.thumbnail || "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png",
      features: body.features || [
        "100% NCERT Syllabus Coverage",
        "Live 1-on-1 Doubt Clearing",
        "Handwritten Formula PDF Notes"
      ],
      curriculum: body.curriculum || [
        {
          moduleTitle: "Module 1: Fundamental Concepts & Theorems",
          duration: "24 Hours",
          topics: ["Live Lecture 1: Concept Introduction", "Live Lecture 2: Derivations", "15-Min Live Doubt Room"]
        }
      ],
      faqs: body.faqs || [
        {
          q: "What is the schedule for this batch?",
          a: "Daily live lectures from Monday to Friday with weekly doubt clearing."
        }
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
