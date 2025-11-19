import React, { useMemo } from 'react';
import { SettlementWithData, TransportStatus } from '../types';
import { getTransportStatus } from '../services/transportService';

interface Props {
  data: SettlementWithData[];
}

export const StatsPanel: React.FC<Props> = ({ data }) => {
  const stats = useMemo(() => {
    const total = data.length;
    if (total === 0) return null;

    const reachable = data.filter(d => d.isReachable).length;
    const unreachable = total - reachable;
    
    const avgTime = data
      .filter(d => d.isReachable && d.name !== 'Pécs')
      .reduce((acc, curr) => acc + curr.travelTimeMinutes, 0) / (reachable - 1 || 1);

    const difficult = data.filter(d => getTransportStatus(d) === TransportStatus.Poor).length;
    const excellent = data.filter(d => getTransportStatus(d) === TransportStatus.Excellent).length;

    return {
      total,
      reachable,
      unreachable,
      avgTime: Math.round(avgTime),
      difficult,
      excellent
    };
  }, [data]);

  if (!stats) return <div className="text-slate-400 text-sm">Adatok betöltése...</div>;

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-700 text-slate-100">
      <h2 className="text-xl font-bold mb-4 text-blue-400">Baranya Közlekedés</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-700 p-3 rounded">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-xs text-slate-400 uppercase">Település</div>
        </div>
        <div className="bg-slate-700 p-3 rounded">
          <div className="text-2xl font-bold text-green-400">{stats.avgTime} p</div>
          <div className="text-xs text-slate-400 uppercase">Átlag menetidő</div>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center border-b border-slate-700 pb-2">
          <span className="text-green-400">Kiváló (≤ 45p):</span>
          <span className="font-mono font-bold text-green-400">{stats.excellent} db</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-700 pb-2">
          <span>Elérhető (7-10 óra):</span>
          <span className="font-mono font-bold text-white">{stats.reachable} db</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-700 pb-2">
          <span className="text-red-500 font-bold">Nem érhető el:*</span>
          <span className="font-mono font-bold text-red-500">{stats.unreachable} db</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-orange-400">Nehézkes ({'>'}110p):</span>
          <span className="font-mono font-bold text-orange-400">{stats.difficult} db</span>
        </div>
      </div>
      
      <div className="mt-6 text-xs text-slate-500 leading-relaxed border-t border-slate-700 pt-3">
        <strong className="block mb-1 text-slate-400">Adatforrás:</strong>
        A menetidő adatok a <strong>2024/2025-ös Volánbusz és MÁV-Start menetrendi adatbázisok</strong> alapján kerültek rögzítésre.
        <br/><br/>
        Az értékek a reggeli csúcsidőszakban (07:00 - 10:00) Pécsre érkező leggyorsabb járatok átlagos eljutási idejét mutatják, beleértve a szükséges átszállási időket (pl. Szentlőrinc, Sásd, Mohács csomópontokban).
        <br/><br/>
        *Nem érhető el: A menetidő meghaladja a 3 órát, vagy nincs megfelelő közösségi közlekedés a vizsgált idősávban.
      </div>
    </div>
  );
};
