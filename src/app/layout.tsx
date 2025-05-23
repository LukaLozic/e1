import React from 'react';
import '@/styles/globals.css';

export const metadata = {
  title: 'Nøgne modeller live – Kvinder, mænd og trans på cam',
  description: 'Se de frækkeste live shows med nøgne piger, mænd, par og transpersoner. Kneppe-me.dk – alt samlet ét sted!',
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