import React from 'react';

export function Badge({ tone = 'stable', children }) {
  const classes =
    tone === 'spike'
      ? 'bg-guard-coral/15 text-red-200 ring-1 ring-guard-coral/40'
      : 'bg-guard-emerald/15 text-emerald-200 ring-1 ring-guard-emerald/35';

  return (
    <span className={`inline-flex min-h-7 items-center rounded-full px-3 text-xs font-semibold ${classes}`}>
      {children}
    </span>
  );
}
