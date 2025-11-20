import React from 'react';
import TeamMemberCard from '@/components/ui/TeamMemberCard';

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Shambhavi Bhalekar',
      role: 'Backend & Integration Engineer',
      description: 'Handled backend development, system integration, and end‑to‑end workflow management.',
      initial: 'S',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/shambhavi-bhalekar-73597b306/',
        github: 'http://github.com/shambhavi-bhalekar'
      }
    },
    {
      name: 'Amruta Johare',
      role: 'Frontend Developer & Model Builder',
      description: 'Developed the frontend and contributed to model building processes.',
      initial: 'A',
      socialLinks: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Preksha Salvi',
      role: 'System Architect & Model Builder',
      description: 'Handled architecture design and contributed to building the machine learning models.',
      initial: 'P',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/in/preksha-salvi-87871728b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        github: 'https://github.com/preksah'
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
