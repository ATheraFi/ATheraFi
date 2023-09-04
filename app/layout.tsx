import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google'
import './globals.css'
import { useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react'

import Navbar from '@/components/shared/Navbar';

const inter = Inter({ subsets: ['latin'] });
const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const libraries = useMemo(() => ['places'], [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: libraries as ("places" | "drawing" | "geometry" | "localContext" | "visualization")[]
  })
  
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
