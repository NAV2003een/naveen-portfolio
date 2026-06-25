import Navbar from "../components/Navbar";
import HeroSection from "./HeroSection";
import StackSection from "./StackSection";
import ProjectsSection from "./ProjectsSection";
import EducationSection from "./EducationSection";
import CertsSection from "./CertsSection";
import ContactSection from "./ContactSection";

export default function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <StackSection />
      <ProjectsSection />
      <EducationSection />
      <CertsSection />
      <ContactSection />
    </>
  );
}