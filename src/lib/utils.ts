import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function useOs() : "mac" | "windows" {
  if (typeof window === 'undefined') {
    return "windows" // or some default
  }
  if (navigator.userAgent.includes('Mac')) {
    return 'mac';
  }
  return 'windows';
}


export function max_or_min(a: number, b: number): number{
  return a > b ? b : a;
}