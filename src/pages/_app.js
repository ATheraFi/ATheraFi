import Layout from '@/components/layout'
import Head from 'next/head'
import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react'
import { LoadingPage } from '@/components'
import { ClerkProvider } from '@clerk/nextjs';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const libraries = useMemo(() => ['places'], [])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libraries
  })

  return isLoaded ? (
    <ClerkProvider { ...pageProps }>
      <Head>
        <title>ATheraFi</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="ATheraFi helps parents/caregivers/guardians of differently-abled people find the resources around them" />
        <meta name="keywords" content="Autism, Therapy, Neurodivergent, ABA, Occupational, Physical" />
        <meta name="author" content="Jake Reck" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Toaster position="top-center" />
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  ) : <LoadingPage />
}
