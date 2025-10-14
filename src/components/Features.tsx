import React from 'react';
import { Badge } from './ui/badge';
import { Check } from 'lucide-react';

export function Features() {
  const features = [
    { name: 'Smart Caching', status: 'Beta', description: 'Reduce costs with intelligent response caching' },
    { name: 'Load Balancing', status: 'Live', description: 'Automatic distribution across providers for optimal performance' },
    { name: 'Failover Protection', status: 'Live', description: 'Seamless switching when primary models are unavailable' },
    { name: 'Usage Analytics', status: 'Live', description: 'Detailed insights into model performance and costs' },
    { name: 'Custom Rate Limits', status: 'Live', description: 'Set spending caps and request limits per model' },
    { name: 'Multi-Region Support', status: 'Coming Soon', description: 'Deploy across global regions for lower latency' },
    { name: 'A/B Testing', status: 'Coming Soon', description: 'Compare model outputs side-by-side' },
    { name: 'Webhook Integration', status: 'Coming Soon', description: 'Real-time notifications for events and completions' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-[#00FF88] text-[#1A1A1A]';
      case 'Beta':
        return 'bg-[#F0FF00] text-[#1A1A1A]';
      case 'Coming Soon':
        return 'bg-[#1A1A1A] text-white border border-white/20';
      case 'In Progress':
        return 'bg-[#00D4FF] text-[#1A1A1A]';
      default:
        return 'bg-[#1A1A1A] text-white';
    }
  };

  return (
    <section className="py-24 bg-[#F5F5F5] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-[60px] md:text-[80px] leading-[0.9] tracking-tight text-[#1A1A1A] uppercase mb-6">
              FEATURES &
              <br />
              ROADMAP
            </h1>
            <p className="text-xl text-[#1A1A1A]/70 max-w-2xl">
              Everything you need to build, scale, and optimize your AI applications. 
              Track our progress as we continue to ship new capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl text-[#1A1A1A] uppercase tracking-tight">
                    {feature.name}
                  </h3>
                  <Badge 
                    className={`${getStatusColor(feature.status)} uppercase tracking-wide text-xs px-3 py-1 rounded-full`}
                  >
                    {feature.status}
                  </Badge>
                </div>
                <p className="text-[#1A1A1A]/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[#1A1A1A] rounded-2xl p-12 text-white">
            <h3 className="text-3xl uppercase tracking-tight mb-6">
              Request a Feature
            </h3>
            <p className="text-white/70 mb-6 max-w-2xl">
              Have a specific requirement? We're always listening to our users. 
              Reach out and let us know what would make Paloma more powerful for you.
            </p>
            <button 
              className="bg-[#F0FF00] hover:bg-[#F0FF00]/90 text-[#1A1A1A] px-8 py-3 rounded-full uppercase tracking-wide transition-all"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
