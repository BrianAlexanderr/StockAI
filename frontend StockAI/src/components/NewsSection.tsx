import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";

const NewsSection = () => {
  const news = [
    {
      id: 1,
      title: "Tesla Stock Surges 15% After Q3 Earnings Beat",
      summary: "Tesla reports record-breaking quarterly earnings, exceeding analyst expectations with strong EV delivery numbers.",
      source: "Financial Times",
      time: "2 hours ago",
      impact: "positive",
      category: "Earnings"
    },
    {
      id: 2,
      title: "Federal Reserve Signals Potential Rate Cut",
      summary: "Markets rally as Fed Chair hints at possible interest rate reduction in upcoming FOMC meeting.",
      source: "Reuters",
      time: "4 hours ago",
      impact: "positive",
      category: "Monetary Policy"
    },
    {
      id: 3,
      title: "Tech Sector Faces New Regulatory Challenges",
      summary: "New antitrust legislation proposed could impact major tech companies' market valuations.",
      source: "Wall Street Journal",
      time: "6 hours ago",
      impact: "negative",
      category: "Regulation"
    },
    {
      id: 4,
      title: "Oil Prices Stabilize Amid Geopolitical Tensions",
      summary: "Crude oil futures show mixed signals as markets assess global supply chain disruptions.",
      source: "Bloomberg",
      time: "8 hours ago",
      impact: "neutral",
      category: "Commodities"
    },
    {
      id: 5,
      title: "Banking Sector Shows Strong Q3 Performance",
      summary: "Major banks report solid earnings with improved loan growth and reduced credit losses.",
      source: "CNBC",
      time: "12 hours ago",
      impact: "positive",
      category: "Banking"
    },
    {
      id: 6,
      title: "Cryptocurrency Market Volatility Continues",
      summary: "Bitcoin and major altcoins experience significant price swings as institutional adoption grows.",
      source: "CoinDesk",
      time: "1 day ago",
      impact: "neutral",
      category: "Crypto"
    }
  ];

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "negative":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "positive":
        return "text-green-500 border-green-500/20 bg-green-500/10";
      case "negative":
        return "text-red-500 border-red-500/20 bg-red-500/10";
      default:
        return "text-muted-foreground border-muted/20 bg-muted/10";
    }
  };

  return (
    <section id="news" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Latest Market News</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay informed with real-time financial news and market insights that could impact your investment decisions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <Card 
              key={item.id} 
              className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 hover:shadow-glow-accent/20 group animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className={getImpactColor(item.impact)}>
                    {getImpactIcon(item.impact)}
                    {item.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {item.time}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 line-clamp-3">
                  {item.summary}
                </p>
                <div className="text-sm font-medium text-accent">
                  {item.source}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;