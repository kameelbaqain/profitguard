import React from 'react';
import { LocaleProvider } from './i18n/LocaleProvider.jsx';
import { AppStateProvider } from './state/AppStateProvider.jsx';
import { AppShell } from './components/layout/AppShell.jsx';

export default function App() {
  return (
    <LocaleProvider>
      <AppStateProvider>
        <AppShell />
      </AppStateProvider>
    </LocaleProvider>
  );
}
