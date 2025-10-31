'use client';
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Button1 from '@/components/ui/Button1';

const HeroSection: React.FC = () => {
  useEffect(() => {
    // GSAP animations - same as original
    gsap.fromTo(
      '.hero-title',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    );
    gsap.fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.4 }
    );
    gsap.fromTo(
      '.cta-button',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.6 }
    );
    gsap.fromTo(
      '.hero-image',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.8 }
    );
  }, []);

  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );

  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <section className="hero bg-gradient-to-br from-blue-50 to-blue-100 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 leading-tight mb-6">
              Your Personal Medication Safety Assistant
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
              Meet your digital doctor. We analyze your prescriptions instantly to detect potential drug interactions, allergic risks, and dosage errors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button1
                variant="primary"
                size="lg"
                className="cta-button"
                icon={<ArrowIcon />}
              >
                Get Started Free
              </Button1>
              <Button1
                variant="secondary"
                size="lg"
                className="z-50"
              >
                Watch Demo
              </Button1>
            </div>
          </div>

          {/* Right Column - Hero Image/Mockup */}
          <div className="w-full md:w-1/2 hero-image">
            <div className="relative h-[400px] md:h-[500px] mx-auto max-w-lg">
              <div className="absolute inset-0 bg-blue-600 rounded-2xl opacity-10 blur-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl overflow-hidden shadow-2xl">
                <div className="h-full w-full flex items-center justify-center p-6">
                  <div className="bg-white/90 rounded-xl p-6 w-full max-w-sm shadow-lg">
                    {/* Prescription Analysis Mockup */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckIcon />
                      </div>
                      <div>
                        <h3 className="font-bold text-blue-900">Prescription Analysis</h3>
                        <p className="text-sm text-gray-600">Results Ready</p>
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Medication Safety</span>
                        <span className="text-sm font-medium text-green-600">Safe</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="min-w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Dosage Correct</p>
                          <p className="text-xs text-gray-600">Alignment with standard guidelines</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="min-w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Minor Interaction</p>
                          <p className="text-xs text-gray-600">With calcium supplements - Monitor</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="min-w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">No Allergy Risk</p>
                          <p className="text-xs text-gray-600">Based on your medical profile</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;