import React, { createContext, useState, ReactNode } from 'react';
import { CurrencyCode, EXCHANGE_RATES } from '../utils/CurrencyUtils';

export interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatCurrency: (amount: number) => string;
  convertAmount: (amount: number) => number;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('USD');

  const formatCurrency = (amount: number): string => {
    const convertedAmount = convertAmount(amount);
    
    return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'en-IN', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(convertedAmount);
  };

  const convertAmount = (amount: number): number => {
    return amount * EXCHANGE_RATES[currency];
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency, convertAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
};
