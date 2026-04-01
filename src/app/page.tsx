import NeuralHero from "@/components/hero/NeuralHero";
import ExperienceGrid from "@/components/bento/ExperienceGrid";
import ProjectsLab from "@/components/projects/ProjectsLab";
import EducationTimeline from "@/components/education/EducationTimeline";
import ContactSection from "@/components/contact/ContactSection"; // Add this import

export default function Home() {
  return (
    <main className="relative w-full flex flex-col items-center justify-center">
      <NeuralHero />
      
      <div id="experience" className="w-full relative z-10 bg-[var(--color-obsidian)]">
        <ExperienceGrid />
      </div>
      
      <div className="w-full relative z-10 bg-[var(--color-obsidian)] border-t border-[var(--color-snow)]/5">
        <ProjectsLab />
      </div>

      <div id="education" className="w-full relative z-10 bg-[var(--color-obsidian)] border-t border-[var(--color-snow)]/5">
        <EducationTimeline />
      </div>
      
      {/* Add the Contact section here */}
      <div className="w-full relative z-10 bg-[var(--color-obsidian)] border-t border-[var(--color-snow)]/5">
        <ContactSection />
      </div>

      <footer className="w-full py-8 text-center text-xs font-mono text-gray-600 bg-[var(--color-obsidian)]">
        &copy; {new Date().getFullYear()} ALYASAR JABBARLI. ALL RIGHTS RESERVED.
      </footer>
      
      <div className="h-32 w-full bg-[var(--color-obsidian)]" />
    </main>
  );
}