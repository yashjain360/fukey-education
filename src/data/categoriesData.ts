export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  coursesCount: number;
  icon: string;
}

export const categoriesData: CategoryItem[] = [
  {
    id: "cat-class-9",
    title: "Class 9",
    description: "Foundation batches covering Mathematics, Science, Social Science, Hindi & English.",
    coursesCount: 6,
    icon: "book",
  },
  {
    id: "cat-class-10",
    title: "Class 10",
    description: "Target 95%+ board masterclasses with 10-year previous papers & solved NCERT exemplars.",
    coursesCount: 6,
    icon: "calculator",
  },
  {
    id: "cat-class-11",
    title: "Class 11",
    description: "Science, Commerce & Humanities core streams with advanced formula drills and concept deep-dives.",
    coursesCount: 20,
    icon: "atom",
  },
  {
    id: "cat-class-12",
    title: "Class 12",
    description: "Comprehensive board examination booster batches, derivations & full mock test series.",
    coursesCount: 20,
    icon: "award",
  },
];
