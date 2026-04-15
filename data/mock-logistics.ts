import type {
  FleetAsset,
  OperationalMetric,
  Shipment,
  TemperaturePoint,
  VehicleMapPoint,
} from '@/types/logistics';

export const internalAdminCredentials = {
  email: 'ops.admin@dualstreamlogistics.com',
  password: 'DSL-Internal-2026',
};

export const mockShipments: Shipment[] = [
  {
    id: 'DSL-2026-001',
    product: 'Pharmaceutical Vaccines',
    productClass: 'Pharma',
    temperatureRange: '2-8 C',
    vehicle: 'TRK-001',
    driver: 'John Adebayo',
    packageType: 'Vaccines',
    pickupLocation: 'Lagos Pharma Hub',
    deliveryLocation: 'Lekki Medical Center',
    weightKg: 560,
    estimatedDeliveryTime: '16:45',
    temperatureMode: 'chilled',
    pickupConfirmed: true,
    status: 'in-transit',
    deliveryConfirmed: false,
    compliance: 98,
    currentTemperatureC: 4.5,
    eta: '16:45',
  },
  {
    id: 'DSL-2026-002',
    product: 'Fresh Produce',
    productClass: 'Agriculture',
    temperatureRange: '4-6 C',
    vehicle: 'VAN-023',
    driver: 'Sarah Okafor',
    packageType: 'Produce Crates',
    pickupLocation: 'Agege Produce Depot',
    deliveryLocation: 'VI Fresh Market',
    weightKg: 320,
    estimatedDeliveryTime: 'Delivered',
    temperatureMode: 'ambient',
    pickupConfirmed: true,
    status: 'delivered',
    deliveryConfirmed: true,
    compliance: 100,
    currentTemperatureC: 5,
    eta: 'Delivered',
  },
  {
    id: 'DSL-2026-003',
    product: 'Blood Products',
    productClass: 'Pharma',
    temperatureRange: '2-6 C',
    vehicle: 'TRK-012',
    driver: 'Michael Eze',
    packageType: 'Bio Medical Pack',
    pickupLocation: 'Yaba Blood Bank',
    deliveryLocation: 'Island Health Center',
    weightKg: 250,
    estimatedDeliveryTime: '17:30',
    temperatureMode: 'chilled',
    pickupConfirmed: true,
    status: 'pickup',
    deliveryConfirmed: false,
    compliance: 95,
    currentTemperatureC: 6,
    eta: '17:30',
  },
  {
    id: 'DSL-2026-004',
    product: 'Frozen Seafood',
    productClass: 'Perishable',
    temperatureRange: '-18 C',
    vehicle: 'TRK-008',
    driver: 'Grace Nwankwo',
    packageType: 'Seafood',
    pickupLocation: 'Port Cold Store',
    deliveryLocation: 'Ikeja Distribution Node',
    weightKg: 710,
    estimatedDeliveryTime: '18:10',
    temperatureMode: 'frozen',
    pickupConfirmed: true,
    status: 'delayed',
    deliveryConfirmed: false,
    compliance: 99,
    currentTemperatureC: -18.3,
    eta: '18:10',
  },
];

export const tempSeries: TemperaturePoint[] = [
  { label: '00:00', value: 4.2 },
  { label: '04:00', value: 5.1 },
  { label: '08:00', value: 4.3 },
  { label: '12:00', value: 4.7 },
  { label: '16:00', value: 4.5 },
  { label: '20:00', value: 4.4 },
];

export const operationalMetrics: OperationalMetric[] = [
  { label: 'Active Shipments', value: '28', trend: '+6.2% vs yesterday' },
  { label: 'Cold Chain Compliance', value: '98.2%', trend: '+0.7% this week' },
  { label: 'On-time Delivery', value: '94.7%', trend: '+1.9% this week' },
  { label: 'Delay Risk Index', value: '11%', trend: '-2.1% in 24h', risk: 'low' },
  { label: 'Fleet Efficiency Score', value: '91.4', trend: '+0.8 this week' },
  { label: 'Daily Operational Throughput', value: '132 loads', trend: '+10 loads today' },
];

export const complianceAlerts = [
  'VAN-023 maintained thermal stability for 12 hours.',
  'TRK-012 approached upper threshold at 13:40; corrective cooling applied.',
  'TRK-008 route deviation of 4 minutes recorded with no compliance breach.',
];

export const fleetAssets: FleetAsset[] = [
  { id: 'TRK-001', type: 'truck', utilization: 86, maintenance: 'good', driver: 'John Adebayo', state: 'in-transit' },
  { id: 'TRK-012', type: 'truck', utilization: 78, maintenance: 'due-soon', driver: 'Michael Eze', state: 'loading' },
  { id: 'VAN-023', type: 'van', utilization: 92, maintenance: 'good', driver: 'Sarah Okafor', state: 'in-transit' },
  { id: 'MOTO-002', type: 'motorcycle', utilization: 67, maintenance: 'good', driver: 'Isaac Bello', state: 'idle' },
  { id: 'TRI-011', type: 'tricycle', utilization: 58, maintenance: 'required', driver: 'Ngozi Umeh', state: 'service' },
];

export const mapPoints: VehicleMapPoint[] = [
  { id: 'TRK-001', label: 'Lagos Hub', status: 'in-transit', xPercent: 18, yPercent: 54, eta: 'ETA 16:45' },
  { id: 'TRK-012', label: 'Ibadan Route', status: 'pickup', xPercent: 46, yPercent: 62, eta: 'ETA 17:30' },
  { id: 'VAN-023', label: 'Abuja Corridor', status: 'delivered', xPercent: 72, yPercent: 36, eta: 'Delivered' },
  { id: 'TRK-008', label: 'Port Axis', status: 'in-transit', xPercent: 84, yPercent: 70, eta: 'ETA 18:10' },
];
