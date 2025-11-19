import React from 'react';
import { TransportStatus } from '../types';
import { getStatusColor } from '../services/transportService';

export const Legend: React.FC = () => {
  const items = [
    { label: '< 45 perc (Kiváló)', status: TransportStatus.Excellent },
    { label: '45 - 90 perc (Jó)', status: TransportStatus.Good },
    { label: '90 - 120 perc (Közepes)', status: TransportStatus.Average },
    { label: '> 120 perc (Lassú)', status: TransportStatus.Poor },
    { label: 'Nem elérhető (7-10 óra)', status: TransportStatus.Unreachable },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200 text-slate-800 max-w-xs">
      <h4 className="font-bold text-sm mb-2">Jelmagyarázat (Pécsig)</h4>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-center">
            <span
              className="w-4 h-4 rounded-full mr-2 flex-shrink-0"
              style={{ backgroundColor: getStatusColor(item.status) }}
            />
            <span className="text-xs">{item.label}</span>
          </div>
        ))}
        <div className="flex items-center mt-2 pt-2 border-t">
            <span className="w-4 h-4 rounded-full mr-2 bg-blue-500 flex-shrink-0"></span>
            <span className="text-xs font-bold">Pécs (Célállomás)</span>
        </div>
      </div>
    </div>
  );
};