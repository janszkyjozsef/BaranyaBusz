export interface Settlement {
  name: string;
  lat: number;
  lng: number;
}

export interface TransportData {
  travelTimeMinutes: number; // Minutes to reach Pécs
  transfers: number; // Number of transfers
  isReachable: boolean; // Is it reachable between 7-10 AM?
  distanceKm: number; // Straight line distance (approx)
}

export interface SettlementWithData extends Settlement, TransportData {}

export enum TransportStatus {
  Excellent = 'EXCELLENT', // < 45 min
  Good = 'GOOD', // < 90 min
  Average = 'AVERAGE', // < 120 min
  Poor = 'POOR', // > 120 min
  Unreachable = 'UNREACHABLE'
}