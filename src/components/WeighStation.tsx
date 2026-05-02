import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CheckCircle2, Truck, Scale, FileText } from 'lucide-react';

export function WeighStation() {
  const [liveWeight, setLiveWeight] = useState(54200);
  const [isFluctuating, setIsFluctuating] = useState(true);

  // Simulate live scale fluctuation
  useEffect(() => {
    if (!isFluctuating) return;
    
    const interval = setInterval(() => {
      // Fluctuate by -20 to +20 lbs
      const change = Math.floor(Math.random() * 41) - 20;
      setLiveWeight(prev => {
        // Keep it realistic around 54k
        if (prev > 54500) return prev - Math.abs(change);
        if (prev < 53800) return prev + Math.abs(change);
        return prev + change;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isFluctuating]);

  const lockWeight = () => {
    setIsFluctuating(false);
  };

  const cwt = (liveWeight / 100).toFixed(2);
  const tons = (liveWeight / 2000).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Raw Intake & Weigh Station</h2>
          <p className="text-slate-500">Capture inbound bulk commodities and generate scale tickets.</p>
        </div>
        <Button variant="outline" className="gap-2 font-medium">
          <Truck size={18} />
          View Queue (3)
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Live Scale Panel */}
        <Card className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-2xl border-slate-700 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-32 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <CardHeader>
            <CardTitle className="text-slate-300 flex items-center gap-2 text-sm uppercase tracking-widest">
              <Scale size={16} />
              Platform Scale 1
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="text-center bg-black/40 rounded-xl py-8 px-4 border border-white/10 shadow-inner">
              <div className={`text-6xl md:text-7xl font-bold tracking-tighter text-emerald-400 font-mono transition-all ${isFluctuating ? 'scale-100' : 'scale-105 text-emerald-300'}`}>
                {liveWeight.toLocaleString()}
              </div>
              <div className="text-slate-400 mt-2 font-medium text-lg uppercase tracking-wider">Pounds (Lbs)</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <div className="text-slate-400 text-sm mb-1">Hundredweight</div>
                <div className="text-2xl font-semibold">{cwt} <span className="text-sm text-slate-500 font-normal">cwt</span></div>
              </div>
              <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                <div className="text-slate-400 text-sm mb-1">Short Tons</div>
                <div className="text-2xl font-semibold">{tons} <span className="text-sm text-slate-500 font-normal">t</span></div>
              </div>
            </div>

            <Button 
              className={`w-full h-14 text-lg font-bold transition-all ${isFluctuating ? 'bg-emerald-600 hover:bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              onClick={lockWeight}
              disabled={!isFluctuating}
            >
              {isFluctuating ? 'LOCK WEIGHT' : 'WEIGHT LOCKED'}
            </Button>
          </CardContent>
        </Card>

        {/* Ticket Details Panel */}
        <Card className="lg:col-span-7 shadow-lg border-slate-200">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
            <CardTitle>Intake Ticket Details</CardTitle>
            <CardDescription>Enter truck, driver, and commodity quality metrics.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="truckId">Truck/Trailer ID</Label>
                <Input id="truckId" placeholder="e.g. TX-4829" defaultValue="TX-BVF-09" className="font-medium" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driverName">Driver Name (Optional)</Label>
                <Input id="driverName" placeholder="John Smith" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="commodity">Commodity Type</Label>
              <select 
                id="commodity" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
                defaultValue="maize"
              >
                <option value="maize">No. 2 Yellow Corn (Maize)</option>
                <option value="wheat">Hard Red Winter Wheat</option>
                <option value="soy">Soybean Meal</option>
                <option value="sorghum">Grain Sorghum</option>
              </select>
            </div>

            <div className="p-5 bg-amber-50 rounded-lg border border-amber-100 space-y-4">
              <h3 className="font-semibold text-amber-900 text-sm uppercase tracking-wider flex items-center gap-2">
                Quality Grading
                <span className="bg-amber-200 text-amber-800 text-xs px-2 py-0.5 rounded-full">Required</span>
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label htmlFor="moisture">Moisture %</Label>
                    <span className="text-sm font-medium text-amber-700">14.5%</span>
                  </div>
                  <input type="range" id="moisture" min="10" max="25" step="0.1" defaultValue="14.5" className="w-full accent-amber-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label htmlFor="testWeight">Test Weight (lb/bu)</Label>
                    <span className="text-sm font-medium text-amber-700">58.0</span>
                  </div>
                  <input type="range" id="testWeight" min="50" max="65" step="0.5" defaultValue="58" className="w-full accent-amber-600" />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Ready to generate ticket
              </div>
              <Button size="lg" className="gap-2 shadow-md hover:shadow-lg transition-all" disabled={isFluctuating}>
                <FileText size={18} />
                Generate Intake Ticket
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
