import React, { useState } from 'react';
import Hero from './components/Hero';
import PreferencesForm from './components/PreferencesForm';
import Results from './components/Results';
import HowItWorks from './components/HowItWorks';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSearch = async (payload) => {
    setLoading(true);
    setError('');
    try {
      // For now, mock AI ranking client-side while backend is prepared.
      // This provides an immediate interactive experience.
      const mock = mockRank(payload);
      setResults(mock);
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Hero />
      <PreferencesForm onSearch={onSearch} />
      <Results results={results} loading={loading} error={error} />
      <HowItWorks />
      <footer className="px-6 py-12 text-center text-sm text-gray-500">
        Built with ❤️ to help you find great food faster.
      </footer>
    </div>
  );
}

// Simple mock ranking to simulate AI behavior until backend is connected
function mockRank({ categories = [], budget = 2, radius = 5 }) {
  const catalog = [
    { id: '1', name: 'Umami Sushi', category: 'Sushi', base: 4.6, price: '$$$', url: '#'},
    { id: '2', name: 'Nonna Mia Pizza', category: 'Pizza', base: 4.5, price: '$$', url: '#'},
    { id: '3', name: 'Green Leaf', category: 'Vegan', base: 4.4, price: '$$', url: '#'},
    { id: '4', name: 'Bombay Spice', category: 'Indian', base: 4.5, price: '$$', url: '#'},
    { id: '5', name: 'Casa Mexicana', category: 'Mexican', base: 4.3, price: '$$', url: '#'},
    { id: '6', name: 'Thai Orchid', category: 'Thai', base: 4.4, price: '$$', url: '#'},
  ];

  const priceWeight = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
  const desiredPrice = ['$', '$$', '$$$', '$$$$'][Math.max(0, Math.min(3, budget - 1))];

  const filtered = catalog.filter((r) =>
    (categories.length === 0 || categories.includes(r.category)) &&
    priceWeight[r.price] <= priceWeight[desiredPrice]
  );

  return filtered
    .map((r, idx) => ({
      ...r,
      rating: r.base + (Math.random() * 0.2 - 0.1),
      distance: Math.max(0.3, Math.min(radius, Math.round((idx + 1) * 0.8 * 10) / 10)),
      reason: generateReason(r, desiredPrice),
    }))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);
}

function generateReason(r, desiredPrice) {
  const bits = [
    `High recent ratings for ${r.category.toLowerCase()}`,
    `Matches your budget (${desiredPrice})`,
    'Popular with locals this week',
    'Quick travel time from your area',
  ];
  return bits.sort(() => 0.5 - Math.random()).slice(0, 2).join(' • ');
}
