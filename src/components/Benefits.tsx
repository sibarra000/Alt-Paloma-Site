import React from 'react';
import { Zap, Shield, DollarSign } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: Zap,
      title: 'Unified Access',
      description: 'Switch between models instantly. One API key, one interface, unlimited possibilities.',
    },
    {
      icon: Shield,
      title: 'Enterprise Reliability',
      description: 'Built-in failover and load balancing. 99.9% uptime guarantee for your mission-critical apps.',
    },
    {
      icon: DollarSign,
      title: 'Transparent Pricing',
      description: 'Pay only for what you use. Competitive rates with no hidden fees or markup.',
    },
  ];

  return (
    <section className="py-24 bg-[#F5F5F5]">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index}>
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-[#1A1A1A]" strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl mb-4 text-[#1A1A1A] uppercase tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-[#1A1A1A]/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
