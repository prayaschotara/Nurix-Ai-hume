'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { VoiceProvider } from '@humeai/voice-react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Bitontree AI Assistance Platform</title>
        <meta name="description" content="AI-powered assistance for your daily needs" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <VoiceProvider>
            {children}
          </VoiceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 