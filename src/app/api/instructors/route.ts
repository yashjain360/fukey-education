import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { instructorsData, Instructor } from "@/data/instructorsData";

export async function GET() {
  try {
    const db = await getDatabase();
    let instructors = await db.collection("instructors").find({}).toArray();

    // Auto-seed if empty
    if (instructors.length === 0) {
      await db.collection("instructors").insertMany(
        instructorsData.map((inst) => ({ ...inst, timestamp: new Date() }))
      );
      instructors = await db.collection("instructors").find({}).toArray();
    }

    if (instructors && instructors.length > 0) {
      return NextResponse.json({ success: true, count: instructors.length, instructors, source: "mongodb" });
    }
    return NextResponse.json({ success: true, count: instructorsData.length, instructors: instructorsData, source: "fallback" });
  } catch (error) {
    return NextResponse.json({ success: true, count: instructorsData.length, instructors: instructorsData, source: "fallback", error: String(error) });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDatabase();

    const id = body.id || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const newInstructor: Instructor = {
      id,
      name: body.name,
      role: body.role || body.designation || "Senior Faculty",
      designation: body.designation || body.role || "Senior Faculty",
      department: body.department || "Academic Department",
      experience: body.experience || "5+ Years Experience",
      qualification: body.qualification || "Post Graduate / B.Ed.",
      photo: body.photo || body.image || "/images/instructors/kratika-rathore.webp",
      image: body.photo || body.image || "/images/instructors/kratika-rathore.webp",
      rating: Number(body.rating) || 4.9,
      reviewsCount: Number(body.reviewsCount) || 120,
      studentsCount: Number(body.studentsCount) || 1500,
      coursesCount: Number(body.coursesCount) || 4,
      bio: body.bio || `${body.name} is an experienced educator passionate about board exam excellence and conceptual learning.`,
      specialties: body.specialties || ["NCERT Concepts", "Live Doubt Solving", "Exam Strategy"],
      achievements: body.achievements || ["Excellence in Teaching Award", "100% Concept Mastery"]
    };

    await db.collection("instructors").insertOne(newInstructor);
    return NextResponse.json({ success: true, instructor: newInstructor });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Instructor ID is required" }, { status: 400 });
    }

    const db = await getDatabase();
    updates.updatedAt = new Date();

    await db.collection("instructors").updateOne(
      { id: id },
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
      return NextResponse.json({ success: false, error: "Instructor ID required" }, { status: 400 });
    }

    const db = await getDatabase();
    await db.collection("instructors").deleteOne({ id: id });

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
