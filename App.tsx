import React, { useState, useCallback } from 'react';
import { TransitMap } from './components/MapContainer';
import { StatsPanel } from './components/StatsPanel';
import { Legend } from './components/Legend';
import { SettlementWithData } from './types';

const App: React.FC = () => {
  const [settlementData, setSettlementData] = useState<SettlementWithData[]>([]);

  const handleDataLoaded = useCallback((data: SettlementWithData[]) => {
    setSettlementData(data);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 overflow-hidden">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 shadow-md z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Baranya Közlekedési Térkép</h1>
            <p className="text-slate-400 text-sm mt-1">
              Reggeli elérhetőség Pécsre (7:00 - 10:00) • Interaktív elemzés
            </p>
          </div>
          <div className="mt-3 md:mt-0">
            <a href="#" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition">
              Adatok frissítése
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex relative">
        
        {/* Map Layer */}
        <div className="flex-1 relative h-full w-full">
          <TransitMap onDataLoaded={handleDataLoaded} />
          
          {/* Floating Legend */}
          <div className="absolute bottom-6 left-6 z-[1000] hidden sm:block">
            <Legend />
          </div>
        </div>

        {/* Sidebar (Overlay on mobile, Side on desktop) */}
        <aside className="absolute top-0 right-0 h-full w-full sm:w-80 bg-slate-900/95 backdrop-blur-sm sm:bg-slate-900 border-l border-slate-700 z-[1001] transition-transform transform translate-x-full sm:translate-x-0 sm:relative p-4 overflow-y-auto">
            <StatsPanel data={settlementData} />
            
            <div className="mt-6 sm:hidden">
               <Legend />
            </div>
        </aside>
      </main>
    </div>
  );
};

export default App;