import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    const db = await getDatabase();

    const query: any = {};
    if (email) {
      query.studentEmail = email.toLowerCase().trim();
    }

    const enrollments = await db
      .collection("enrollments")
      .find(query)
      .sort({ enrolledAt: -1 })
      .toArray();

    // Fetch matching courses to attach full metadata
    const allCourses = await db.collection("courses").find({}).toArray();
    const courseMap = new Map(allCourses.map((c: any) => [c.slug || c.id, c]));

    const enrichedEnrollments = enrollments.map((enr: any) => {
      const matchedCourse: any = courseMap.get(enr.courseSlug) || courseMap.get(enr.courseId) || {};
      return {
        id: enr._id?.toString() || enr.id,
        studentEmail: enr.studentEmail,
        studentName: enr.studentName,
        courseId: enr.courseId,
        courseSlug: enr.courseSlug,
        courseTitle: enr.courseTitle || matchedCourse.title || "Enrolled Course Batch",
        subject: enr.subject || matchedCourse.subject || "Board Preparation",
        class: enr.class || matchedCourse.class || "Class 10",
        instructor: enr.instructor || matchedCourse.instructor || "Pawan Gupta",
        instructorAvatar: enr.instructorAvatar || matchedCourse.instructorAvatar,
        image: matchedCourse.image || "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-06-15-02-14-08-1645.webp",
        progress: enr.progress || 0,
        enrolledAt: enr.enrolledAt || new Date(),
        assignedBy: enr.assignedBy || "self_checkout",
        status: enr.status || "ACTIVE",
      };
    });

    return NextResponse.json({
      success: true,
      count: enrichedEnrollments.length,
      enrollments: enrichedEnrollments,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentEmail, studentName, courseId, courseSlug, courseTitle, assignedBy } = body;

    if (!studentEmail) {
      return NextResponse.json({ success: false, error: "studentEmail is required" }, { status: 400 });
    }

    const db = await getDatabase();
    const cleanEmail = studentEmail.toLowerCase().trim();

    // Find course details
    let courseInfo: any = null;
    if (courseSlug || courseId) {
      courseInfo = await db.collection("courses").findOne({
        $or: [{ slug: courseSlug }, { id: courseId }, { _id: courseId }],
      });
    }

    const enrollmentRecord = {
      studentEmail: cleanEmail,
      studentName: studentName || cleanEmail.split("@")[0],
      courseId: courseId || courseInfo?.id || courseInfo?.slug || "general-batch",
      courseSlug: courseSlug || courseInfo?.slug || "general-batch",
      courseTitle: courseTitle || courseInfo?.title || "Class Board Preparation Batch",
      subject: courseInfo?.subject || "Board Curriculum",
      class: courseInfo?.class || "Class 10",
      instructor: courseInfo?.instructor || "Senior Faculty",
      instructorAvatar: courseInfo?.instructorAvatar || "",
      progress: 0,
      assignedBy: assignedBy || "self_checkout",
      status: "ACTIVE",
      enrolledAt: new Date(),
    };

    // Upsert to avoid duplicate enrollments for the same student & course
    await db.collection("enrollments").updateOne(
      {
        studentEmail: cleanEmail,
        courseSlug: enrollmentRecord.courseSlug,
      },
      {
        $set: enrollmentRecord,
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    // Update user's enrolledCoursesCount in users collection
    await db.collection("users").updateOne(
      { email: cleanEmail },
      {
        $addToSet: { enrolledCourseSlugs: enrollmentRecord.courseSlug } as any,
        $set: { lastActive: new Date() },
      }
    );

    return NextResponse.json({
      success: true,
      message: "Student enrolled successfully",
      enrollment: enrollmentRecord,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const studentEmail = searchParams.get("studentEmail");
    const courseSlug = searchParams.get("courseSlug");

    if (!studentEmail || !courseSlug) {
      return NextResponse.json(
        { success: false, error: "studentEmail and courseSlug are required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    await db.collection("enrollments").deleteOne({
      studentEmail: studentEmail.toLowerCase().trim(),
      courseSlug,
    });

    await db.collection("users").updateOne(
      { email: studentEmail.toLowerCase().trim() },
      { $pull: { enrolledCourseSlugs: courseSlug } as any }
    );

    return NextResponse.json({ success: true, message: "Enrollment removed" });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
