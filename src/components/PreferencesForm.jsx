import React, { useEffect, useState } from 'react';
import { MapPin, SlidersHorizontal, DollarSign, Salad } from 'lucide-react';

const categories = [
  'Breakfast',
  'Brunch',
  'Burgers',
  'Pizza',
  'Sushi',
  'Indian',
  'Chinese',
  'Mexican',
  'Thai',
  'BBQ',
  'Vegan',
  'Desserts',
];

export default function PreferencesForm({ onSearch }) {
  const [location, setLocation] = useState('');
  const [useGPS, setUseGPS] = useState(true);
  const [budget, setBudget] = useState(2); // 1-4 dollar signs
  const [diet, setDiet] = useState('Any');
  const [selectedCategories, setSelectedCategories] = useState(['Sushi', 'Pizza']);
  const [radius, setRadius] = useState(5);

  useEffect(() => {
    if (!useGPS) return;
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
      },
      () => setUseGPS(false),
      { enableHighAccuracy: true, timeout: 4000 }
    );
  }, [useGPS]);

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ location, useGPS, budget, diet, categories: selectedCategories, radius });
  };

  return (
    <section className="mx-auto max-w-6xl px-6">
      <form onSubmit={handleSubmit} className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:grid-cols-12">
        <div className="sm:col-span-6">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <MapPin className="h-4 w-4" /> Location
          </label>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder={useGPS ? 'Using your location…' : 'City, address, or lat,lng'}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={useGPS} onChange={(e) => setUseGPS(e.target.checked)} />
              Use GPS
            </label>
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <DollarSign className="h-4 w-4" /> Budget
          </label>
          <input
            type="range"
            min={1}
            max={4}
            value={budget}
            onChange={(e) => setBudget(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="mt-1 text-sm text-gray-600">{'$'.repeat(budget)}</div>
        </div>

        <div className="sm:col-span-3">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Salad className="h-4 w-4" /> Diet
          </label>
          <select
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            <option>Any</option>
            <option>Vegetarian</option>
            <option>Vegan</option>
            <option>Halal</option>
            <option>Kosher</option>
            <option>Gluten-free</option>
          </select>
        </div>

        <div className="sm:col-span-12">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <SlidersHorizontal className="h-4 w-4" /> Categories
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`rounded-full border px-3 py-1 text-sm transition ${
                  selectedCategories.includes(cat)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-6">
          <label className="mb-2 block text-sm font-medium text-gray-700">Search radius: {radius} km</label>
          <input
            type="range"
            min={1}
            max={25}
            value={radius}
            onChange={(e) => setRadius(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="sm:col-span-12 flex justify-end">
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white shadow hover:opacity-95">
            <SlidersHorizontal className="h-4 w-4" />
            Find Best Food
          </button>
        </div>
      </form>
    </section>
  );
}
