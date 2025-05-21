import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

// Load Inter font with specified subsets
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Prashanth Kumar S | Portfolio',
  description: 'Full-stack developer specialized in building exceptional digital experiences',
  keywords: 'developer, portfolio, web developer, frontend, backend, full-stack',
  authors: [{ name: 'Prashanth Kumar S' }],
  openGraph: {
    type: 'website',
    locale: 'en_IND',
    url: 'https://yourdomain.com',
    title: 'Prashanth Kumar S | Portfolio',
    description: 'Full-stack developer specialized in building exceptional digital experiences',
    siteName: 'Prashanth Kumar S Portfolio',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}