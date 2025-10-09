import React from 'react';

export function LogoGrid() {
  const integrations = [
    { name: 'OpenAI', category: 'GPT-4 • GPT-3.5', hoverColor: '#00D4FF' },
    { name: 'Anthropic', category: 'Claude', hoverColor: '#FF006E' },
    { name: 'Google', category: 'Gemini', hoverColor: '#FF6B35' },
    { name: 'Meta', category: 'Llama', hoverColor: '#00FF88' },
    { name: 'Mistral', category: 'Mistral AI', hoverColor: '#9D4EDD' },
    { name: 'Cohere', category: 'Command', hoverColor: '#F0FF00' },
    { name: 'xAI', category: 'Grok', hoverColor: '#00FFF0' },
    { name: 'Perplexity', category: 'Sonar', hoverColor: '#FF3366' },
    { name: 'Together', category: 'Together AI', hoverColor: '#CCFF00' },
  ];

  return (
    <section id="integrations" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-[60px] md:text-[80px] leading-[0.9] tracking-tight text-[#1A1A1A] uppercase mb-16 text-center">
          YOUR SHORTCUT TO
          <br />
          AI INNOVATION
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="aspect-[4/3] rounded-2xl flex flex-col items-start justify-between p-8 text-white transition-all duration-300 hover:scale-105 bg-[#1A1A1A] cursor-pointer group"
              style={{
                ['--hover-color' as string]: integration.hoverColor,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = integration.hoverColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1A1A1A';
              }}
            >
              <div className="text-2xl opacity-80 uppercase tracking-wide">
                {integration.name}
              </div>
              <div className="text-sm opacity-60 uppercase tracking-wider">
                {integration.category}
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-[#1A1A1A]/40 mt-12 text-sm uppercase tracking-wide">
          Replace placeholders with actual partner logos (PNG files)
        </p>
      </div>
    </section>
  );
}
