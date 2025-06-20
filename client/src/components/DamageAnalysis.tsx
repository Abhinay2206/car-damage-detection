import React from 'react';
import { AlertTriangle, Info, MapPin } from 'lucide-react';

interface DamageItem {
  id: string;
  part: string;
  severity: 'Minor' | 'Moderate' | 'Severe';
  damageType: 'Scratch' | 'Dent' | 'Break' | 'Other';
  location: { x: number; y: number };
  description: string;
}

interface DamageAnalysisProps {
  imageUrl: string;
  damages: DamageItem[];
}

export default function DamageAnalysis({ imageUrl, damages }: DamageAnalysisProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Minor': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'Moderate': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'Severe': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getDamageTypeIcon = (type: string) => {
    switch (type) {
      case 'Break': return <AlertTriangle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Damage Analysis</h3>
        <p className="text-gray-600">Identified damage areas and severity assessment</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 p-6">
        {/* Image with damage markers */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Damage Location</h4>
          <div className="relative">
            <img
              src={imageUrl}
              alt="Car damage analysis"
              className="w-full rounded-lg shadow-md"
            />
            {damages.map((damage) => (
              <div
                key={damage.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${damage.location.x}%`,
                  top: `${damage.location.y}%`,
                }}
              >
                <div className="relative">
                  <div className="w-6 h-6 bg-red-500 border-2 border-white rounded-full shadow-lg animate-pulse"></div>
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-600 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>Red markers indicate identified damage areas</span>
          </div>
        </div>

        {/* Damage details */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Damage Details</h4>
          <div className="space-y-3">
            {damages.map((damage) => (
              <div key={damage.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-gray-900">{damage.part}</h5>
                    <p className="text-sm text-gray-600 mt-1">{damage.description}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(damage.severity)}`}>
                    {damage.severity}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    {getDamageTypeIcon(damage.damageType)}
                    <span>{damage.damageType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {damages.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No damage detected in the uploaded image.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}