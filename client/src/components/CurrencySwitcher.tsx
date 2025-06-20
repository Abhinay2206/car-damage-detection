import { DollarSign, IndianRupee } from 'lucide-react';
import { useCurrency } from '../contexts/useCurrency';

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  const toggleCurrency = () => {
    setCurrency(currency === 'USD' ? 'INR' : 'USD');
  };

  return (
    <button
      onClick={toggleCurrency}
      className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      title={`Switch to ${currency === 'USD' ? 'Indian Rupees' : 'US Dollars'}`}
    >
      {currency === 'USD' ? (
        <>
          <DollarSign className="w-4 h-4 text-green-600" />
          <span>USD</span>
        </>
      ) : (
        <>
          <IndianRupee className="w-4 h-4 text-orange-600" />
          <span>INR</span>
        </>
      )}
    </button>
  );
}
