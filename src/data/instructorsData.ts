export interface Instructor {
  id: string;
  name: string;
  role: string;
  designation?: string;
  department?: string;
  experience: string;
  qualification: string;
  photo: string;
  image?: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  coursesCount: number;
  bio: string;
  specialties: string[];
  achievements: string[];
}

export const instructorsData: Instructor[] = [
  {
    id: "kratika-rathore",
    name: "Kratika Rathore",
    role: "Head of Science & Chemistry",
    designation: "Head of Science & Chemistry",
    department: "Science",
    experience: "8+ Years Experience",
    qualification: "M.Sc. Chemistry, CSIR-NET Qualified",
    photo: "/images/instructors/kratika-rathore.webp",
    image: "/images/instructors/kratika-rathore.webp",
    rating: 4.98,
    reviewsCount: 389,
    studentsCount: 3450,
    coursesCount: 6,
    bio: "Kratika Rathore brings science and chemistry alive through interactive experiment simulations, conceptual clarity, and memory hacks for periodic tables, chemical equations, and organic mechanisms.",
    specialties: [
      "Class 10 Science",
      "Class 11-12 Chemistry",
      "Organic Reactions & Mechanism",
      "Numerical Problem Solving"
    ],
    achievements: [
      "Best Science Educator Award 2025",
      "98% Pass Rate with Distinction across CBSE batches"
    ]
  },
  {
    id: "pawan-gupta",
    name: "Pawan Gupta",
    role: "Senior Mathematics Faculty & HOD",
    designation: "Senior Mathematics Faculty & HOD",
    department: "Mathematics",
    experience: "10+ Years Experience",
    qualification: "M.Sc. Mathematics, B.Ed. (Gold Medalist)",
    photo: "/images/instructors/pawan-gupta.webp",
    image: "/images/instructors/pawan-gupta.webp",
    rating: 4.98,
    reviewsCount: 442,
    studentsCount: 4840,
    coursesCount: 8,
    bio: "Pawan Gupta is a renowned Mathematics educator with over a decade of experience guiding CBSE and State Board toppers. Known for his intuitive shortcut techniques, visual geometry breakdowns, and step-by-step calculus simplifications.",
    specialties: [
      "Class 9-12 Mathematics",
      "Calculus Mastery",
      "NCERT Exemplar Solutions",
      "Board Speed Drills"
    ],
    achievements: [
      "Trained 150+ students who scored 100/100 in Class 10 & 12 Board Exams",
      "Author of \"Fast Track Maths Formula Bank\""
    ]
  },
  {
    id: "aditi-sharma",
    name: "Dr. Aditi Sharma",
    role: "Economics & Commercial Studies Lead",
    designation: "Economics & Commercial Studies Lead",
    department: "Commerce",
    experience: "8+ Years Experience",
    qualification: "Ph.D. Economics, Delhi School of Economics",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    rating: 4.95,
    reviewsCount: 315,
    studentsCount: 2890,
    coursesCount: 4,
    bio: "Dr. Aditi Sharma specializes in Micro & Macro Economics for Classes 11 and 12. She integrates real-world Indian economic case studies and graphical analysis to make complex economic theories simple and scoring.",
    specialties: [
      "Class 11-12 Micro & Macro Economics",
      "Indian Economic Development",
      "Data Interpretation & Graphs",
      "Case Study Mastery"
    ],
    achievements: [
      "Guided 85+ students to 95%+ marks in Commerce CBSE stream",
      "Popular speaker on youth financial literacy"
    ]
  },
  {
    id: "vivek-dubey",
    name: "Vivek Dubey",
    role: "Senior Physics Educator",
    designation: "Senior Physics Educator",
    department: "Physics",
    experience: "9+ Years Experience",
    qualification: "M.Tech Applied Physics, IITian Alum",
    photo: "/images/instructors/vivek-dubey.webp",
    image: "/images/instructors/vivek-dubey.webp",
    rating: 4.96,
    reviewsCount: 310,
    studentsCount: 2600,
    coursesCount: 6,
    bio: "Vivek Dubey demystifies Physics with interactive animations, real-world mechanics demos, and structured problem-solving methodologies for Electromagnetism, Optics, and Modern Physics.",
    specialties: [
      "Class 11-12 Physics",
      "Derivation Proofs",
      "Numerical Analysis",
      "Ray & Wave Optics"
    ],
    achievements: [
      "Mentor to top State Board Rankers",
      "Pioneer of the 3-Step Physics Derivation Framework"
    ]
  },
  {
    id: "mayank-dubey",
    name: "Mayank Dubey",
    role: "Senior Social Science & Political Science",
    designation: "Senior Social Science & Political Science",
    department: "Social Science",
    experience: "8+ Years Experience",
    qualification: "M.A. Political Science, NET Qualified",
    photo: "/images/instructors/mayank-dubey.webp",
    image: "/images/instructors/mayank-dubey.webp",
    rating: 4.97,
    reviewsCount: 330,
    studentsCount: 3100,
    coursesCount: 4,
    bio: "Mayank Dubey leads Political Science and Social Sciences with emphasis on constitutional frameworks, answer-structuring, and timeline maps for Class 9th to 12th.",
    specialties: [
      "Class 9-10 Social Science",
      "Class 11-12 Political Science",
      "Long Answer Mastery"
    ],
    achievements: [
      "Author of \"Smart Board Revision Notes for Political Science\""
    ]
  },
  {
    id: "babli-jain",
    name: "Babli Jain",
    role: "Senior Biology Faculty & NEET Mentor",
    designation: "Senior Biology Faculty & NEET Mentor",
    department: "Biology",
    experience: "9+ Years Experience",
    qualification: "M.Sc. Zoology, B.Ed.",
    photo: "/images/instructors/babli-jain.webp",
    image: "/images/instructors/babli-jain.webp",
    rating: 4.94,
    reviewsCount: 298,
    studentsCount: 2750,
    coursesCount: 4,
    bio: "Babli Jain is revered for her high-yield diagrammatic memory maps and clear NCERT line-by-line breakdown in Genetics, Ecology, and Human Physiology.",
    specialties: [
      "Class 11-12 Biology",
      "Human Physiology",
      "Genetics & Evolution",
      "Diagrammatic Memory Maps"
    ],
    achievements: [
      "100+ students cleared Medical & Science Olympiads",
      "Author of Illustrated NCERT Biology Companion"
    ]
  },
  {
    id: "rashmi-parihar",
    name: "Rashmi Parihar",
    role: "Commerce & Economics (Hindi Medium)",
    designation: "Commerce & Economics (Hindi Medium)",
    department: "Commerce",
    experience: "6+ Years Experience",
    qualification: "M.Com, M.Phil",
    photo: "/images/instructors/rashmi-parihar.webp",
    image: "/images/instructors/rashmi-parihar.webp",
    rating: 4.93,
    reviewsCount: 265,
    studentsCount: 2420,
    coursesCount: 4,
    bio: "Rashmi Parihar brings top-tier pedagogy to Hindi Medium commerce students, simplifying terminology, balance sheet fundamentals, and economic concepts.",
    specialties: [
      "Hindi Medium Commerce",
      "Class 11-12 Economics (Hindi)",
      "Accountancy Fundamentals"
    ],
    achievements: [
      "Award for Excellence in Regional Medium Education 2024"
    ]
  },
  {
    id: "ram-kumar-soni",
    name: "Ram Kumar Soni",
    role: "Humanities & Social Sciences Expert",
    designation: "Humanities & Social Sciences Expert",
    department: "Humanities",
    experience: "12+ Years Experience",
    qualification: "M.A. History & Political Science, NET Qualified",
    photo: "/images/instructors/ram-kumar-soni.webp",
    image: "/images/instructors/ram-kumar-soni.webp",
    rating: 4.97,
    reviewsCount: 310,
    studentsCount: 3300,
    coursesCount: 6,
    bio: "Ram Kumar Soni is a master storyteller who transforms History, Geography, and Civics into engaging narratives with timeline maps and answer-writing templates.",
    specialties: [
      "Class 9-10 Social Science",
      "Class 11-12 History & Geography",
      "Map Pointing & Long Answer Writing"
    ],
    achievements: [
      "Author of \"CBSE Class 10 SST Smart Revision Guide\""
    ]
  }
];
