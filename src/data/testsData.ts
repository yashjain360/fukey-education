export interface MockTest {
  id: string;
  title: string;
  class: string;
  subject: string;
  durationMinutes: number;
  totalMarks: number;
  totalQuestions: number;
  difficulty: "Standard Board" | "Advanced Topper" | "Foundation";
  pattern: "CBSE 2026-27" | "MP Board" | "NCERT Exemplar";
  description: string;
  thumbnail: string;
  participantsCount: number;
  isFree: boolean;
}

export const sampleTests: MockTest[] = [
  {
    id: "test-maths-10-quadratics",
    title: "Class 10th Mathematics: Full Chapter Test – Quadratic Equations & AP",
    class: "Class 10",
    subject: "Mathematics",
    durationMinutes: 45,
    totalMarks: 40,
    totalQuestions: 10,
    difficulty: "Standard Board",
    pattern: "CBSE 2026-27",
    description: "Standard board examination pattern with Section A (MCQs), Section B (Assertion-Reasoning), and Section C (Case-based numericals).",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
    participantsCount: 382,
    isFree: true,
  },
  {
    id: "test-science-10-chemical",
    title: "Class 10th Science: Chemical Reactions & Acid-Bases Booster Test",
    class: "Class 10",
    subject: "Science",
    durationMinutes: 45,
    totalMarks: 40,
    totalQuestions: 10,
    difficulty: "Advanced Topper",
    pattern: "CBSE 2026-27",
    description: "High-yield NCERT reaction mechanisms, balancing equations, and indicator color shifts.",
    thumbnail: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80",
    participantsCount: 295,
    isFree: true,
  },
  {
    id: "test-physics-12-optics",
    title: "Class 12th Physics: Ray Optics & Wave Optics Comprehensive Mock",
    class: "Class 12",
    subject: "Physics",
    durationMinutes: 60,
    totalMarks: 50,
    totalQuestions: 12,
    difficulty: "Advanced Topper",
    pattern: "CBSE 2026-27",
    description: "Derivations on Lens Maker's Formula, Prism Dispersion, and Young's Double Slit Experiment.",
    thumbnail: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&auto=format&fit=crop&q=80",
    participantsCount: 210,
    isFree: true,
  }
];
