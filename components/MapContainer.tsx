import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import { SETTLEMENTS, PECS_COORDINATES } from '../constants';
import { calculateTransportData } from '../services/transportService';
import { SettlementWithData } from '../types';
import { SettlementMarker } from './SettlementMarker';

interface Props {
  onDataLoaded: (data: SettlementWithData[]) => void;
}

export const TransitMap: React.FC<Props> = ({ onDataLoaded }) => {
  const [data, setData] = useState<SettlementWithData[]>([]);

  useEffect(() => {
    const processed = SETTLEMENTS.map(s => ({
      ...s,
      ...calculateTransportData(s)
    }));
    setData(processed);
    onDataLoaded(processed);
  }, [onDataLoaded]);

  return (
    <MapContainer
      center={[PECS_COORDINATES.lat, PECS_COORDINATES.lng]}
      zoom={9}
      scrollWheelZoom={true}
      className="w-full h-full rounded-lg z-0"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <ZoomControl position="bottomright" />

      {data.map((settlement) => (
        <SettlementMarker key={settlement.name} data={settlement} />
      ))}
    </MapContainer>
  );
};