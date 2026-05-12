import { useCallback, useRef, useState } from "react";
import { HeroSection } from "../components/HeroSection";
import { ExperienceSection, ExperienceContent } from "../components/ExperienceSection";
import { ProjectsSection, ProjectsContent } from "../components/ProjectsSection";
import { ContactSection, ContactContent } from "../components/ContactSection";

export const Home = () => {
  const [openSection, setOpenSection] = useState(null);
  const [shownSection, setShownSection] = useState(null);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef(null);

  // Heading sequence: hero done → exp → proj → contact
  const [expStarted, setExpStarted] = useState(false);
  const [projStarted, setProjStarted] = useState(false);
  const [contactStarted, setContactStarted] = useState(false);

  const onHeroDone = useCallback(() => setExpStarted(true), []);
  const onExpDone = useCallback(() => setProjStarted(true), []);
  const onProjDone = useCallback(() => setContactStarted(true), []);

  const toggle = (id) => {
    if (exitTimer.current) clearTimeout(exitTimer.current);
    if (openSection === id) {
      setExiting(true);
      setOpenSection(null);
      exitTimer.current = setTimeout(() => {
        setShownSection(null);
        setExiting(false);
      }, 280);
    } else {
      setExiting(false);
      setOpenSection(id);
      setShownSection(id);
    }
  };

  return (
    <div
      className="h-screen flex text-foreground overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Left column */}
      <div className="flex flex-col h-full border-r border-border w-[45%] shrink-0">
        <HeroSection onDone={onHeroDone} />
        <ExperienceSection
          open={openSection === "experience"}
          onToggle={() => toggle("experience")}
          started={expStarted}
          onHeadingDone={onExpDone}
        />
        <ProjectsSection
          open={openSection === "projects"}
          onToggle={() => toggle("projects")}
          started={projStarted}
          onHeadingDone={onProjDone}
        />
        <ContactSection
          open={openSection === "contact"}
          onToggle={() => toggle("contact")}
          started={contactStarted}
        />
      </div>

      {/* Right column */}
      <div className="flex-1 h-full overflow-y-auto">
        {shownSection && (
          <div
            key={shownSection}
            className={`min-h-full ${shownSection !== "contact" ? "bg-background" : ""} ${exiting ? "animate-unroll-out" : "animate-unroll"}`}
          >
            {shownSection === "experience" && <ExperienceContent />}
            {shownSection === "projects" && <ProjectsContent />}
            {shownSection === "contact" && <ContactContent />}
          </div>
        )}
      </div>
    </div>
  );
};
