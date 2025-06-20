import { useState } from 'react';

interface DamageItem {
  id: string;
  part: string;
  severity: 'Minor' | 'Moderate' | 'Severe';
  damageType: 'Scratch' | 'Dent' | 'Break' | 'Other';
  location: { x: number; y: number };
  description: string;
}

interface CostItem {
  part: string;
  laborCost: number;
  partsCost: number;
  total: number;
  estimatedHours: number;
}

export function useDamageAssessment() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Mock data for demonstration
  const mockDamages: DamageItem[] = [
    {
      id: '1',
      part: 'Front Bumper',
      severity: 'Moderate',
      damageType: 'Scratch',
      location: { x: 45, y: 60 },
      description: 'Deep scratch along the front bumper with minor paint damage'
    },
    {
      id: '2',
      part: 'Driver Side Door',
      severity: 'Minor',
      damageType: 'Dent',
      location: { x: 25, y: 45 },
      description: 'Small dent on the driver side door panel'
    },
    {
      id: '3',
      part: 'Side Mirror',
      severity: 'Severe',
      damageType: 'Break',
      location: { x: 15, y: 35 },
      description: 'Cracked mirror housing requiring full replacement'
    }
  ];

  const mockCostBreakdown: CostItem[] = [
    {
      part: 'Front Bumper',
      laborCost: 450,
      partsCost: 280,
      total: 730,
      estimatedHours: 3.5
    },
    {
      part: 'Driver Side Door',
      laborCost: 200,
      partsCost: 0,
      total: 200,
      estimatedHours: 1.5
    },
    {
      part: 'Side Mirror',
      laborCost: 120,
      partsCost: 180,
      total: 300,
      estimatedHours: 1
    }
  ];

  const processImage = async (file: File, preview: string) => {
    setIsProcessing(true);
    setCurrentStep(1);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000));

    setCurrentStep(2);
    setIsProcessing(false);

    return {
      damages: mockDamages,
      costBreakdown: mockCostBreakdown,
      totalRange: { min: 1150, max: 1450 },
      damageDescription: 'The vehicle shows moderate damage to the front bumper with deep scratches, a minor dent on the driver side door, and a severely damaged side mirror requiring replacement. The damage appears to be consistent with a side-impact or scraping incident.',
      recommendedActions: [
        'Professional paint repair and buffing for front bumper scratches',
        'Paintless dent repair (PDR) for driver side door dent',
        'Complete replacement of damaged side mirror assembly',
        'Touch-up paint application where needed',
        'Final inspection and quality check'
      ],
      timeline: '2-3 business days'
    };
  };

  const reset = () => {
    setCurrentStep(0);
    setIsProcessing(false);
  };

  return {
    isProcessing,
    currentStep,
    processImage,
    reset
  };
}