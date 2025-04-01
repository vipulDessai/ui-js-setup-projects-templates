// global.d.ts
import type { vi as Vi } from "vitest";

declare global {
  const vi: typeof Vi;
}

export {};
