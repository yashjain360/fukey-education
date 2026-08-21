import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string, currency: string = "INR"): string {
  const num = typeof price === "number" ? price : parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;
  if (currency === "USD") {
    return `$${(num / 83).toFixed(2)}`;
  }
  return `₹${num.toLocaleString("en-IN")}`;
}
