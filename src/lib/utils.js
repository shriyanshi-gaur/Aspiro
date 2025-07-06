import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ Just export it here
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
