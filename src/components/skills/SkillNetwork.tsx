"use client";

import { useEffect, useRef } from "react";
import * as d3Force from "d3-force";
import * as d3Drag from "d3-drag";
import * as d3Selection from "d3-selection";
import MaskedText from "../ui/MaskedText";

// Your tech stack, categorized by domain
const nodes = [
    { id: "Python", group: 1, radius: 40 },
    { id: "Machine Learning", group: 1, radius: 55 },
    { id: "FastAPI", group: 1, radius: 35 },
    { id: "Data Science", group: 1, radius: 50 },
    { id: "Next.js 16", group: 2, radius: 50 },
    { id: "React", group: 2, radius: 45 },
    { id: "TypeScript", group: 2, radius: 45 },
    { id: "Tailwind v4", group: 2, radius: 40 },
    { id: "Framer Motion", group: 2, radius: 45 },
    { id: "PostgreSQL", group: 3, radius: 40 },
    { id: "WebSockets", group: 3, radius: 45 },
    { id: "System Design", group: 3, radius: 55 },
];

// Invisible springs connecting related technologies
const links = [
    { source: "Python", target: "Machine Learning" },
    { source: "Python", target: "FastAPI" },
    { source: "Python", target: "Data Science" },
    { source: "Next.js 16", target: "React" },
    { source: "Next.js 16", target: "TypeScript" },
    { source: "React", target: "Framer Motion" },
    { source: "React", target: "Tailwind v4" },
    { source: "FastAPI", target: "PostgreSQL" },
    { source: "Next.js 16", target: "WebSockets" },
    { source: "System Design", target: "PostgreSQL" },
    { source: "System Design", target: "WebSockets" },
    { source: "Data Science", target: "System Design" }, // Bridging the gap
];

export default function SkillNetwork() {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!containerRef.current || !svgRef.current) return;

        const width = containerRef.current.clientWidth;
        const height = 500;

        // Deep copy data so D3 doesn't mutate our original arrays during hot-reloads
        const nodesCopy = nodes.map((d) => ({ ...d }));
        const linksCopy = links.map((d) => ({ ...d }));

        // 1. Initialize the D3 Physics Engine
        const simulation = d3Force.forceSimulation(nodesCopy as any)
            .force("link", d3Force.forceLink(linksCopy).id((d: any) => d.id).distance(120))
            .force("charge", d3Force.forceManyBody().strength(-400)) // Repel each other
            .force("center", d3Force.forceCenter(width / 2, height / 2)) // Pull to middle
            .force("collide", d3Force.forceCollide().radius((d: any) => d.radius + 10)); // Prevent overlapping

        const svg = d3Selection.select(svgRef.current);
        const container = d3Selection.select(containerRef.current);

        // Clear previous renders (for React strict mode hot-reloading)
        svg.selectAll("*").remove();
        container.selectAll(".skill-node").remove();

        // 2. Draw the connection lines (SVG)
        const linkElements = svg
            .append("g")
            .selectAll("line")
            .data(linksCopy)
            .enter()
            .append("line")
            .attr("stroke", "rgba(255, 255, 255, 0.1)")
            .attr("stroke-width", 2);

        // 3. Draw the nodes (HTML DOM Elements for beautiful CSS glassmorphism)
        const nodeElements = container
            .selectAll(".skill-node")
            .data(nodesCopy)
            .enter()
            .append("div")
            .attr("class", "skill-node absolute rounded-full flex flex-col items-center justify-center text-center font-bold text-xs leading-tight p-2 cursor-grab active:cursor-grabbing border backdrop-blur-md transition-colors duration-300 hover:border-[var(--color-electric-cyan)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]")            .style("width", (d) => `${d.radius * 2}px`)
            .style("height", (d) => `${d.radius * 2}px`)
            // Custom colors based on domain group
            .style("background", (d) => d.group === 1 ? "rgba(0, 240, 255, 0.05)" : d.group === 2 ? "rgba(255, 255, 255, 0.05)" : "rgba(100, 100, 255, 0.05)")
            .style("border-color", (d) => d.group === 1 ? "rgba(0, 240, 255, 0.3)" : "rgba(255, 255, 255, 0.2)")
            .style("color", "var(--color-snow)")
            .style("user-select", "none")
            .text((d) => d.id)
            .call(
                d3Drag.drag<HTMLDivElement, any>()
                    .on("start", (event, d) => {
                        if (!event.active) simulation.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    })
                    .on("drag", (event, d) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on("end", (event, d) => {
                        if (!event.active) simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    }) as any
            );

        // 4. The 60fps Animation Loop (Bypassing React State)
        simulation.on("tick", () => {
            // KEEP NODES INSIDE THE BOX
            // We use Math.max and Math.min to prevent the x and y coordinates from going past the borders
            nodesCopy.forEach((d: any) => {
                d.x = Math.max(d.radius, Math.min(width - d.radius, d.x));
                d.y = Math.max(d.radius, Math.min(height - d.radius, d.y));
            });

            // Update SVG lines
            linkElements
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            // Update HTML Divs using hardware-accelerated CSS transforms
            nodeElements.style("transform", (d: any) => `translate(${d.x - d.radius}px, ${d.y - d.radius}px)`);
        });

        return () => {
            simulation.stop(); // Cleanup physics loop on unmount
        };
    }, []);

    return (
        <section id="skills" className="py-24 px-4 max-w-6xl mx-auto w-full relative z-10">
            <div className="mb-8 flex flex-col items-center text-center">
                <MaskedText
                    text="Technical Ecosystem"
                    highlightLastWord={true}
                    className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--color-snow)] mb-4 justify-center"
                />
                <p className="text-gray-400 font-light max-w-xl">
                    Interact with the graph. A physics-based representation bridging Data Science modeling with High-Performance Frontend architecture.
                </p>
            </div>

            {/* Physics Container */}
            <div
                ref={containerRef}
                className="relative w-full h-[500px] rounded-3xl bg-[var(--color-snow)]/5 border border-[var(--color-snow)]/10 overflow-hidden"
            >
                <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none" />
            </div>
        </section>
    );
}