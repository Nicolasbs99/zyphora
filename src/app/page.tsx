import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ValuePropositionSection />
      <ProcessSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
