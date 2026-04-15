import { useIndustry } from '@/providers/industry-provider';

export function useIndustrySelection() {
  return useIndustry();
}
