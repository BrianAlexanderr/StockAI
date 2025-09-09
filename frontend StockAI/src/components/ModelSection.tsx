import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Cpu, Database, TrendingUp, Zap, Shield } from "lucide-react";

const ModelSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Deep Learning Architecture",
      description: "Advanced model Chronos developed by Amazon trained on market data to identify complex patterns and trends."
    },
    {
      icon: Database,
      title: "Multiple Stocks Oriented",
      description: "Multiple Stocks prediction using only one model."
    },
    {
      icon: Cpu,
      title: "High-Performance Computing",
      description: "Distributed processing across multiple GPUs for real-time predictions and continuous model updates."
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Sub-second prediction generation with automatic model retraining based on market conditions."
    },
  ];

  return (
    <section id="model" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">AI-Powered Forecasting Model</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our cutting-edge machine learning model combines multiple neural network architectures 
            to deliver highly accurate stock price predictions with unprecedented reliability.
          </p>
        </div>

        {/* Model Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow-accent/20 group animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <div className="flex items-center mb-2">
                  <div className="p-3 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelSection;