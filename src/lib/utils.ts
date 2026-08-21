import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "INR"): string {
  if (currency === "USD") {
    return `$${(price / 83).toFixed(2)}`;
  }
  return `₹${price.toLocaleString("en-IN")}`;
}
