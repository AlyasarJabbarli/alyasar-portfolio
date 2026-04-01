"use client";

import { NextStudio } from "next-sanity/studio";
// 4 levels up: [[...tool]] -> studio -> app -> src -> root
import config from "../../../../sanity.config"; 

export default function StudioPage() {
  return <NextStudio config={config} />;
}