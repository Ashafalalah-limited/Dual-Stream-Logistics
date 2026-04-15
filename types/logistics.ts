export type UserRole = 'admin' | 'customer' | 'driver';

export type ShipmentStatus = 'pending' | 'pickup' | 'in-transit' | 'out-for-delivery' | 'delivered' | 'delayed';
export type FleetState = 'idle' | 'loading' | 'in-transit' | 'service';
export type TemperatureMode = 'ambient' | 'chilled' | 'frozen';

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Shipment {
  id: string;
  product: string;
  productClass: string;
  packageType?: string;
  pickupLocation?: string;
  deliveryLocation?: string;
  weightKg?: number;
  estimatedDeliveryTime?: string;
  temperatureMode?: TemperatureMode;
  temperatureRange: string;
  vehicle: string;
  driver: string;
  pickupConfirmed: boolean;
  status: ShipmentStatus;
  deliveryConfirmed: boolean;
  compliance: number;
  currentTemperatureC: number;
  eta: string;
}

export interface TemperaturePoint {
  label: string;
  value: number;
}

export interface FleetAsset {
  id: string;
  type: 'truck' | 'van' | 'motorcycle' | 'tricycle';
  utilization: number;
  maintenance: 'good' | 'due-soon' | 'required';
  driver: string;
  state: FleetState;
}

export interface VehicleMapPoint {
  id: string;
  label: string;
  status: ShipmentStatus;
  xPercent: number;
  yPercent: number;
  eta: string;
}

export interface OperationalMetric {
  label: string;
  value: string;
  trend: string;
  risk?: 'low' | 'moderate' | 'high';
}
