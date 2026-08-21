export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  score: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Rohan Patel",
    role: "Class 10 CBSE Board • 96.4%",
    content: "The Maths & Science live sessions on Fukey Education completely transformed my confidence. Pawan Sir's quadratic formula shortcuts and live doubt clearing made board exam questions feel effortless!",
    rating: 5,
    score: "96.4%",
  },
  {
    id: "t-2",
    name: "Ananya Sharma",
    role: "Class 12 CBSE Board • 95.8%",
    content: "Class 12 Physics derivations used to be overwhelming. The color formula sheets and mock test series prepared me for the exact question format asked in the board papers. Highly recommended!",
    rating: 5,
    score: "95.8%",
  },
  {
    id: "t-3",
    name: "Vikramaditya Rao",
    role: "Class 11 Science • State Board",
    content: "The teachers explain concepts in both Hindi and English so clearly. The recorded HD lectures allowed me to revise tough Chemistry reactions as many times as I needed.",
    rating: 5,
    score: "Top Ranker",
  },
];
