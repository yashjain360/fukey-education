import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { blogsData } from "@/data/blogsData";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const db = await getDatabase();
    let query: any = {};

    if (slug) {
      const blog = await db.collection("blogs").findOne({ slug });
      if (blog) return NextResponse.json({ success: true, blog });
      // fallback
      const fallback = blogsData.find((b) => b.slug === slug);
      if (fallback) return NextResponse.json({ success: true, blog: fallback });
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    let blogs = await db.collection("blogs").find(query).sort({ timestamp: -1 }).toArray();

    // If MongoDB blogs empty, seed with initial blogsData
    if (blogs.length === 0 && !category && !search) {
      await db.collection("blogs").insertMany(
        blogsData.map((b) => ({ ...b, timestamp: new Date() }))
      );
      blogs = await db.collection("blogs").find({}).sort({ timestamp: -1 }).toArray();
    }

    return NextResponse.json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    return NextResponse.json({ success: true, count: blogsData.length, blogs: blogsData });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await getDatabase();

    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const newBlog = {
      id: `blog-${Date.now()}`,
      slug,
      title: body.title || "Untitled Blog Post",
      category: body.category || "Academic Strategy & Board Prep",
      author: body.author || "Fukey Academic Team",
      image: body.image || "/images/blogs/blog_board-pariksha-ki-taiyari-kaise-karen.webp",
      date: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      readTime: body.readTime || "5 min read",
      excerpt: body.excerpt || body.content?.substring(0, 160) || "Academic study tips for CBSE & State Boards.",
      content: body.content || "",
      timestamp: new Date(),
    };

    await db.collection("blogs").insertOne(newBlog);
    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Blog ID required" }, { status: 400 });
    }

    const db = await getDatabase();
    updates.updatedAt = new Date();

    await db.collection("blogs").updateOne(
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
      return NextResponse.json({ success: false, error: "Blog ID required" }, { status: 400 });
    }

    const db = await getDatabase();
    await db.collection("blogs").deleteOne({ $or: [{ id: id }, { slug: id }] });

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
