import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google'
import './globals.css'

import Navbar from '@/components/shared/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ATheraFi',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Navbar />
          <main className="flex justify-center">
            <div className='w-full'>
              { children }
            </div>
          </main>

        </body>
      </html>
    </ClerkProvider>
  )
}