import React from 'react';

export function MetricCard({ label, value, tone = 'neutral' }) {
  const color = tone === 'alert' ? 'text-red-200' : tone === 'good' ? 'text-emerald-200' : 'text-white';

  return (
    <article className="rounded-lg bg-guard-card p-4 shadow-soft ring-1 ring-white/5">
      <p className="text-sm leading-5 text-guard-muted">{label}</p>
      <p className={`mt-3 text-2xl font-bold tracking-normal ${color}`}>{value}</p>
    </article>
  );
}
