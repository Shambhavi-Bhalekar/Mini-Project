import React from 'react';
import Button1 from '@/components/ui/Button1';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ensure Your Medication Safety?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Join thousands of users who trust MediMitra to detect potential medication risks before they become problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button1
              variant="secondary"
              size="lg"
            >
              Start Free Trial
            </Button1>
            <Button1
              variant="outline"
              size="lg"
            >
              Request Demo
            </Button1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;