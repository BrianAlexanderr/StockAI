import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, TrendingDown, DollarSign, Calendar as CalendarIcon, Target } from "lucide-react";
import { ChevronsUpDown, Check } from "lucide-react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar.tsx"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ComposedChart } from "recharts"

const PredictionSection = () => {
  const [selectedStock, setSelectedStock] = useState("");
  const [predictionResult, setPredictionResult] = useState<any>(null);
  const [companies, setCompanies] = useState<{ code: string; name: string }[]>([]);
  const [open, setOpen] = useState(false)
  const minDate = new Date('2023-01-06');
  const maxDate = new Date('2026-04-26');

  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/stocks")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item: any) => ({
          code: item.Kode,
          name: item['Nama Perusahaan'],
        }))
        setCompanies(mapped)
      })
      .catch((err) => console.error("Error fetching companies:", err));
  }, []);

  const popularStocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: "$175.43", change: "+2.34%" },
    { symbol: "TSLA", name: "Tesla Inc.", price: "$248.50", change: "+5.67%" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: "$338.11", change: "+1.45%" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: "$2,832.14", change: "-0.89%" },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: "$3,372.20", change: "+3.21%" },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: "$437.80", change: "+7.89%" }
  ];

  const handlePredict = async () => {
    if (!selectedStock || !dateRange?.from || !dateRange?.to) {
      console.warn("Please select a stock and date range");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/forecast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stock: selectedStock,
          startDate: dateRange.from.toISOString().split('T')[0],
          endDate: dateRange.to.toISOString().split('T')[0],
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch prediction");

      const data = await response.json();
      console.log("Prediction result:", data);
      setPredictionResult(data);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-card-foreground mb-1">{`Date: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: $${entry.value?.toFixed(2)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

  return (
    <section id="predict" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Stock Price Prediction</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get AI-powered predictions for your favorite stocks using advanced machine learning algorithms.
          </p>
        </div>

        {/* Prediction + Chart grid */}
        <div
          className={`grid gap-8 ${
            predictionResult ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {/* Prediction Input */}
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Stock Predictor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stock Symbol Selector */}
              <div>
                <Label htmlFor="stock-symbol">Stock Symbol</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between mt-2"
                    >
                      {selectedStock
                        ? companies.find((c) => c.code === selectedStock)?.name + " (" + selectedStock + ")"
                        : "Select or search stock..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search stock..." />
                      <CommandList className="max-h-48 overflow-y-auto">
                        <CommandEmpty>No stock found.</CommandEmpty>
                        <CommandGroup>
                          {companies.map((company) => (
                            <CommandItem
                              key={company.code}
                              value={company.code}
                              onSelect={(value) => {
                                setSelectedStock(value);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedStock === company.code ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {company.name} ({company.code})
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Date Pickers */}
              <div>
                <Label>Prediction Dates</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {/* Start Date */}
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="mt-2 w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange?.from ? format(dateRange.from, "PPP") : <span>Pick start date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange?.from}
                          onSelect={(day) => setDateRange((prev) => ({ ...prev, from: day }))}
                          disabled={(date) => date < minDate || date > maxDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* End Date */}
                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="mt-2 w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateRange?.to ? format(dateRange.to, "PPP") : <span>Pick end date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange?.to}
                          onSelect={(day) => setDateRange((prev) => ({ ...prev, to: day }))}
                          disabled={(date) => date < (dateRange?.from || minDate) || date > maxDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Current model can predict from 2023-01-07 to 2026-04-21
                </p>
              </div>

              {/* Button */}
              <Button 
                onClick={handlePredict} 
                className="w-full bg-gradient-primary hover:shadow-glow-primary transition-all duration-300"
                disabled={!selectedStock}
              >
                Generate Prediction
                <TrendingUp className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Chart (conditionally rendered when result exists) */}
          {predictionResult && (
            <Card className="bg-gradient-card border-border/30 shadow-card backdrop-blur-sm animate-fade-in">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Stock Prediction Analysis
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  {predictionResult.stock} Predictive forecast
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="w-full h-96 relative">
                  <div className="absolute inset-0 bg-gradient-chart rounded-lg opacity-20 pointer-events-none" />
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={predictionResult.forecast}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <defs>
                        <linearGradient id="primaryGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-primary))" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-tertiary))" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="hsl(var(--chart-tertiary))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      
                      <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="hsl(var(--chart-grid))" 
                        strokeOpacity={0.3}
                        horizontal={true}
                        vertical={false}
                      />
                      
                      <XAxis 
                        dataKey="timestamp" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                    
                      <Tooltip content={<CustomTooltip />} />

                      <Legend 
                        wrapperStyle={{ 
                          paddingTop: '20px',
                          fontSize: '14px'
                        }}
                      />
                      
                      {/* Main prediction line */}
                      <Line
                        type="monotone"
                        dataKey="mean"
                        stroke="#2cd5efff"  // use your gradient instead of a flat color
                        strokeWidth={2.5}
                        dot={false}
                        name="Predicted Price"
                        />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Popular Stocks */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Popular Stocks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularStocks.map((stock) => (
              <Card 
                key={stock.symbol} 
                className="bg-gradient-card border-border/50 hover:border-primary/20 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedStock(stock.symbol)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{stock.symbol}</h4>
                      <p className="text-sm text-muted-foreground">{stock.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{stock.price}</p>
                      <p className={`text-sm ${stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {stock.change}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionSection;
