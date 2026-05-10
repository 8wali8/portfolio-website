import { HeroSection } from "../components/HeroSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";

export const Home = () => {
  return (
    <div
      className="relative min-h-screen flex flex-col text-foreground overflow-x-hidden"
      style={{ zIndex: 1 }}
    >
      <main className="flex flex-col flex-1">
        <HeroSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
};
