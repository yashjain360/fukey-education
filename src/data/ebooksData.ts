export interface Ebook {
  id: string;
  title: string;
  class: string;
  subject: string;
  pages: number;
  fileSize: string;
  language: string;
  price: number;
  downloads: number;
  rating: number;
  coverImage: string;
  description: string;
}

export const ebooksData: Ebook[] = [
  {
    "id": "eb-1",
    "title": "NCERT Class 10 Mathematics Complete Solution & Formula Pocketbook",
    "class": "Class 10",
    "subject": "Mathematics",
    "pages": 184,
    "fileSize": "14.2 MB",
    "language": "English & Hindi",
    "price": 0,
    "downloads": 3450,
    "rating": 4.9,
    "coverImage": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    "description": "Comprehensive chapter-wise NCERT solutions, proven theorems, and handy formula cheat sheets curated by Pawan Gupta."
  },
  {
    "id": "eb-2",
    "title": "Class 12 Physics Complete Derivations Handbook & Formula Sheet",
    "class": "Class 12",
    "subject": "Physics",
    "pages": 210,
    "fileSize": "18.6 MB",
    "language": "English",
    "price": 0,
    "downloads": 4120,
    "rating": 4.95,
    "coverImage": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&auto=format&fit=crop&q=80",
    "description": "All 45+ essential board exam physics derivations explained step-by-step with labeled ray diagrams and practice questions."
  },
  {
    "id": "eb-3",
    "title": "Class 12 Chemistry Organic Reactions & Mechanism Roadmap",
    "class": "Class 12",
    "subject": "Chemistry",
    "pages": 160,
    "fileSize": "12.8 MB",
    "language": "English & Hindi",
    "price": 0,
    "downloads": 2980,
    "rating": 4.88,
    "coverImage": "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&auto=format&fit=crop&q=80",
    "description": "Master name reactions, functional group conversions, and laboratory test distinctions in an easy flow-chart format."
  },
  {
    "id": "eb-4",
    "title": "Class 10 Science Fast Track Revision Notes (NCERT 2026-27)",
    "class": "Class 10",
    "subject": "Science",
    "pages": 195,
    "fileSize": "15.4 MB",
    "language": "Hindi Medium",
    "price": 0,
    "downloads": 3890,
    "rating": 4.92,
    "coverImage": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
    "description": "Hindi medium comprehensive handbook covering Physics, Chemistry, and Biology fundamentals with exemplar model questions."
  },
  {
    "id": "eb-5",
    "title": "Class 11 & 12 Economics Graphical Mindmaps & Glossary",
    "class": "Class 11 & 12",
    "subject": "Economics",
    "pages": 140,
    "fileSize": "11.0 MB",
    "language": "English",
    "price": 0,
    "downloads": 2140,
    "rating": 4.85,
    "coverImage": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
    "description": "Visual charts for Demand/Supply, National Income calculation steps, and Indian economic history milestones."
  },
  {
    "id": "eb-6",
    "title": "Class 9th Foundation All-in-One Question Bank (Maths & Science)",
    "class": "Class 9",
    "subject": "Maths & Science",
    "pages": 230,
    "fileSize": "22.1 MB",
    "language": "English & Hindi",
    "price": 0,
    "downloads": 3670,
    "rating": 4.91,
    "coverImage": "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80",
    "description": "Complete Class 9 foundation builder with multiple-choice questions, assertion-reasons, and chapter-wise mock tests."
  }
];
