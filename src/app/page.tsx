import { client } from "@/sanity/lib/client"; // Verify this path matches your generated Sanity client
import NeuralHero from "@/components/hero/NeuralHero";
import ExperienceGrid, { Experience } from "@/components/bento/ExperienceGrid";
import ProjectsLab from "@/components/projects/ProjectsLab";
import EducationTimeline from "@/components/education/EducationTimeline";
import ContactSection from "@/components/contact/ContactSection";

// The GROQ Query: Fetch all 'experience' documents, sorted by our custom 'order' field
const EXPERIENCE_QUERY = `*[_type == "experience"] | order(order asc) {
  _id,
  company,
  role,
  date,
  highlights,
  colSpan,
  rowSpan
}`;

export default async function Home() {
  // Fetch the data on the server before the page ever reaches the client
  const experiences = await client.fetch<Experience[]>(EXPERIENCE_QUERY, {}, {
    // Next.js 16 caching: Revalidate this data every hour, or whenever you trigger a webhook
    next: { revalidate: 3600 } 
  });

  return (
    <main className="relative w-full flex flex-col items-center justify-center">
      <NeuralHero />
      
      <div id="experience" className="w-full relative z-10 bg-[var(--color-obsidian)]">
        {/* Pass the dynamic Sanity data directly into the client component */}
        <ExperienceGrid experiences={experiences} />
      </div>
      
      <div className="w-full relative z-10 bg-[var(--color-obsidian)] border-t border-[var(--color-snow)]/5">
        <ProjectsLab />
      </div>

      <div id="education" className="w-full relative z-10 bg-[var(--color-obsidian)] border-t border-[var(--color-snow)]/5">
        <EducationTimeline />
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