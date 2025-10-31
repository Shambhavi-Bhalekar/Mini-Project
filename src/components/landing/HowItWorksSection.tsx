import React from 'react';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Upload Your Prescription',
      description: 'Take a photo of your prescription or medication label using your phone, or upload a digital copy.'
    },
    {
      number: 2,
      title: 'AI Analysis',
      description: 'Our AI instantly extracts all medication information and cross-references with comprehensive medical databases.'
    },
    {
      number: 3,
      title: 'Risk Assessment',
      description: 'Receive immediate alerts about potential medication interactions, dosage issues, or allergy concerns.'
    },
    {
      number: 4,
      title: 'Health Management',
      description: 'Get personalized recommendations and safely store your medication history for future reference.'
    }
  ];

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <section id="how-it-works" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-600">
            How MediMitra Works
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our advanced AI system makes medication safety simple and seamless
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Steps Column */}
          <div className="w-full md:w-1/2 space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                    {step.number}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-blue-900">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual/Animation Column */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckIcon />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">Medication Verified</h3>
                  <p className="text-gray-700 mb-8">
                    Your prescription has been analyzed and found to be safe for your profile.
                  </p>
                  <div className="w-full bg-gray-100 h-3 rounded-full mb-1">
                    <div 
                      className="bg-green-500 h-3 rounded-full animate-pulse" 
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">Analysis complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;