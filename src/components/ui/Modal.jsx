import React from 'react';

export function Modal({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-4 pb-5 pt-12 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-md rounded-lg bg-guard-card p-5 shadow-soft ring-1 ring-white/10">
        {children}
      </div>
    </div>
  );
}
