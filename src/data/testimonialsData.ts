export interface GoogleReviewItem {
  id: string;
  name: string;
  role: string;
  classCategory: "Class 10 CBSE" | "Class 12 Boards" | "Class 9 & 11" | "Parents";
  content: string;
  rating: number;
  score?: string;
  date: string;
  source: "Google Verified Review" | "Justdial Verified";
  helpfulCount: number;
  avatarColor: string;
}

export const googleReviewsData: GoogleReviewItem[] = [
  {
    id: "gr-1",
    name: "Rohan Patel",
    role: "Class 10 CBSE Board Student",
    classCategory: "Class 10 CBSE",
    content: "The Maths & Science live sessions on Fukey Education completely transformed my confidence. Pawan Sir's quadratic formula shortcuts and 15-minute dedicated doubt clearing at the end of every class made board exam questions feel super easy. Scored 96.4% in my pre-boards!",
    rating: 5,
    score: "96.4% in 10th Boards",
    date: "2 weeks ago",
    source: "Google Verified Review",
    helpfulCount: 14,
    avatarColor: "bg-blue-600",
  },
  {
    id: "gr-2",
    name: "Ananya Sharma",
    role: "Class 12 Physics & Chemistry Aspirant",
    classCategory: "Class 12 Boards",
    content: "Class 12 Physics derivations used to be very overwhelming. Vivek Sir's digital pen-tablet whiteboard diagrams and the chapter-wise handwritten PDF formula sheets prepared me for the exact question format asked in CBSE board papers.",
    rating: 5,
    score: "95.8% in Science",
    date: "1 month ago",
    source: "Google Verified Review",
    helpfulCount: 22,
    avatarColor: "bg-purple-600",
  },
  {
    id: "gr-3",
    name: "Sanjay Verma (Parent)",
    role: "Parent of Class 10th Student (Bhopal)",
    classCategory: "Parents",
    content: "Finding genuine teachers who don't just dump pre-recorded videos was our biggest concern. In Fukey Education, every class is 100% live. If my son doesn't understand a concept, the teacher explains it again right then. The weekly attendance and test tracking is phenomenal.",
    rating: 5,
    score: "Parent Verified",
    date: "3 weeks ago",
    source: "Google Verified Review",
    helpfulCount: 19,
    avatarColor: "bg-emerald-600",
  },
  {
    id: "gr-4",
    name: "Pooja Deshmukh",
    role: "Class 12 Economics & Commerce",
    classCategory: "Class 12 Boards",
    content: "Rashmi Ma'am makes Macroeconomics and Indian Economic Development so easy to visualize with real-world case studies and graphical breakdowns. Highly recommend Fukey Education to all commerce students in MP & CBSE!",
    rating: 5,
    score: "94.2% in Commerce",
    date: "2 months ago",
    source: "Justdial Verified",
    helpfulCount: 11,
    avatarColor: "bg-rose-600",
  },
  {
    id: "gr-5",
    name: "Vikramaditya Rao",
    role: "Class 11 Science • MP State Board",
    classCategory: "Class 9 & 11",
    content: "The teachers explain concepts in bilingual Hindi & English so clearly. The recorded HD lectures allow me to revise tough organic chemistry mechanisms whenever I need before term exams.",
    rating: 5,
    score: "Top 1% Ranker",
    date: "1 month ago",
    source: "Google Verified Review",
    helpfulCount: 16,
    avatarColor: "bg-indigo-600",
  },
  {
    id: "gr-6",
    name: "Devendra Singh Rajput",
    role: "Class 9 Foundation Student",
    classCategory: "Class 9 & 11",
    content: "The live interactive quiz at the end of each session keeps everyone attentive. My foundation in Mathematics and Science has become rock solid thanks to Fukey Education's daily practice worksheets.",
    rating: 5,
    score: "93.6% in 9th Annual",
    date: "3 weeks ago",
    source: "Google Verified Review",
    helpfulCount: 9,
    avatarColor: "bg-amber-600",
  }
];

export const testimonialsData = googleReviewsData;
