import React from 'react';
import '@/styles/globals.css';

export const metadata = {
  title: 'KneppeMe',
  description: 'Gennemse live Cam-modeller med filtre og detaljer.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}