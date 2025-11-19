import React from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import { SettlementWithData, TransportStatus } from '../types';
import { getStatusColor, getTransportStatus } from '../services/transportService';

interface Props {
  data: SettlementWithData;
}

export const SettlementMarker: React.FC<Props> = ({ data }) => {
  const status = getTransportStatus(data);
  const color = getStatusColor(status);

  return (
    <CircleMarker
      center={[data.lat, data.lng]}
      radius={data.name === 'Pécs' ? 10 : 6}
      pathOptions={{
        color: data.name === 'Pécs' ? '#3b82f6' : color,
        fillColor: data.name === 'Pécs' ? '#3b82f6' : color,
        fillOpacity: 0.9,
        weight: 1
      }}
    >
      <Popup>
        <div className="p-1 min-w-[160px]">
          <h3 className="font-bold text-lg text-slate-900 mb-1 border-b pb-1">{data.name}</h3>
          {data.name === 'Pécs' ? (
            <p className="text-sm text-slate-600 font-medium">Megyeszékhely (Célállomás)</p>
          ) : (
            <div className="space-y-1.5 text-sm text-slate-700 mt-2">
              
              {!data.isReachable ? (
                <div className="bg-red-100 border border-red-200 text-red-700 p-2 rounded mt-2 text-center">
                  <strong className="block uppercase text-xs">Nem érhető el</strong>
                  <span className="text-xs">7:00 - 10:00 között<br/>(vagy menetidő &gt; 3 óra)</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Menetidő:</span>
                    <span className={`font-bold text-base ${status === TransportStatus.Poor ? 'text-orange-600' : 'text-slate-800'}`}>
                      {data.travelTimeMinutes} perc
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Átszállás:</span>
                    <span className="font-medium">
                      {data.transfers === 0 ? (
                        <span className="text-green-600">Közvetlen</span>
                      ) : (
                        `${data.transfers} db`
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </Popup>
    </CircleMarker>
  );
};
