import { useEffect, useMemo, useState } from 'react';

import { mockShipments, tempSeries } from '@/data/mock-logistics';
import type { Shipment, ShipmentStatus, TemperatureMode, TemperaturePoint } from '@/types/logistics';

export type Invoice = {
  baseFee: number;
  distanceFee: number;
  handlingFee: number;
  vat: number;
  total: number;
};

export type NotificationItem = {
  id: string;
  message: string;
  at: string;
};

const statusFlow: ShipmentStatus[] = ['pending', 'pickup', 'in-transit', 'out-for-delivery', 'delivered'];
let notificationCounter = 0;

function formatNow() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function randomTemp(base: number) {
  return Number((base + (Math.random() * 1.2 - 0.6)).toFixed(1));
}

function nextStatus(current: ShipmentStatus): ShipmentStatus {
  if (current === 'delayed') return 'in-transit';
  const idx = statusFlow.indexOf(current);
  if (idx < 0 || idx === statusFlow.length - 1) return current;
  return statusFlow[idx + 1];
}

function statusColor(status: ShipmentStatus) {
  switch (status) {
    case 'pending':
      return '#f59e0b';
    case 'in-transit':
    case 'out-for-delivery':
      return '#1fa2ff';
    case 'delivered':
      return '#10b981';
    case 'delayed':
      return '#ef4444';
    default:
      return '#f59e0b';
  }
}

function inRange(mode: TemperatureMode | undefined, temp: number) {
  if (mode === 'frozen') return temp <= -16;
  if (mode === 'chilled') return temp >= 2 && temp <= 8;
  return temp >= 10 && temp <= 26;
}

function buildInvoice(weightKg: number, temperatureMode: TemperatureMode | undefined) {
  const baseFee = 84;
  const distanceFee = Number((weightKg * 0.28).toFixed(2));
  const handlingFee = temperatureMode === 'frozen' ? 55 : temperatureMode === 'chilled' ? 35 : 12;
  const subtotal = baseFee + distanceFee + handlingFee;
  const vat = Number((subtotal * 0.075).toFixed(2));
  const total = Number((subtotal + vat).toFixed(2));
  return { baseFee, distanceFee, handlingFee, vat, total };
}

export function useRealtimeLogistics() {
  const [shipments, setShipments] = useState<Shipment[]>(() =>
    mockShipments.map((item, index) => ({ ...item, status: index === 0 ? 'pickup' : item.status }))
  );
  const [temperature, setTemperature] = useState<number>(4.6);
  const [history, setHistory] = useState<TemperaturePoint[]>(tempSeries);
  const [progress, setProgress] = useState(0.1);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 'n0', message: 'Shipment DSL-2026-001 picked up by driver.', at: formatNow() },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        const next = old + 0.04;
        return next > 1 ? 0.05 : next;
      });

      setTemperature((old) => {
        const next = randomTemp(old <= 0 ? 4.6 : old);
        setHistory((curr) => [...curr.slice(-11), { label: formatNow(), value: next }]);
        return next;
      });

      setShipments((current) => {
        if (!current.length) return current;

        const next = [...current];
        const first = next[0];
        const randomDelay = Math.random() > 0.87;
        const updatedStatus = randomDelay ? 'delayed' : nextStatus(first.status);
        next[0] = {
          ...first,
          status: updatedStatus,
          compliance: updatedStatus === 'delayed' ? Math.max(83, first.compliance - 1) : Math.min(100, first.compliance + 0.3),
        };

        setNotifications((items) => [
          {
            id: `n-${Date.now()}-${notificationCounter++}`,
            message: `Shipment ${first.id} is now ${updatedStatus.replace(/-/g, ' ')}.`,
            at: formatNow(),
          },
          ...items.slice(0, 5),
        ]);

        return next;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const kpis = useMemo(() => {
    const active = shipments.filter((item) => item.status !== 'delivered').length;
    const inTransit = shipments.filter((item) => item.status === 'in-transit' || item.status === 'out-for-delivery').length;
    const delivered = shipments.filter((item) => item.status === 'delivered').length;
    const alerts = shipments.filter((item) => item.status === 'delayed').length;

    return { active, inTransit, delivered, alerts };
  }, [shipments]);

  const focusedShipment = shipments[0];
  const complianceOk = inRange(focusedShipment?.temperatureMode, temperature);
  const invoice: Invoice = buildInvoice(focusedShipment?.weightKg ?? 280, focusedShipment?.temperatureMode);

  return {
    shipments,
    setShipments,
    temperature,
    history,
    progress,
    notifications,
    kpis,
    focusedShipment,
    complianceOk,
    invoice,
    statusColor,
  };
}
