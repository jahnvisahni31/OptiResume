'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: 0,
    description: 'Basic resume analysis for individuals',
    features: [
      'Basic ATS compatibility check',
      '3 resume analysis per month',
      'Basic keyword suggestions',
      'Format validation',
    ],
  },
  {
    name: 'Pro',
    price: 19,
    description: 'Advanced features for job seekers',
    features: [
      'Everything in Free',
      'Unlimited resume analyses',
      'Industry-specific keyword optimization',
      'Detailed section-by-section feedback',
      'Export to PDF',
      'Compare with industry standards',
    ],
  },
  {
    name: 'Enterprise',
    price: 99,
    description: 'Custom solutions for organizations',
    features: [
      'Everything in Pro',
      'Custom branding',
      'API access',
      'Priority support',
      'Team collaboration',
      'Analytics dashboard',
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that best fits your needs. All plans include our core AI-powered resume analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="text-4xl font-bold mb-2">
                  ${plan.price}
                  <span className="text-lg text-muted-foreground">/mo</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
              <div className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full" variant={plan.name === 'Pro' ? 'default' : 'outline'}>
                Get Started
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
};