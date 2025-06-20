import React from 'react';
import { DollarSign, Wrench, Package, Clock, TrendingUp } from 'lucide-react';
import { useCurrency } from '../contexts/useCurrency';

interface CostItem {
  part: string;
  laborCost: number;
  partsCost: number;
  total: number;
  estimatedHours: number;
}

interface CostEstimationProps {
  costBreakdown: CostItem[];
  totalRange: { min: number; max: number };
}

export default function CostEstimation({ costBreakdown, totalRange }: CostEstimationProps) {
  const totalLabor = costBreakdown.reduce((sum, item) => sum + item.laborCost, 0);
  const totalParts = costBreakdown.reduce((sum, item) => sum + item.partsCost, 0);
  const totalHours = costBreakdown.reduce((sum, item) => sum + item.estimatedHours, 0);
  
  const { formatCurrency } = useCurrency();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Cost Estimation</h3>
        <p className="text-gray-600">Detailed breakdown of estimated repair costs</p>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wrench className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Labor Cost</p>
                <p className="text-lg font-semibold text-blue-900">{formatCurrency(totalLabor)}</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600 font-medium">Parts Cost</p>
                <p className="text-lg font-semibold text-green-900">{formatCurrency(totalParts)}</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Est. Hours</p>
                <p className="text-lg font-semibold text-orange-900">{totalHours}h</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-600 font-medium">Total Range</p>
                <p className="text-sm font-semibold text-purple-900">
                  {formatCurrency(totalRange.min)} - {formatCurrency(totalRange.max)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Itemized Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Damaged Part</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Labor</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Parts</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Hours</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {costBreakdown.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.part}</td>
                    <td className="py-3 px-4 text-right text-gray-700">{formatCurrency(item.laborCost)}</td>
                    <td className="py-3 px-4 text-right text-gray-700">{formatCurrency(item.partsCost)}</td>
                    <td className="py-3 px-4 text-right text-gray-700">{item.estimatedHours}h</td>
                    <td className="py-3 px-4 text-right font-medium text-gray-900">{formatCurrency(item.total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200 bg-gray-50">
                  <td className="py-3 px-4 font-semibold text-gray-900">Total</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">{formatCurrency(totalLabor)}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">{formatCurrency(totalParts)}</td>
                  <td className="py-3 px-4 text-right font-semibold text-gray-900">{totalHours}h</td>
                  <td className="py-3 px-4 text-right font-bold text-gray-900">{formatCurrency(totalLabor + totalParts)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Cost Range Explanation */}
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-gray-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-gray-900 mb-1">Cost Range Explanation</h5>
              <p className="text-sm text-gray-600">
                The estimated cost range accounts for variations in labor rates, parts availability, 
                and potential additional damage discovered during repair. The lower estimate assumes 
                optimal conditions, while the higher estimate includes potential complications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}