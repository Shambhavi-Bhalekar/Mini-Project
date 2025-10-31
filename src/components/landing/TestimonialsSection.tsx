import React from 'react';
import TestimonialCard from '@/components/ui/TestimonialCard';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'John Doe',
      role: 'Patient, 65',
      initials: 'JD',
      testimonial: '"MediMitra caught a potentially dangerous interaction between my blood pressure medication and a new antibiotic. My doctor confirmed it and prescribed an alternative. This app likely prevented a serious health issue."',
      rating: 5
    },
    {
      name: 'Jane Smith',
      role: 'Caregiver',
      initials: 'JS',
      testimonial: '"Taking care of my elderly mother with multiple medications was overwhelming until I found MediMitra. Now I can quickly verify her complex prescription regimen and feel confident I\'m keeping her safe."',
      rating: 5
    },
    {
      name: 'Dr. Robert Lee',
      role: 'Physician',
      initials: 'RL',
      testimonial: '"I recommend MediMitra to all my patients, especially those on multiple medications. It gives them an extra layer of safety and helps them be more informed about their treatment plan."',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-600">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join thousands of satisfied users who trust MediMitra for their medication safety
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              initials={testimonial.initials}
              testimonial={testimonial.testimonial}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;