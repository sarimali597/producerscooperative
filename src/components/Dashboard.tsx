import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { RefreshCw, TrendingUp, Users, Ticket, ArrowUpRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const intakeData = [
  { time: '06:00', maize: 120, wheat: 40 },
  { time: '07:00', maize: 250, wheat: 80 },
  { time: '08:00', maize: 400, wheat: 150 },
  { time: '09:00', maize: 550, wheat: 200 },
  { time: '10:00', maize: 380, wheat: 120 },
  { time: '11:00', maize: 420, wheat: 90 },
  { time: '12:00', maize: 300, wheat: 50 },
  { time: '13:00', maize: 480, wheat: 110 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Daily Operations Dashboard</h2>
          <p className="text-slate-500">Real-time overview of terminal activity and cooperative metrics.</p>
        </div>
        <Button className="gap-2 bg-slate-800 hover:bg-slate-900 text-white shadow-md">
          <RefreshCw size={16} />
          Sync to Main ERP
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Maize Intake</p>
                <p className="text-4xl font-bold tracking-tight text-slate-800">2,900 <span className="text-lg text-slate-400 font-normal">Tons</span></p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl">
                <TrendingUp className="text-emerald-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight size={16} className="text-emerald-500 mr-1" />
              <span className="text-emerald-600 font-medium mr-2">12.5%</span>
              <span className="text-slate-400">vs yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Store Tickets</p>
                <p className="text-4xl font-bold tracking-tight text-slate-800">142</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <Ticket className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <ArrowUpRight size={16} className="text-blue-500 mr-1" />
              <span className="text-blue-600 font-medium mr-2">8.2%</span>
              <span className="text-slate-400">vs yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Co-op Accounts Serviced</p>
                <p className="text-4xl font-bold tracking-tight text-slate-800">86</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl">
                <Users className="text-amber-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-slate-400">Throughout last 8 hours</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Section */}
      <Card className="shadow-sm border-slate-200">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <CardTitle>Inbound Deliveries (Last 8 Hours)</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={intakeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dx={-10}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="maize" name="Maize (Tons)" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="wheat" name="Wheat (Tons)" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
