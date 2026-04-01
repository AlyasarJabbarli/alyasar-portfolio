"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import DataNetworkCanvas from "../canvas/DataNetwork";


export default function NeuralHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll for parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    // Inside your component, replace the section with:
    <DataNetworkCanvas />
  );
}