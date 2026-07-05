"use client";

import nextDynamic from "next/dynamic";

export const ClientNavigation = nextDynamic(
  () => import("./Navigation").then((mod) => mod.Navigation),
  { ssr: false }
);

export const ClientFooter = nextDynamic(
  () => import("./Footer").then((mod) => mod.Footer),
  { ssr: false }
);
