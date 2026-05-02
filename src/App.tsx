import { useState, useEffect } from 'react';
import {
  Tractor,
  Store,
  LayoutDashboard,
  LogOut,
  Clock,
  Settings,
  Bell
} from 'lucide-react';
import { WeighStation } from './components/WeighStation';
import { POSCheckout } from './components/POSCheckout';
import { Dashboard } from './components/Dashboard';

function App() {
  const [activeTab, setActiveTab] = useState<'weigh' | 'pos' | 'dashboard'>('weigh');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white flex flex-col shadow-xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-green-800">
          <div className="bg-white p-2 rounded-lg text-green-900">
            <Tractor size={24} className="stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Producers</h1>
            <p className="text-green-300 text-xs font-medium tracking-wider uppercase">Cooperative</p>
          </div>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2">
          <button
            onClick={() => setActiveTab('weigh')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${activeTab === 'weigh'
              ? 'bg-green-800 text-white shadow-inner'
              : 'text-green-100 hover:bg-green-800/50 hover:text-white'
              }`}
          >
            <Tractor size={20} />
            Raw Intake
          </button>
          <button
            onClick={() => setActiveTab('pos')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${activeTab === 'pos'
              ? 'bg-green-800 text-white shadow-inner'
              : 'text-green-100 hover:bg-green-800/50 hover:text-white'
              }`}
          >
            <Store size={20} />
            Member POS
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium ${activeTab === 'dashboard'
              ? 'bg-green-800 text-white shadow-inner'
              : 'text-green-100 hover:bg-green-800/50 hover:text-white'
              }`}
          >
            <LayoutDashboard size={20} />
            Operations
          </button>
        </nav>

        <div className="p-4 border-t border-green-800">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-green-200 hover:bg-green-800 hover:text-white transition-colors text-sm">
            <Settings size={18} />
            System Settings
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2 mt-1 rounded-lg text-green-200 hover:bg-green-800 hover:text-white transition-colors text-sm">
            <LogOut size={18} />
            Log Out Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="font-semibold text-slate-700">Scale House Terminal 1</h2>
            </div>
            <div className="h-6 w-px bg-slate-200 mx-2" />
            <span className="text-sm text-slate-500 font-medium flex items-center gap-2">
              <Clock size={16} />
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-slate-300 flex items-center justify-center overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Operator&backgroundColor=e2e8f0`} alt="User" />
            </div>
          </div>
        </header>

        {/* Dynamic View */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto h-full fade-in">
            {activeTab === 'weigh' && <WeighStation />}
            {activeTab === 'pos' && <POSCheckout />}
            {activeTab === 'dashboard' && <Dashboard />}
          </div>
        </div>

        {/* Footer */}
        <footer className="py-3 text-center text-xs text-slate-400 border-t border-slate-200 bg-white">
          Developed by <span className="font-semibold text-slate-500">Store Flow</span> • Producers Cooperative Association • Demo Environment
        </footer>
      </main>
    </div>
  );
}

export default App;
