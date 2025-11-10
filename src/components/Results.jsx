import React from 'react';
import { Star, MapPin, ExternalLink } from 'lucide-react';

export default function Results({ results, loading, error }) {
  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="h-6 w-48 rounded bg-gray-200" />
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-200 p-4">
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-24 rounded bg-gray-200" />
                <div className="mt-4 h-24 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      </section>
    );
  }

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-2xl font-bold">Top picks near you</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((r) => (
          <article key={r.id} className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">{r.name}</h3>
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{r.rating?.toFixed ? r.rating.toFixed(1) : r.rating}</span>
                  <span>•</span>
                  <span>{r.category}</span>
                </div>
              </div>
              <div className="rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-600">{r.price || '$$'}</div>
            </div>
            <p className="mt-3 line-clamp-3 text-sm text-gray-600">{r.reason}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{r.distance ? `${r.distance} km` : 'Nearby'}</span>
              </div>
              {r.url && (
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                >
                  View <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
