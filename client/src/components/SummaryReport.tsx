import React from 'react';
import { FileText, Download, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useCurrency } from '../contexts/useCurrency';

interface SummaryReportProps {
  damageDescription: string;
  recommendedActions: string[];
  timeline: string;
  totalCost: { min: number; max: number };
  onDownloadReport: () => void;
}

export default function SummaryReport({ 
  damageDescription, 
  recommendedActions, 
  timeline, 
  totalCost,
  onDownloadReport 
}: SummaryReportProps) {
  const { formatCurrency } = useCurrency();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Assessment Summary</h3>
            <p className="text-gray-600">Complete damage assessment and repair recommendations</p>
          </div>
          <button
            onClick={onDownloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF Report
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Damage Overview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-600" />
            <h4 className="font-medium text-gray-900">Damage Overview</h4>
          </div>
          <div className="pl-7">
            <p className="text-gray-700 leading-relaxed">{damageDescription}</p>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-medium text-gray-900">Recommended Actions</h4>
          </div>
          <div className="pl-7">
            <ul className="space-y-2">
              {recommendedActions.map((action, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Repair Timeline */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-gray-900">Estimated Timeline</h4>
          </div>
          <div className="pl-7">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-700 font-medium">{timeline}</span>
            </div>
          </div>
        </div>

        {/* Cost Summary */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            <h4 className="font-medium text-gray-900">Cost Summary</h4>
          </div>
          <div className="pl-7">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Estimated Total Cost:</span>
                <span className="text-lg font-semibold text-gray-900">
                  {formatCurrency(totalCost.min)} - {formatCurrency(totalCost.max)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-900 mb-2">Important Notes</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• This assessment is based on visual analysis and may not detect all damage</li>
                <li>• Final costs may vary depending on actual repair complexity and local labor rates</li>
                <li>• We recommend getting quotes from certified repair shops for accurate pricing</li>
                <li>• Additional damage may be discovered during the repair process</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}