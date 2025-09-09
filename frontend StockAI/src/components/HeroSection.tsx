import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, Target } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroSectionProps {
  onNavigateToPredict: () => void;
}

const HeroSection = ({ onNavigateToPredict }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <TrendingUp className="w-8 h-8 text-accent opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-float delay-1000">
        <BarChart3 className="w-6 h-6 text-primary opacity-40" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float delay-2000">
        <Target className="w-7 h-7 text-accent opacity-50" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent leading-tight">
            Predict the Future
            <br />
            <span className="text-foreground">of Stock Markets</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Harness the power of advanced AI algorithms to forecast stock prices with unprecedented accuracy. 
            Make informed investment decisions with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-20">
            <Button
              size="lg"
              onClick={onNavigateToPredict}
              className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-500 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
            >
              Start Predicting
              <TrendingUp className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;