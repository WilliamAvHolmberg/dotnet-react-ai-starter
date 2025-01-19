import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNextReview(nextReview: string): string {
  const next = new Date(nextReview);
  const now = new Date();
  const diff = next.getTime() - now.getTime();
  
  const minutes = Math.floor(diff / 1000 / 60);
  if (minutes < 60) return `${minutes} minutes`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours`;
  
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} days`;
  
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} weeks`;
  
  const months = Math.floor(days / 30);
  return `${months} months`;
}
