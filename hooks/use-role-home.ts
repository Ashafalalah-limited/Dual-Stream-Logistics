import type { Href } from 'expo-router';

import type { UserRole } from '@/types/logistics';

export function getHomePath(role: UserRole): Href {
  if (role === 'admin') {
    return '/(admin)/operations';
  }

  if (role === 'driver') {
    return '/(driver)/dashboard';
  }

  return '/(customer)/dashboard';
}
