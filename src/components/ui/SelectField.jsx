import React from 'react';

export function SelectField({ label, children, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-guard-muted">{label}</span>
      <select
        className="mt-2 h-12 w-full rounded-lg border border-white/10 bg-guard-cardSoft px-4 text-base text-white outline-none transition focus:border-guard-emerald focus:ring-2 focus:ring-guard-emerald/20"
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
