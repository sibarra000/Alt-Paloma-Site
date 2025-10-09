import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    description: '',
    monthlySpend: '',
    currentProviders: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name || !formData.email || !formData.company || !formData.description || !formData.monthlySpend || !formData.currentProviders) {
      toast.error('Please fill out all required fields');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-8b6f073b/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Thank you! We\'ll be in touch soon.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          description: '',
          monthlySpend: '',
          currentProviders: '',
          phone: '',
        });
      } else {
        toast.error(data.error || 'Something went wrong. Please try again.');
        console.error('Form submission error:', data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <h2 className="text-[60px] md:text-[80px] leading-[0.9] tracking-tight text-[#1A1A1A] uppercase mb-6">
              LET'S BUILD
              <br />
              TOGETHER
            </h2>
            <p className="text-xl text-[#1A1A1A]/70">
              Tell us about your project and we'll get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-[#1A1A1A] mb-2 block uppercase tracking-wide text-sm">
                  Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-xl border-[#1A1A1A]/20 bg-[#F5F5F5] focus:border-[#1A1A1A] focus:ring-[#1A1A1A] h-14"
                  placeholder="Your name"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-[#1A1A1A] mb-2 block uppercase tracking-wide text-sm">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-xl border-[#1A1A1A]/20 bg-[#F5F5F5] focus:border-[#1A1A1A] focus:ring-[#1A1A1A] h-14"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company" className="text-[#1A1A1A] mb-2 block uppercase tracking-wide text-sm">
                Company Name *
              </Label>
              <Input
                id="company"
                name="company"
                type="text"
                required
                value={formData.company}
                onChange={handleChange}
                className="rounded-xl border-[#1A1A1A]/20 bg-[#F5F5F5] focus:border-[#1A1A1A] focus:ring-[#1A1A1A] h-14"
                placeholder="Your company"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-[#1A1A1A] mb-2 block uppercase tracking-wide text-sm">
                What does your company do? *
              </Label>
              <Textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                className="rounded-xl border-[#1A1A1A]/20 bg-[#F5F5F5] focus:border-[#1A1A1A] focus:ring-[#1A1A1A] min-h-[140px] resize-none"
                placeholder="Tell us about your company and what you're looking to build..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="monthlySpend" className="text-[#1A1A1A] mb-2 block uppercase tracking-wide text-sm">
                  Estimated Monthly AI Spend *
                </Label>
                <Input
                  id="monthlySpend"
                  name="monthlySpend"
                  type="text"
                  required
                  value={formData.monthlySpend}
                  onChange={handleChange}
                  className="rounded-xl border-[#1A1A1A]/20 bg-[#F5F5F5] focus:border-[#1A1A1A] focus:ring-[#1A1A1A] h-14"
                  placeholder="e.g., $500/month"
                />
              </div>

              <div>
                <Label htmlFor="currentProviders" className="text-[#1A1A1A] mb-2 block uppercase tracking-wide text-sm">
                  Current AI Providers *
                </Label>
                <Input
                  id="currentProviders"
                  name="currentProviders"
                  type="text"
                  required
                  value={formData.currentProviders}
                  onChange={handleChange}
                  className="rounded-xl border-[#1A1A1A]/20 bg-[#F5F5F5] focus:border-[#1A1A1A] focus:ring-[#1A1A1A] h-14"
                  placeholder="e.g., OpenAI, Anthropic"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-[#1A1A1A] mb-2 block uppercase tracking-wide text-sm">
                Phone <span className="text-[#1A1A1A]/50">(optional)</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="rounded-xl border-[#1A1A1A]/20 bg-[#F5F5F5] focus:border-[#1A1A1A] focus:ring-[#1A1A1A] h-14"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full md:w-auto bg-[#F0FF00] hover:bg-[#F0FF00]/90 text-[#1A1A1A] px-12 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Get Started'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
