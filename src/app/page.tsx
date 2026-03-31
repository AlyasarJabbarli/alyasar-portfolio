import NeuralHero from "@/components/hero/NeuralHero";
import ExperienceGrid from "@/components/bento/ExperienceGrid"; // Assuming you saved the Bento code here

export default function Home() {
  return (
    <main className="relative w-full flex flex-col items-center justify-center">
      <NeuralHero />
      
      {/* Wrapper to add spacing and an anchor ID for the dock */}
      <div id="experience" className="w-full relative z-10 bg-[var(--color-obsidian)]">
        <ExperienceGrid />
      </div>
      
      {/* Adding some temporary padding at the bottom so the dock doesn't cover content */}
      <div className="h-40 w-full" />
    </main>
  );
}