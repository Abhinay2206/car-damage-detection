import React, { useState } from 'react';
import { Car, RotateCcw } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import DamageAnalysis from './components/DamageAnalysis';
import CostEstimation from './components/CostEstimation';
import SummaryReport from './components/SummaryReport';
import ProgressIndicator from './components/ProgressIndicator';
import { useDamageAssessment } from './hooks/useDamageAssessment';

interface AssessmentData {
  damages: any[];
  costBreakdown: any[];
  totalRange: { min: number; max: number };
  damageDescription: string;
  recommendedActions: string[];
  timeline: string;
}

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [assessmentData, setAssessmentData] = useState<AssessmentData | null>(null);
  const { isProcessing, currentStep, processImage, reset } = useDamageAssessment();

  const steps = ['Upload Image', 'Analyze Damage', 'Cost Estimation', 'Summary Report'];

  const handleImageUploaded = async (file: File, preview: string) => {
    setUploadedImage(preview);
    const data = await processImage(file, preview);
    setAssessmentData(data);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setAssessmentData(null);
    reset();
  };

  const handleDownloadReport = () => {
    // In a real application, this would generate and download a PDF report
    const reportData = {
      timestamp: new Date().toISOString(),
      assessment: assessmentData
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `damage-assessment-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Car Damage Assessment</h1>
                <p className="text-sm text-gray-600">AI-powered damage analysis and cost estimation</p>
              </div>
            </div>
            {(uploadedImage || assessmentData) && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} steps={steps} />

        <div className="space-y-8">
          {/* Step 1: Image Upload */}
          {currentStep === 0 && (
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              onReset={handleReset}
              isProcessing={isProcessing}
            />
          )}

          {/* Step 2: Show uploaded image during processing */}
          {currentStep === 1 && uploadedImage && (
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              onReset={handleReset}
              isProcessing={isProcessing}
            />
          )}

          {/* Step 2-4: Results */}
          {currentStep >= 2 && assessmentData && uploadedImage && (
            <>
              <DamageAnalysis
                imageUrl={uploadedImage}
                damages={assessmentData.damages}
              />

              <CostEstimation
                costBreakdown={assessmentData.costBreakdown}
                totalRange={assessmentData.totalRange}
              />

              <SummaryReport
                damageDescription={assessmentData.damageDescription}
                recommendedActions={assessmentData.recommendedActions}
                timeline={assessmentData.timeline}
                totalCost={assessmentData.totalRange}
                onDownloadReport={handleDownloadReport}
              />
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              This assessment is for estimation purposes only. Please consult with certified repair professionals for accurate quotes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;