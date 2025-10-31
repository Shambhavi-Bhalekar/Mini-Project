"use client";
import React from 'react';
import Head from 'next/head';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../../styles/globals.css';
import '../../styles/patient.css';


// Section Components
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import TeamSection from '@/components/landing/TeamSection';

export default function LandingPage() {
  return (
    <div className="app-container">
      <Head>
        <title>MediMitra - Smart Medicine Analysis</title>
        <meta 
          name="description" 
          content="AI-powered medical prescription analysis for safer medication management" 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Fixed Navigation Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section - Main CTA with animated elements */}
        <HeroSection />

        {/* Features Section - Core product features */}
        <FeaturesSection />

        {/* How It Works Section - Process explanation */}
        <HowItWorksSection />

        {/* Testimonials Section - User reviews */}
        <TestimonialsSection />

        {/* Call-to-Action Section - Final conversion */}
        <CTASection />

        {/* Team Section - Meet the creators */}
        <TeamSection />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}