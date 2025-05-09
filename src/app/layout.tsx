import React from 'react';
import '@/styles/globals.css';

export const metadata = {
  title: 'Chaturbate Viewer',
  description: 'Browse live Chaturbate models with filters and details.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}