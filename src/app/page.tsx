import { Suspense } from "react";
import { client } from "@/sanity/lib/client";
import NeuralHero from "@/components/hero/NeuralHero";
import AboutSection from "@/components/about/AboutSection";
import ExperienceGrid, { Experience } from "@/components/bento/ExperienceGrid";
import ProjectsLab, { Project } from "@/components/projects/ProjectsLab";
import EducationTimeline, { EducationItem } from "@/components/education/EducationTimeline";
import ContactSection from "@/components/contact/ContactSection";
import SkillNetwork from "@/components/skills/SkillNetwork";
import {
  BentoGridSkeleton,
  ProjectsSectionSkeleton,
  EducationSectionSkeleton,
} from "@/components/ui/Skeletons";

const EXPERIENCE_QUERY = `*[_type == "experience"] | order(order asc) { _id, company, role, date, highlights, colSpan, rowSpan }`;
const PROJECTS_QUERY = `*[_type == "project"] | order(order asc) { _id, title, description, tech, link, github }`;
const EDUCATION_QUERY = `*[_type == "education"] | order(order asc) { _id, title, institution, location, date, highlight, iconName }`;

async function ExperienceSection() {
  const experiences = await client.fetch<Experience[]>(
    EXPERIENCE_QUERY,
    {},
    { next: { revalidate: 3600 } }
  );
  return (
    <div id="experience" className="w-full relative z-10 bg-[var(--color-obsidian)]">
      <ExperienceGrid experiences={experiences} />
    </div>
  );
}

async function ProjectsSection() {
  const projects = await client.fetch<Project[]>(
    PROJECTS_QUERY,
    {},
    { next: { revalidate: 3600 } }
  );
  return (
    <div className="w-full relative z-10 bg-[var(--color-obsidian)] border-t border-[var(--color-snow)]/5">
      <ProjectsLab projects={projects} />
    </div>
  );
}

async function EducationSection() {
  const educationItems = await client.fetch<EducationItem[]>(
    EDUCATION_QUERY,
    {},
    { next: { revalidate: 3600 } }
  );
  return (
    <div
      id="education"
      className="w-full relative z-10 bg-[var(--color-obsidian)] border-t border-[var(--color-snow)]/5"
    >
      <EducationTimeline items={educationItems} />
    </div>
  );
}

export default function Home() {
  return (
    <main
      id="main"
      className="relative w-full flex flex-col items-center justify-center"
    >
      <NeuralHero />
      <AboutSection />

      <Suspense fallback={<BentoGridSkeleton />}>
        <ExperienceSection />
      </Suspense>

      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <ProjectsSection />
      </Suspense>

      <Suspense fallback={<EducationSectionSkeleton />}>
        <EducationSection />
      </Suspense>

      <div className="w-full relative z-10 bg-[var(--color-obsidian)] border-t border-[var(--color-snow)]/5">
        <SkillNetwork />
      </div>

      <div className="w-full relative z-10 bg-[var(--color-obsidian)] border-t border-[var(--color-snow)]/5">
        <ContactSection />
      </div>

      <footer className="w-full py-8 text-center text-xs font-mono text-gray-600 bg-[var(--color-obsidian)] border-t border-[var(--color-snow)]/10">
        &copy; {new Date().getFullYear()} ALYASAR JABBARLI. ALL RIGHTS RESERVED.
      </footer>

      <div className="h-32 w-full bg-[var(--color-obsidian)]" />
    </main>
  );
}
