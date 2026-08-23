export interface SeedAccount {
  name: string;
  email: string;
  role: "admin" | "instructor" | "student";
  designation: string;
  password: string;
}

export const SEED_ACCOUNTS: Record<"admin" | "instructor" | "student", SeedAccount[]> = {
  admin: [
    {
      name: "Surendra Singh Baghel",
      email: "admin.director@fukeyeducation.com",
      role: "admin",
      designation: "Managing Director & Founder",
      password: "adminpassword123",
    },
    {
      name: "Dr. Sunita Sharma",
      email: "admin.academic@fukeyeducation.com",
      role: "admin",
      designation: "Principal & Academic Dean",
      password: "adminpassword123",
    },
    {
      name: "Rajesh Varma",
      email: "admin.finance@fukeyeducation.com",
      role: "admin",
      designation: "Head of Accounts & Bursar",
      password: "adminpassword123",
    },
    {
      name: "Ananya Dixit",
      email: "admin.admissions@fukeyeducation.com",
      role: "admin",
      designation: "Lead Admission Counselor",
      password: "adminpassword123",
    },
    {
      name: "Master Administrator",
      email: "admin@fukeyeducation.com",
      role: "admin",
      designation: "Master System Administrator",
      password: "adminpassword123",
    },
  ],
  instructor: [
    {
      name: "Pawan Gupta",
      email: "pawan.gupta@fukeyeducation.com",
      role: "instructor",
      designation: "Senior Mathematics Faculty & HOD",
      password: "facultypassword123",
    },
    {
      name: "Kratika Rathore",
      email: "kratika.rathore@fukeyeducation.com",
      role: "instructor",
      designation: "Head of Science & Chemistry",
      password: "facultypassword123",
    },
    {
      name: "Arya Dubey",
      email: "arya.dubey@fukeyeducation.com",
      role: "instructor",
      designation: "Economics & Commercial Studies Lead",
      password: "facultypassword123",
    },
    {
      name: "Vivek Dubey",
      email: "vivek.dubey@fukeyeducation.com",
      role: "instructor",
      designation: "Senior Physics Educator",
      password: "facultypassword123",
    },
    {
      name: "Babli Jain",
      email: "babli.jain@fukeyeducation.com",
      role: "instructor",
      designation: "Senior Biology Faculty & NEET Mentor",
      password: "facultypassword123",
    },
    {
      name: "Ram Kumar Soni",
      email: "ram.kumar.soni@fukeyeducation.com",
      role: "instructor",
      designation: "Humanities & Social Sciences Expert",
      password: "facultypassword123",
    },
    {
      name: "Mousam Patil",
      email: "mousam.patil@fukeyeducation.com",
      role: "instructor",
      designation: "Senior Business Studies Faculty",
      password: "facultypassword123",
    },
    {
      name: "Soumya Jain",
      email: "soumya.jain@fukeyeducation.com",
      role: "instructor",
      designation: "Senior Accountancy Faculty",
      password: "facultypassword123",
    },
  ],
  student: [
    {
      name: "Mayank Dubey",
      email: "mayank.dubey@gmail.com",
      role: "student",
      designation: "Class 10th CBSE (Mathematics & Science)",
      password: "studentpassword123",
    },
    {
      name: "Rahul Sharma",
      email: "rahul.sharma@gmail.com",
      role: "student",
      designation: "Class 11th English Medium (Accountancy)",
      password: "studentpassword123",
    },
    {
      name: "Priya Patel",
      email: "priya.patel@gmail.com",
      role: "student",
      designation: "Class 12th State Board (Physics & Chemistry)",
      password: "studentpassword123",
    },
    {
      name: "Aman Verma",
      email: "aman.verma@gmail.com",
      role: "student",
      designation: "Class 10th Hindi Medium (Complete Board Prep)",
      password: "studentpassword123",
    },
    {
      name: "Anjali Gupta",
      email: "anjali.gupta@gmail.com",
      role: "student",
      designation: "Class 12th Commerce (Maths & Accountancy)",
      password: "studentpassword123",
    },
  ],
};

export const ALL_SEED_ACCOUNTS: SeedAccount[] = [
  ...SEED_ACCOUNTS.admin,
  ...SEED_ACCOUNTS.instructor,
  ...SEED_ACCOUNTS.student,
];
