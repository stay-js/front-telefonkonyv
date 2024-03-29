import type { Metadata, Viewport } from 'next';
import { ReactQueryWrapper } from './react-query-wrapper';
import { Toaster } from '~/components/ui/sonner';
import { Navigation } from '~/components/navigation';

import '~/styles/globals.css';

export const metadata: Metadata = {
  title: 'Telefonkönyv',
  description: 'Telefonkönyv',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ReactQueryWrapper>
    <html lang="hu">
      <body className="grid min-h-screen grid-cols-1 grid-rows-[1fr_auto]">
        <div>
          <Navigation />
          {children}
        </div>

        <footer className="bg-blue-500 p-8 text-center text-white">Telefonkönyv © 2024</footer>

        <Toaster />
      </body>
    </html>
  </ReactQueryWrapper>
);

export default RootLayout;
