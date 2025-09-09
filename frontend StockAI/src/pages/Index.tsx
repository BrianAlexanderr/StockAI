import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PredictionSection from "@/components/PredictionSection";
import NewsSection from "@/components/NewsSection";
import ModelSection from "@/components/ModelSection";

const Index = () => {
  const [currentSection, setCurrentSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navigation
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
    setCurrentSection(sectionId);
  };

  const handleNavigateToPredict = () => {
    scrollToSection("predict");
  };

  // Update current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "predict", "news", "model"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onNavigateToSection={scrollToSection} />
      
      <main>
        <div id="home">
          <HeroSection onNavigateToPredict={handleNavigateToPredict} />
        </div>
        
        <PredictionSection />
        <NewsSection />
        <ModelSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              StockAI
            </span>
          </div>
          <p className="text-muted-foreground mb-4">
            AI-powered stock market predictions for informed investment decisions.
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 StockAI. All rights reserved. | Disclaimer: Past performance does not guarantee future results.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;