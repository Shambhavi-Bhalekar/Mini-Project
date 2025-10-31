import React from 'react';
import TeamMemberCard from '@/components/ui/TeamMemberCard';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Aran Angadi',
      role: 'Machine Learning Engineer',
      description: 'Expert in medical NLP and computer vision algorithms.',
      initial: 'A',
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Mayank Chauhan',
      role: 'Backend Developer',
      description: 'Specializes in secure healthcare data infrastructure.',
      initial: 'M',
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Jovan Fernandes',
      role: 'Frontend Developer',
      description: 'Creates intuitive and accessible user interfaces.',
      initial: 'J',
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Shambhavi Bhalekar',
      role: 'Medical AI Researcher',
      description: 'Ensures medical accuracy and healthcare compliance.',
      initial: 'S',
      socialLinks: {
        twitter: '#',
        linkedin: '#',
        github: '#'
      }
    }
  ];

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            Our Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 text-gray-600">
            The Creators Behind MediMitra
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Meet Neural Nexus, the brilliant minds dedicated to making medication safer for everyone
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              role={member.role}
              description={member.description}
              initial={member.initial}
              socialLinks={member.socialLinks}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;