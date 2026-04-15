import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

export type SupplyChainIndustry = 'pharmaceutical' | 'agriculture';

type IndustryContextValue = {
  industry: SupplyChainIndustry;
  setIndustry: (industry: SupplyChainIndustry) => void;
};

const IndustryContext = createContext<IndustryContextValue | null>(null);

export function IndustryProvider({ children }: PropsWithChildren) {
  const [industry, setIndustry] = useState<SupplyChainIndustry>('pharmaceutical');

  const value = useMemo(
    () => ({
      industry,
      setIndustry,
    }),
    [industry]
  );

  return <IndustryContext.Provider value={value}>{children}</IndustryContext.Provider>;
}

export function useIndustry() {
  const context = useContext(IndustryContext);

  if (!context) {
    throw new Error('useIndustry must be used inside IndustryProvider');
  }

  return context;
}
