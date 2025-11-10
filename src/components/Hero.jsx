import React from 'react';
import { Utensils, MapPin, SlidersHorizontal, Wand2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
          <Wand2 className="h-4 w-4" />
          <span className="text-sm font-medium">AI Food Finder</span>
        </div>
        <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl">
          Find the best food around you —
          <span className="text-primary"> tailored to your taste</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Tell us your cravings, budget, and dietary needs. We’ll rank nearby spots
          so you can eat great without the guesswork.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span className="text-sm">Local-first results</span>
          </div>
          <div className="hidden h-4 w-px bg-gray-200 sm:block" />
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5" />
            <span className="text-sm">Smart preferences</span>
          </div>
          <div className="hidden h-4 w-px bg-gray-200 sm:block" />
          <div className="flex items-center gap-2">
            <Utensils className="h-5 w-5" />
            <span className="text-sm">Curated categories</span>
          </div>
        </div>
      </div>
    </section>
  );
}
