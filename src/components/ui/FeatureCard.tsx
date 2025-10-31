import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText?: string;
  onLinkClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  linkText = "Learn more",
  onLinkClick
}) => {
  const ArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
      <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-blue-900">{title}</h3>
      <p className="text-gray-700 mb-4">
        {description}
      </p>
      <button 
        onClick={onLinkClick}
        className="text-blue-600 font-medium flex items-center gap-1 hover:text-blue-700 transition-colors"
      >
        {linkText}
        <ArrowIcon />
      </button>
    </div>
  );
};

export default FeatureCard;