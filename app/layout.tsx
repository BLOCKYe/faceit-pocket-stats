import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './assets/globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import ReactQueryProviders from '@/components/ReactQueryProviders';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Faceit Pocket Stats',
  icons: { icon: '/favicon.ico' },
  description:
    "Welcome to Faceit Pocket Stats, your personal gateway to a world of competitive gaming data. Here, you can delve into the intricate statistics of your Faceit gaming journey, empowering you to enhance your skills and strategy. Whether you're a seasoned esports aficionado or a casual gamer looking to up your game, our platform is your portal to an array of insights and tools.\n" +
    '\n' +
    'Discover a tailored player profile, game statistics, match history, and leaderboards. Keep motivation high by completing challenges and unlocking achievements. Deepen your gameplay understanding with advanced analysis, and build your gaming community through our social features. Stay updated on the latest tournaments and events, and customize your Pocket Stats to reflect your unique style.\n' +
    '\n' +
    'Faceit Pocket Stats is your path to becoming a better gamer. Join us now and let the data drive your success in the gaming world.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReactQueryProviders>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
