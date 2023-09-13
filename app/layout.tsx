import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/shared/Navbar';
import GoogleMapsLoader from '@/utils/GoogleMapsLoader';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ATheraFi',
  description: 'This is a description'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Navbar />
          <main className="flex justify-center">
            <div className="w-full">
              <GoogleMapsLoader>
                { children }
              </GoogleMapsLoader>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
