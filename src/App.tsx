import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Hero } from './components/Hero';
import { LogoGrid } from './components/logogrid';
import { Benefits } from './components/Benefits';
import { Features } from './components/Features';
import { ContactForm } from './components/ContactForm';
import { Toaster } from './components/ui/sonner';
import logoSymbol from './assets/31f930a355888a6b2f87c26a540ce31ce4ef9940.png';

export default function App() {
  const [currentView, setCurrentView] = useState<'overview' | 'features'>('overview');

  return (
    <div className="min-h-screen bg-white">
      <Toaster />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('overview')}>
              <img 
                src={logoSymbol} 
                alt="Paloma Logo" 
                className="h-8 w-auto"
              />
              <span className="text-2xl tracking-tight text-[#1A1A1A]">
                Paloma
              </span>
            </div>

            {/* Center Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-[#1A1A1A] rounded-full px-2 py-2">
              <button 
                className={`px-6 py-2 rounded-full text-sm uppercase tracking-wide transition-colors ${
                  currentView === 'overview' 
                    ? 'bg-white text-[#1A1A1A]' 
                    : 'text-white/60 hover:text-white'
                }`}
                onClick={() => setCurrentView('overview')}
              >
                Overview
              </button>
              <button 
                className={`px-6 py-2 rounded-full text-sm uppercase tracking-wide transition-colors ${
                  currentView === 'features' 
                    ? 'bg-white text-[#1A1A1A]' 
                    : 'text-white/60 hover:text-white'
                }`}
                onClick={() => setCurrentView('features')}
              >
                Features
              </button>
            </nav>

            {/* CTA Button */}
            <Button 
              className="bg-[#F0FF00] hover:bg-[#F0FF00]/90 text-[#1A1A1A] rounded-full px-8 h-12 uppercase tracking-wide shadow-md hover:shadow-lg transition-all"
              onClick={() => {
                setCurrentView('overview');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Conditional Content */}
      {currentView === 'overview' ? (
        <>
          {/* Hero Section */}
          <Hero />

          {/* Logo Grid */}
          <LogoGrid />

          {/* Benefits */}
          <Benefits />

          {/* Contact Form */}
          <ContactForm />
        </>
      ) : (
        <>
          {/* Features Page */}
          <Features />

          {/* Contact Form */}
          <ContactForm />
        </>
      )}

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex items-center">
              <img src={logoSymbol} alt="Paloma" className="h-10 w-auto brightness-0 invert" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-sm uppercase tracking-wide">
              <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm">
              © 2025 Paloma. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
