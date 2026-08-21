export interface CourseCurriculumModule {
  moduleTitle: string;
  duration: string;
  topics: string[];
}

export interface CourseFAQ {
  q: string;
  a: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subTitle: string;
  class: string;
  classNum: number;
  subject: string;
  stream: string;
  language: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  studentsEnrolled: number;
  instructor: string;
  instructorRole: string;
  duration: string;
  lessonsCount: number;
  resourcesCount: number;
  badge: string;
  description: string;
  thumbnail: string;
  features: string[];
  curriculum: CourseCurriculumModule[];
  faqs: CourseFAQ[];
}

export const coursesData: Course[] = [
  {
    "id": "course-1",
    "slug": "accountancy-11th-english",
    "title": "ACCOUNTANCY 11TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Accountancy (English Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Accountancy",
    "stream": "Commerce",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.85,
    "reviewsCount": 85,
    "studentsEnrolled": 420,
    "instructor": "Soumya Jain",
    "instructorRole": "Senior Accountancy Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 48,
    "resourcesCount": 35,
    "badge": "Bestseller",
    "description": "Master Class 11th Accountancy (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Accountancy",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Accountancy curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_accountancy-11th-english.png"
  },
  {
    "id": "course-2",
    "slug": "accountancy-11th-hindi",
    "title": "ACCOUNTANCY 11TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Accountancy (Hindi Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Accountancy",
    "stream": "Commerce",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.88,
    "reviewsCount": 96,
    "studentsEnrolled": 457,
    "instructor": "Soumya Jain",
    "instructorRole": "Senior Accountancy Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 50,
    "resourcesCount": 38,
    "badge": "Top Rated",
    "description": "Master Class 11th Accountancy (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Accountancy",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Accountancy curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_accountancy-11th-hindi.png"
  },
  {
    "id": "course-3",
    "slug": "accountancy-12th-english",
    "title": "ACCOUNTANCY 12TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Accountancy (English Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Accountancy",
    "stream": "Commerce",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.91,
    "reviewsCount": 107,
    "studentsEnrolled": 494,
    "instructor": "Soumya Jain",
    "instructorRole": "Senior Accountancy Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 52,
    "resourcesCount": 41,
    "badge": "Top Rated",
    "description": "Master Class 12th Accountancy (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Accountancy",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Accountancy curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_accountancy-12th-english.png"
  },
  {
    "id": "course-4",
    "slug": "accountancy-12th-hindi",
    "title": "ACCOUNTANCY 12TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Accountancy (Hindi Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Accountancy",
    "stream": "Commerce",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.94,
    "reviewsCount": 118,
    "studentsEnrolled": 531,
    "instructor": "Soumya Jain",
    "instructorRole": "Senior Accountancy Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 54,
    "resourcesCount": 44,
    "badge": "Trending",
    "description": "Master Class 12th Accountancy (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Accountancy",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Accountancy curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_accountancy-12th-hindi.png"
  },
  {
    "id": "course-5",
    "slug": "biology-11th-english",
    "title": "BIOLOGY 11TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Biology (English Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Biology",
    "stream": "Science",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.97,
    "reviewsCount": 129,
    "studentsEnrolled": 568,
    "instructor": "Babli Jain",
    "instructorRole": "Senior Biology Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 56,
    "resourcesCount": 47,
    "badge": "Bestseller",
    "description": "Master Class 11th Biology (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Biology",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Biology curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_biology-11th-english.png"
  },
  {
    "id": "course-6",
    "slug": "biology-11th-hindi",
    "title": "BIOLOGY 11TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Biology (Hindi Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Biology",
    "stream": "Science",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.85,
    "reviewsCount": 140,
    "studentsEnrolled": 605,
    "instructor": "Babli Jain",
    "instructorRole": "Senior Biology Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 58,
    "resourcesCount": 50,
    "badge": "Top Rated",
    "description": "Master Class 11th Biology (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Biology",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Biology curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_biology-11th-hindi.png"
  },
  {
    "id": "course-7",
    "slug": "biology-12th-english",
    "title": "BIOLOGY 12TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Biology (English Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Biology",
    "stream": "Science",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.88,
    "reviewsCount": 151,
    "studentsEnrolled": 642,
    "instructor": "Babli Jain",
    "instructorRole": "Senior Biology Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 60,
    "resourcesCount": 53,
    "badge": "Trending",
    "description": "Master Class 12th Biology (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Biology",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Biology curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_biology-12th-english.png"
  },
  {
    "id": "course-8",
    "slug": "biology-12th-hindi",
    "title": "BIOLOGY 12TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Biology (Hindi Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Biology",
    "stream": "Science",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.91,
    "reviewsCount": 162,
    "studentsEnrolled": 679,
    "instructor": "Babli Jain",
    "instructorRole": "Senior Biology Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 62,
    "resourcesCount": 36,
    "badge": "Top Rated",
    "description": "Master Class 12th Biology (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Biology",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Biology curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_biology-12th-hindi.png"
  },
  {
    "id": "course-9",
    "slug": "business-studies-11th-english",
    "title": "BUSINESS STUDIES 11TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Business Studies (English Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Business Studies",
    "stream": "Commerce",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.94,
    "reviewsCount": 173,
    "studentsEnrolled": 716,
    "instructor": "Mousam Patil",
    "instructorRole": "Senior Business Studies Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 64,
    "resourcesCount": 39,
    "badge": "Bestseller",
    "description": "Master Class 11th Business Studies (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Business Studies",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Business Studies curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_business-studies-11th-english.png"
  },
  {
    "id": "course-10",
    "slug": "business-studies-11th-hindi",
    "title": "BUSINESS STUDIES 11TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Business Studies (Hindi Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Business Studies",
    "stream": "Commerce",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.97,
    "reviewsCount": 184,
    "studentsEnrolled": 753,
    "instructor": "Mousam Patil",
    "instructorRole": "Senior Business Studies Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 66,
    "resourcesCount": 42,
    "badge": "Trending",
    "description": "Master Class 11th Business Studies (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Business Studies",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Business Studies curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_business-studies-11th-hindi.png"
  },
  {
    "id": "course-11",
    "slug": "business-studies-12th-english",
    "title": "BUSINESS STUDIES 12TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Business Studies (English Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Business Studies",
    "stream": "Commerce",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.85,
    "reviewsCount": 195,
    "studentsEnrolled": 790,
    "instructor": "Mousam Patil",
    "instructorRole": "Senior Business Studies Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 68,
    "resourcesCount": 45,
    "badge": "Top Rated",
    "description": "Master Class 12th Business Studies (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Business Studies",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Business Studies curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_business-studies-12th-english.png"
  },
  {
    "id": "course-12",
    "slug": "business-studies-hindi",
    "title": "BUSINESS STUDIES 10TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 10th Business Studies (Hindi Medium) by top faculties.",
    "class": "Class 10",
    "classNum": 10,
    "subject": "Business Studies",
    "stream": "Foundation (Class 9-10)",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.88,
    "reviewsCount": 86,
    "studentsEnrolled": 827,
    "instructor": "Mousam Patil",
    "instructorRole": "Senior Business Studies Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 70,
    "resourcesCount": 48,
    "badge": "Top Rated",
    "description": "Master Class 10th Business Studies (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 10 Business Studies",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Business Studies curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 10 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 10."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_business-studies-hindi.png"
  },
  {
    "id": "course-13",
    "slug": "chemistory-12th-english",
    "title": "CHEMISTRY 12TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Chemistry (English Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Chemistry",
    "stream": "Science",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.91,
    "reviewsCount": 97,
    "studentsEnrolled": 864,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Chemistry Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 48,
    "resourcesCount": 51,
    "badge": "Bestseller",
    "description": "Master Class 12th Chemistry (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Chemistry",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Chemistry curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_chemistory-12th-english.png"
  },
  {
    "id": "course-14",
    "slug": "chemistory-12th-hindi",
    "title": "CHEMISTRY 12TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Chemistry (Hindi Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Chemistry",
    "stream": "Science",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.94,
    "reviewsCount": 108,
    "studentsEnrolled": 901,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Chemistry Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 50,
    "resourcesCount": 54,
    "badge": "Top Rated",
    "description": "Master Class 12th Chemistry (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Chemistry",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Chemistry curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_chemistory-12th-hindi.png"
  },
  {
    "id": "course-15",
    "slug": "chemistry-11th-english",
    "title": "CHEMISTRY 11TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Chemistry (English Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Chemistry",
    "stream": "Science",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.97,
    "reviewsCount": 119,
    "studentsEnrolled": 938,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Chemistry Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 52,
    "resourcesCount": 37,
    "badge": "Top Rated",
    "description": "Master Class 11th Chemistry (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Chemistry",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Chemistry curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_chemistry-11th-english.png"
  },
  {
    "id": "course-16",
    "slug": "chemistry-11th-hindi",
    "title": "CHEMISTRY 11TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Chemistry (Hindi Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Chemistry",
    "stream": "Science",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.85,
    "reviewsCount": 130,
    "studentsEnrolled": 975,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Chemistry Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 54,
    "resourcesCount": 40,
    "badge": "Trending",
    "description": "Master Class 11th Chemistry (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Chemistry",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Chemistry curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_chemistry-11th-hindi.png"
  },
  {
    "id": "course-17",
    "slug": "economics-11th-english",
    "title": "ECONOMICS 11TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Economics (English Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Economics",
    "stream": "Commerce",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.88,
    "reviewsCount": 141,
    "studentsEnrolled": 1012,
    "instructor": "Arya Dubey",
    "instructorRole": "Senior Economics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 56,
    "resourcesCount": 43,
    "badge": "Bestseller",
    "description": "Master Class 11th Economics (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Economics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Economics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_economics-11th-english.png"
  },
  {
    "id": "course-18",
    "slug": "economics-11th-hindi",
    "title": "ECONOMICS 11TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Economics (Hindi Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Economics",
    "stream": "Commerce",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.91,
    "reviewsCount": 152,
    "studentsEnrolled": 1049,
    "instructor": "Arya Dubey",
    "instructorRole": "Senior Economics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 58,
    "resourcesCount": 46,
    "badge": "Top Rated",
    "description": "Master Class 11th Economics (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Economics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Economics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_economics-11th-hindi.png"
  },
  {
    "id": "course-19",
    "slug": "economics-12th-english",
    "title": "ECONOMICS 12TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Economics (English Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Economics",
    "stream": "Commerce",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.94,
    "reviewsCount": 163,
    "studentsEnrolled": 436,
    "instructor": "Arya Dubey",
    "instructorRole": "Senior Economics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 60,
    "resourcesCount": 49,
    "badge": "Trending",
    "description": "Master Class 12th Economics (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Economics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Economics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_economics-12th-english.png"
  },
  {
    "id": "course-20",
    "slug": "economics-12th-hindi",
    "title": "ECONOMICS 12TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Economics (Hindi Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Economics",
    "stream": "Commerce",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.97,
    "reviewsCount": 174,
    "studentsEnrolled": 473,
    "instructor": "Arya Dubey",
    "instructorRole": "Senior Economics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 62,
    "resourcesCount": 52,
    "badge": "Top Rated",
    "description": "Master Class 12th Economics (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Economics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Economics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_economics-12th-hindi.png"
  },
  {
    "id": "course-21",
    "slug": "geography-11th-english",
    "title": "GEOGRAPHY 11TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Geography (English Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Geography",
    "stream": "Humanities / Arts",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.85,
    "reviewsCount": 185,
    "studentsEnrolled": 510,
    "instructor": "Ram Kumar Soni",
    "instructorRole": "Senior Geography Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 64,
    "resourcesCount": 35,
    "badge": "Bestseller",
    "description": "Master Class 11th Geography (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Geography",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Geography curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_geography-11th-english.png"
  },
  {
    "id": "course-22",
    "slug": "geography-11th-hindi",
    "title": "GEOGRAPHY 11TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Geography (Hindi Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Geography",
    "stream": "Humanities / Arts",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.88,
    "reviewsCount": 196,
    "studentsEnrolled": 547,
    "instructor": "Ram Kumar Soni",
    "instructorRole": "Senior Geography Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 66,
    "resourcesCount": 38,
    "badge": "Trending",
    "description": "Master Class 11th Geography (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Geography",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Geography curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_geography-11th-hindi.png"
  },
  {
    "id": "course-23",
    "slug": "geography-12th-english",
    "title": "GEOGRAPHY 12TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Geography (English Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Geography",
    "stream": "Humanities / Arts",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.91,
    "reviewsCount": 87,
    "studentsEnrolled": 584,
    "instructor": "Ram Kumar Soni",
    "instructorRole": "Senior Geography Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 68,
    "resourcesCount": 41,
    "badge": "Top Rated",
    "description": "Master Class 12th Geography (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Geography",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Geography curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_geography-12th-english.png"
  },
  {
    "id": "course-24",
    "slug": "geography-12th-english-1",
    "title": "GEOGRAPHY 12TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Geography (English Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Geography",
    "stream": "Humanities / Arts",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.94,
    "reviewsCount": 98,
    "studentsEnrolled": 621,
    "instructor": "Ram Kumar Soni",
    "instructorRole": "Senior Geography Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 70,
    "resourcesCount": 44,
    "badge": "Top Rated",
    "description": "Master Class 12th Geography (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Geography",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Geography curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_geography-12th-english-1.png"
  },
  {
    "id": "course-25",
    "slug": "history-11th-hindi",
    "title": "HISTORY 11TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th History (Hindi Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "History",
    "stream": "Humanities / Arts",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.97,
    "reviewsCount": 109,
    "studentsEnrolled": 658,
    "instructor": "Ram Kumar Soni",
    "instructorRole": "Senior History Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 48,
    "resourcesCount": 47,
    "badge": "Bestseller",
    "description": "Master Class 11th History (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 History",
        "duration": "12 Hours",
        "topics": [
          "Introduction to History curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_history-11th-hindi.png"
  },
  {
    "id": "course-26",
    "slug": "history-11th-hindi-1",
    "title": "HISTORY 11TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th History (Hindi Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "History",
    "stream": "Humanities / Arts",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.85,
    "reviewsCount": 120,
    "studentsEnrolled": 695,
    "instructor": "Ram Kumar Soni",
    "instructorRole": "Senior History Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 50,
    "resourcesCount": 50,
    "badge": "Top Rated",
    "description": "Master Class 11th History (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 History",
        "duration": "12 Hours",
        "topics": [
          "Introduction to History curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_history-11th-hindi-1.png"
  },
  {
    "id": "course-27",
    "slug": "history-12th-english",
    "title": "HISTORY 12TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th History (English Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "History",
    "stream": "Humanities / Arts",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.88,
    "reviewsCount": 131,
    "studentsEnrolled": 732,
    "instructor": "Ram Kumar Soni",
    "instructorRole": "Senior History Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 52,
    "resourcesCount": 53,
    "badge": "Top Rated",
    "description": "Master Class 12th History (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 History",
        "duration": "12 Hours",
        "topics": [
          "Introduction to History curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_history-12th-english.png"
  },
  {
    "id": "course-28",
    "slug": "history-12th-hindi",
    "title": "HISTORY 12TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th History (Hindi Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "History",
    "stream": "Humanities / Arts",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.91,
    "reviewsCount": 142,
    "studentsEnrolled": 769,
    "instructor": "Ram Kumar Soni",
    "instructorRole": "Senior History Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 54,
    "resourcesCount": 36,
    "badge": "Trending",
    "description": "Master Class 12th History (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 History",
        "duration": "12 Hours",
        "topics": [
          "Introduction to History curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_history-12th-hindi.png"
  },
  {
    "id": "course-29",
    "slug": "maths-10th-english",
    "title": "MATHEMATICS 10TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 10th Mathematics (English Medium) by top faculties.",
    "class": "Class 10",
    "classNum": 10,
    "subject": "Mathematics",
    "stream": "Foundation (Class 9-10)",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.94,
    "reviewsCount": 153,
    "studentsEnrolled": 806,
    "instructor": "Pawan Gupta",
    "instructorRole": "Senior Mathematics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 56,
    "resourcesCount": 39,
    "badge": "Bestseller",
    "description": "Master Class 10th Mathematics (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 10 Mathematics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Mathematics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 10 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 10."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_maths-10th-english.png"
  },
  {
    "id": "course-30",
    "slug": "maths-10th-hindi",
    "title": "MATHEMATICS 10TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 10th Mathematics (Hindi Medium) by top faculties.",
    "class": "Class 10",
    "classNum": 10,
    "subject": "Mathematics",
    "stream": "Foundation (Class 9-10)",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.97,
    "reviewsCount": 164,
    "studentsEnrolled": 843,
    "instructor": "Pawan Gupta",
    "instructorRole": "Senior Mathematics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 58,
    "resourcesCount": 42,
    "badge": "Top Rated",
    "description": "Master Class 10th Mathematics (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 10 Mathematics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Mathematics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 10 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 10."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_maths-10th-hindi.png"
  },
  {
    "id": "course-31",
    "slug": "maths-11th-english",
    "title": "MATHEMATICS 11TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Mathematics (English Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Mathematics",
    "stream": "Science",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.85,
    "reviewsCount": 175,
    "studentsEnrolled": 880,
    "instructor": "Pawan Gupta",
    "instructorRole": "Senior Mathematics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 60,
    "resourcesCount": 45,
    "badge": "Trending",
    "description": "Master Class 11th Mathematics (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Mathematics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Mathematics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_maths-11th-english.png"
  },
  {
    "id": "course-32",
    "slug": "maths-11th-hindi",
    "title": "MATHEMATICS 11TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Mathematics (Hindi Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Mathematics",
    "stream": "Science",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.88,
    "reviewsCount": 186,
    "studentsEnrolled": 917,
    "instructor": "Pawan Gupta",
    "instructorRole": "Senior Mathematics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 62,
    "resourcesCount": 48,
    "badge": "Top Rated",
    "description": "Master Class 11th Mathematics (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Mathematics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Mathematics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_maths-11th-hindi.png"
  },
  {
    "id": "course-33",
    "slug": "maths-12th-english",
    "title": "MATHEMATICS 12TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Mathematics (English Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Mathematics",
    "stream": "Science",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.91,
    "reviewsCount": 197,
    "studentsEnrolled": 954,
    "instructor": "Pawan Gupta",
    "instructorRole": "Senior Mathematics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 64,
    "resourcesCount": 51,
    "badge": "Bestseller",
    "description": "Master Class 12th Mathematics (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Mathematics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Mathematics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_maths-12th-english.png"
  },
  {
    "id": "course-34",
    "slug": "maths-12th-english-1",
    "title": "MATHEMATICS 12TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Mathematics (English Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Mathematics",
    "stream": "Science",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.94,
    "reviewsCount": 88,
    "studentsEnrolled": 991,
    "instructor": "Pawan Gupta",
    "instructorRole": "Senior Mathematics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 66,
    "resourcesCount": 54,
    "badge": "Trending",
    "description": "Master Class 12th Mathematics (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Mathematics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Mathematics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_maths-12th-english-1.png"
  },
  {
    "id": "course-35",
    "slug": "maths-9th-english",
    "title": "MATHEMATICS 9TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 9th Mathematics (English Medium) by top faculties.",
    "class": "Class 9",
    "classNum": 9,
    "subject": "Mathematics",
    "stream": "Foundation (Class 9-10)",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.97,
    "reviewsCount": 99,
    "studentsEnrolled": 1028,
    "instructor": "Pawan Gupta",
    "instructorRole": "Senior Mathematics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 68,
    "resourcesCount": 37,
    "badge": "Top Rated",
    "description": "Master Class 9th Mathematics (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 9 Mathematics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Mathematics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 9 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 9."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_maths-9th-english.png"
  },
  {
    "id": "course-36",
    "slug": "maths-9th-hindi",
    "title": "MATHEMATICS 9TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 9th Mathematics (Hindi Medium) by top faculties.",
    "class": "Class 9",
    "classNum": 9,
    "subject": "Mathematics",
    "stream": "Foundation (Class 9-10)",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.85,
    "reviewsCount": 110,
    "studentsEnrolled": 1065,
    "instructor": "Pawan Gupta",
    "instructorRole": "Senior Mathematics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 70,
    "resourcesCount": 40,
    "badge": "Top Rated",
    "description": "Master Class 9th Mathematics (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 9 Mathematics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Mathematics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 9 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 9."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_maths-9th-hindi.png"
  },
  {
    "id": "course-37",
    "slug": "physics-11th-english-1",
    "title": "PHYSICS 11TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Physics (English Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Physics",
    "stream": "Science",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.88,
    "reviewsCount": 121,
    "studentsEnrolled": 452,
    "instructor": "Vivek Dubey",
    "instructorRole": "Senior Physics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 48,
    "resourcesCount": 43,
    "badge": "Bestseller",
    "description": "Master Class 11th Physics (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Physics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Physics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_physics-11th-english-1.png"
  },
  {
    "id": "course-38",
    "slug": "physics-11th-hindi",
    "title": "PHYSICS 11TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Physics (Hindi Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Physics",
    "stream": "Science",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.91,
    "reviewsCount": 132,
    "studentsEnrolled": 489,
    "instructor": "Vivek Dubey",
    "instructorRole": "Senior Physics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 50,
    "resourcesCount": 46,
    "badge": "Top Rated",
    "description": "Master Class 11th Physics (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Physics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Physics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_physics-11th-hindi.png"
  },
  {
    "id": "course-39",
    "slug": "physics-12th-english",
    "title": "PHYSICS 12TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Physics (English Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Physics",
    "stream": "Science",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.94,
    "reviewsCount": 143,
    "studentsEnrolled": 526,
    "instructor": "Vivek Dubey",
    "instructorRole": "Senior Physics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 52,
    "resourcesCount": 49,
    "badge": "Top Rated",
    "description": "Master Class 12th Physics (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Physics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Physics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_physics-12th-english.png"
  },
  {
    "id": "course-40",
    "slug": "physics-12th-hindi",
    "title": "PHYSICS 12TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Physics (Hindi Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Physics",
    "stream": "Science",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.97,
    "reviewsCount": 154,
    "studentsEnrolled": 563,
    "instructor": "Vivek Dubey",
    "instructorRole": "Senior Physics Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 54,
    "resourcesCount": 52,
    "badge": "Trending",
    "description": "Master Class 12th Physics (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Physics",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Physics curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_physics-12th-hindi.png"
  },
  {
    "id": "course-41",
    "slug": "political-science-11th-english",
    "title": "SCIENCE 11TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Science (English Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Science",
    "stream": "Humanities / Arts",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.85,
    "reviewsCount": 165,
    "studentsEnrolled": 600,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Science Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 56,
    "resourcesCount": 35,
    "badge": "Bestseller",
    "description": "Master Class 11th Science (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Science",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Science curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_political-science-11th-english.png"
  },
  {
    "id": "course-42",
    "slug": "political-science-11th-hindi",
    "title": "SCIENCE 11TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 11th Science (Hindi Medium) by top faculties.",
    "class": "Class 11",
    "classNum": 11,
    "subject": "Science",
    "stream": "Humanities / Arts",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.88,
    "reviewsCount": 176,
    "studentsEnrolled": 637,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Science Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 58,
    "resourcesCount": 38,
    "badge": "Top Rated",
    "description": "Master Class 11th Science (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 11 Science",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Science curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 11 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 11."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_political-science-11th-hindi.png"
  },
  {
    "id": "course-43",
    "slug": "political-science-12th-english",
    "title": "SCIENCE 12TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Science (English Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Science",
    "stream": "Humanities / Arts",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.91,
    "reviewsCount": 187,
    "studentsEnrolled": 674,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Science Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 60,
    "resourcesCount": 41,
    "badge": "Trending",
    "description": "Master Class 12th Science (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Science",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Science curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_political-science-12th-english.png"
  },
  {
    "id": "course-44",
    "slug": "political-science-12th-hindi",
    "title": "SCIENCE 12TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 12th Science (Hindi Medium) by top faculties.",
    "class": "Class 12",
    "classNum": 12,
    "subject": "Science",
    "stream": "Humanities / Arts",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.94,
    "reviewsCount": 198,
    "studentsEnrolled": 711,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Science Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 62,
    "resourcesCount": 44,
    "badge": "Top Rated",
    "description": "Master Class 12th Science (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 12 Science",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Science curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 12 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 12."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_political-science-12th-hindi.png"
  },
  {
    "id": "course-45",
    "slug": "science-10th-english",
    "title": "SCIENCE 10TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 10th Science (English Medium) by top faculties.",
    "class": "Class 10",
    "classNum": 10,
    "subject": "Science",
    "stream": "Foundation (Class 9-10)",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.97,
    "reviewsCount": 89,
    "studentsEnrolled": 748,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Science Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 64,
    "resourcesCount": 47,
    "badge": "Bestseller",
    "description": "Master Class 10th Science (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 10 Science",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Science curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 10 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 10."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_science-10th-english.png"
  },
  {
    "id": "course-46",
    "slug": "science-10th-hindi",
    "title": "SCIENCE 10TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 10th Science (Hindi Medium) by top faculties.",
    "class": "Class 10",
    "classNum": 10,
    "subject": "Science",
    "stream": "Foundation (Class 9-10)",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.85,
    "reviewsCount": 100,
    "studentsEnrolled": 785,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Science Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 66,
    "resourcesCount": 50,
    "badge": "Trending",
    "description": "Master Class 10th Science (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 10 Science",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Science curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 10 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 10."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_science-10th-hindi.png"
  },
  {
    "id": "course-47",
    "slug": "science-9th-english",
    "title": "SCIENCE 9TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 9th Science (English Medium) by top faculties.",
    "class": "Class 9",
    "classNum": 9,
    "subject": "Science",
    "stream": "Foundation (Class 9-10)",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.88,
    "reviewsCount": 111,
    "studentsEnrolled": 822,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Science Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 68,
    "resourcesCount": 53,
    "badge": "Top Rated",
    "description": "Master Class 9th Science (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 9 Science",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Science curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 9 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 9."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_science-9th-english.png"
  },
  {
    "id": "course-48",
    "slug": "science-9th-hindi",
    "title": "SCIENCE 9TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 9th Science (Hindi Medium) by top faculties.",
    "class": "Class 9",
    "classNum": 9,
    "subject": "Science",
    "stream": "Foundation (Class 9-10)",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.91,
    "reviewsCount": 122,
    "studentsEnrolled": 859,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Science Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 70,
    "resourcesCount": 36,
    "badge": "Top Rated",
    "description": "Master Class 9th Science (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 9 Science",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Science curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 9 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 9."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_science-9th-hindi.png"
  },
  {
    "id": "course-49",
    "slug": "social-science-10th-english-1",
    "title": "SCIENCE 10TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 10th Science (English Medium) by top faculties.",
    "class": "Class 10",
    "classNum": 10,
    "subject": "Science",
    "stream": "Foundation (Class 9-10)",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.94,
    "reviewsCount": 133,
    "studentsEnrolled": 896,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Science Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 48,
    "resourcesCount": 39,
    "badge": "Bestseller",
    "description": "Master Class 10th Science (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 10 Science",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Science curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 10 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 10."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_social-science-10th-english-1.png"
  },
  {
    "id": "course-50",
    "slug": "social-science-10th-hindi",
    "title": "SCIENCE 10TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 10th Science (Hindi Medium) by top faculties.",
    "class": "Class 10",
    "classNum": 10,
    "subject": "Science",
    "stream": "Foundation (Class 9-10)",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.97,
    "reviewsCount": 144,
    "studentsEnrolled": 933,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Science Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 50,
    "resourcesCount": 42,
    "badge": "Top Rated",
    "description": "Master Class 10th Science (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 10 Science",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Science curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 10 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 10."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_social-science-10th-hindi.png"
  },
  {
    "id": "course-51",
    "slug": "social-science-9th-english",
    "title": "SCIENCE 9TH (ENGLISH)",
    "subTitle": "Complete CBSE & State Board coaching for Class 9th Science (English Medium) by top faculties.",
    "class": "Class 9",
    "classNum": 9,
    "subject": "Science",
    "stream": "Foundation (Class 9-10)",
    "language": "English",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.85,
    "reviewsCount": 155,
    "studentsEnrolled": 970,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Science Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 52,
    "resourcesCount": 45,
    "badge": "Top Rated",
    "description": "Master Class 9th Science (English Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 9 Science",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Science curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 9 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 9."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_social-science-9th-english.png"
  },
  {
    "id": "course-52",
    "slug": "social-science-9th-hindi",
    "title": "SCIENCE 9TH (HINDI)",
    "subTitle": "Complete CBSE & State Board coaching for Class 9th Science (Hindi Medium) by top faculties.",
    "class": "Class 9",
    "classNum": 9,
    "subject": "Science",
    "stream": "Foundation (Class 9-10)",
    "language": "Hindi",
    "price": 1499,
    "originalPrice": 2499,
    "discountPercent": 40,
    "rating": 4.88,
    "reviewsCount": 166,
    "studentsEnrolled": 1007,
    "instructor": "Kratika Rathore",
    "instructorRole": "Senior Science Faculty",
    "duration": "85+ Hours Live",
    "lessonsCount": 54,
    "resourcesCount": 48,
    "badge": "Trending",
    "description": "Master Class 9th Science (Hindi Medium) with Fukey Education. This comprehensive live online coaching course is structured strictly as per the latest NCERT & CBSE board curriculum 2026-27. Features include live interactive classes, HD recorded backups, downloadable color notes, chapter-wise worksheets, formula sheets, mock test series, and 24/7 doubt resolution.",
    "features": [
      "Live Interactive Online Lectures with Audio/Video Doubt Q&A",
      "Complete High-Definition Video Recording Backups",
      "Comprehensive Handwritten Notes & NCERT Solutions PDF",
      "Weekly Chapter-wise Mock Tests & Detailed Performance Analytics",
      "24/7 WhatsApp & In-App Faculty Doubt Support",
      "Verified Certificate of Completion & Board Exam Formula Book"
    ],
    "curriculum": [
      {
        "moduleTitle": "Unit 1: Fundamentals & Core Concepts of Class 9 Science",
        "duration": "12 Hours",
        "topics": [
          "Introduction to Science curriculum & NCERT breakdown",
          "Comprehensive theoretical definitions & proof formulas",
          "NCERT exemplar problems & step-by-step solutions",
          "Live doubt clearing & diagnostic quick quiz"
        ]
      },
      {
        "moduleTitle": "Unit 2: Advanced Problem Solving & Applications",
        "duration": "16 Hours",
        "topics": [
          "High-order thinking skills (HOTS) questions",
          "Previous 10 years CBSE & State Board questions review",
          "Case study questions & assertion-reason mastery",
          "Mid-term model test & personal performance review"
        ]
      },
      {
        "moduleTitle": "Unit 3: Board Exam Strategy & Speed Drills",
        "duration": "18 Hours",
        "topics": [
          "Score booster techniques & time management tips",
          "Formula memory palace & short notes revision",
          "5 Full-length simulated mock exam papers",
          "One-on-one live mentorship session with faculty"
        ]
      }
    ],
    "faqs": [
      {
        "q": "Is this course suitable for Class 9 CBSE and State Board students?",
        "a": "Yes! The course covers 100% of the NCERT syllabus which is the standard baseline for CBSE, ICSE, and all major State Boards in India for Class 9."
      },
      {
        "q": "What happens if I miss a live lecture?",
        "a": "Every single live session is recorded in crisp 1080p full HD and uploaded to your student portal within 2 hours with lifetime access."
      },
      {
        "q": "How are doubts cleared during the course?",
        "a": "You can ask doubts live in class via microphone or chat, and also post photos of questions in our dedicated doubt forum and WhatsApp group."
      }
    ],
    "thumbnail": "/images/courses/course_social-science-9th-hindi.png"
  }
];
