import React from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  initials: string;
  testimonial: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  initials,
  testimonial,
  rating = 5
}) => {
  const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
      {/* User Info */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center mr-4">
          <span className="text-blue-700 font-bold">{initials}</span>
        </div>
        <div>
          <h4 className="font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      
      {/* Testimonial Text */}
      <p className="text-gray-700 mb-4">
        {testimonial}
      </p>
      
      {/* Star Rating */}
      <div className="flex">
        {[...Array(rating)].map((_, i) => (
          <StarIcon key={i} />
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;