import React from 'react';
import { LocateFixed, Filter, Brain, ThumbsUp } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <LocateFixed className="h-5 w-5" />,
      title: 'Set your area',
      desc: 'Use GPS or type a place. Choose how far you’re willing to travel.'
    },
    {
      icon: <Filter className="h-5 w-5" />,
      title: 'Tune preferences',
      desc: 'Budget, diet, and categories like sushi, pizza, brunch, vegan, and more.'
    },
    {
      icon: <Brain className="h-5 w-5" />,
      title: 'AI ranking',
      desc: 'We blend ratings, distance, popularity, and your tastes to score each spot.'
    },
    {
      icon: <ThumbsUp className="h-5 w-5" />,
      title: 'Get top picks',
      desc: 'Clear reasons for each recommendation and quick links to explore.'
    }
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="text-center text-2xl font-bold">How it works</h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.title} className="rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              {s.icon}
            </div>
            <h3 className="mt-4 font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
