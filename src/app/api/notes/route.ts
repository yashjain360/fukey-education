import { NextResponse } from "next/server";

export async function GET() {
  const notes = [
    {
      id: "note-1",
      title: "Class 10th Maths: Complete Formula Handbook & Derivation Cheatsheet",
      class: "Class 10",
      subject: "Mathematics",
      pages: 24,
      fileSize: "4.2 MB",
      author: "Pawan Gupta (Senior Faculty)",
      downloadUrl: "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png",
      rating: 4.9,
      downloadsCount: 1420
    },
    {
      id: "note-2",
      title: "Class 10th Science: Chemical Equations & Balance Formulas Mind-Map",
      class: "Class 10",
      subject: "Science",
      pages: 18,
      fileSize: "3.8 MB",
      author: "Kratika Rathore (Head of Science)",
      downloadUrl: "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png",
      rating: 4.8,
      downloadsCount: 980
    },
    {
      id: "note-3",
      title: "Class 12th Physics: Ray Optics & Electromagnetic Induction Handwritten Notes",
      class: "Class 12",
      subject: "Physics",
      pages: 36,
      fileSize: "6.1 MB",
      author: "Vivek Dubey (Senior Physics Faculty Lead)",
      downloadUrl: "https://fukeyeducation.com/uploads/custom-images/wsus-img-2026-08-14-06-28-03-5696.png",
      rating: 5.0,
      downloadsCount: 840
    }
  ];

  return NextResponse.json({ success: true, count: notes.length, notes });
}
