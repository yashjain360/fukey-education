export interface Instructor {
  id: string;
  name: string;
  role: string;
  experience: string;
  qualification: string;
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
    "id": "pawan-gupta",
    "name": "Pawan Gupta",
    "role": "Senior Mathematics Faculty & HOD",
    "experience": "10+ Years Experience",
    "qualification": "M.Sc. Mathematics, B.Ed. (Gold Medalist)",
    "rating": 4.98,
    "reviewsCount": 342,
    "studentsCount": 2840,
    "coursesCount": 8,
    "bio": "Pawan Gupta is a renowned Mathematics educator with over a decade of experience guiding CBSE and State Board toppers. Known for his intuitive shortcut techniques, visual geometry breakdowns, and step-by-step calculus simplifications.",
    "specialties": [
      "Class 9-12 Mathematics",
      "Calculus Mastery",
      "NCERT Exemplar Solutions",
      "Board Speed Drills"
    ],
    "achievements": [
      "Trained 150+ students who scored 100/100 in Class 10 & 12 Board Exams",
      "Author of \"Fast Track Maths Formula Bank\""
    ]
  },
  {
    "id": "kratika-rathore",
    "name": "Kratika Rathore",
    "role": "Head of Science & Chemistry Department",
    "experience": "8+ Years Experience",
    "qualification": "M.Sc. Chemistry, CSIR-NET Qualified",
    "rating": 4.95,
    "reviewsCount": 289,
    "studentsCount": 2450,
    "coursesCount": 6,
    "bio": "Kratika Rathore brings science and chemistry alive through interactive experiment simulations, conceptual clarity, and memory hacks for periodic tables, chemical equations, and organic mechanisms.",
    "specialties": [
      "Class 10 Science",
      "Class 11-12 Chemistry",
      "Organic Reactions & Mechanism",
      "Numerical Problem Solving"
    ],
    "achievements": [
      "Best Science Educator Award 2025",
      "98% Pass Rate with Distinction across CBSE batches"
    ]
  },
  {
    "id": "arya-dubey",
    "name": "Arya Dubey",
    "role": "Economics & Commercial Studies Lead",
    "experience": "7+ Years Experience",
    "qualification": "M.A. Economics, Delhi School of Economics",
    "rating": 4.92,
    "reviewsCount": 215,
    "studentsCount": 1890,
    "coursesCount": 4,
    "bio": "Arya Dubey specializes in Micro & Macro Economics for Classes 11 and 12. He integrates real-world Indian economic case studies and graphical analysis to make complex economic theories simple and scoring.",
    "specialties": [
      "Class 11-12 Micro & Macro Economics",
      "Indian Economic Development",
      "Data Interpretation & Graphs",
      "Case Study Mastery"
    ],
    "achievements": [
      "Guided 85+ students to 95%+ marks in Commerce CBSE stream",
      "Popular speaker on youth financial literacy"
    ]
  },
  {
    "id": "vivek-dubey",
    "name": "Vivek Dubey",
    "role": "Senior Physics Educator & Concept Coach",
    "experience": "9+ Years Experience",
    "qualification": "M.Tech Applied Physics, IITian Alum",
    "rating": 4.96,
    "reviewsCount": 310,
    "studentsCount": 2600,
    "coursesCount": 6,
    "bio": "Vivek Dubey demystifies Physics with interactive animations, real-world mechanics demos, and structured problem-solving methodologies for Electromagnetism, Optics, and Modern Physics.",
    "specialties": [
      "Class 11-12 Physics",
      "Derivation Proofs",
      "Numerical Analysis",
      "Ray & Wave Optics"
    ],
    "achievements": [
      "Mentor to top State Board Rankers",
      "Pioneer of the 3-Step Physics Derivation Framework"
    ]
  },
  {
    "id": "babli-jain",
    "name": "Babli Jain",
    "role": "Senior Biology Faculty & NEET Mentor",
    "experience": "9+ Years Experience",
    "qualification": "M.Sc. Zoology, B.Ed.",
    "rating": 4.94,
    "reviewsCount": 198,
    "studentsCount": 1750,
    "coursesCount": 4,
    "bio": "Babli Jain is revered for her high-yield diagrammatic memory maps and clear NCERT line-by-line breakdown in Genetics, Ecology, and Human Physiology.",
    "specialties": [
      "Class 11-12 Biology",
      "Human Physiology",
      "Genetics & Evolution",
      "Diagrammatic Memory Maps"
    ],
    "achievements": [
      "100+ students cleared Medical & Science Olympiads",
      "Author of Illustrated NCERT Biology Companion"
    ]
  },
  {
    "id": "rashmi-parihar",
    "name": "Rashmi Parihar",
    "role": "Commerce & Economics Educator (Hindi Medium Specialist)",
    "experience": "6+ Years Experience",
    "qualification": "M.Com, M.Phil",
    "rating": 4.91,
    "reviewsCount": 165,
    "studentsCount": 1420,
    "coursesCount": 4,
    "bio": "Rashmi Parihar brings top-tier pedagogy to Hindi Medium commerce students, simplifying terminology, balance sheet fundamentals, and economic concepts.",
    "specialties": [
      "Hindi Medium Commerce",
      "Class 11-12 Economics (Hindi)",
      "Accountancy Fundamentals"
    ],
    "achievements": [
      "Award for Excellence in Regional Medium Education 2024"
    ]
  },
  {
    "id": "soumya-jain",
    "name": "Soumya Jain",
    "role": "Chartered Accountant & Accountancy Faculty",
    "experience": "7+ Years Experience",
    "qualification": "CA, M.Com (Finance)",
    "rating": 4.93,
    "reviewsCount": 180,
    "studentsCount": 1580,
    "coursesCount": 4,
    "bio": "Soumya Jain makes Partnership Accounts, Company Balance Sheets, and Cash Flow Statements enjoyable and formulaic for Class 11 and 12 students.",
    "specialties": [
      "Company Accounts",
      "Partnership Firm Accounting",
      "Cash Flow Analysis"
    ],
    "achievements": [
      "Guided 50+ students to 98+ in Accountancy CBSE boards"
    ]
  },
  {
    "id": "ram-kumar-soni",
    "name": "Ram Kumar Soni",
    "role": "Humanities & Social Sciences Expert",
    "experience": "12+ Years Experience",
    "qualification": "M.A. History & Political Science, NET Qualified",
    "rating": 4.97,
    "reviewsCount": 230,
    "studentsCount": 2100,
    "coursesCount": 6,
    "bio": "Ram Kumar Soni is a master storyteller who transforms History, Geography, and Civics into engaging narratives with timeline maps and answer-writing templates.",
    "specialties": [
      "Class 9-10 Social Science",
      "Class 11-12 History & Geography",
      "Map Pointing & Long Answer Writing"
    ],
    "achievements": [
      "Author of \"CBSE Class 10 SST Smart Revision Guide\""
    ]
  }
];
