"use client";
import Image from 'next/image';
import HomeScreen from './pages/Home/page';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ReactGA from "react-ga";
import { useEffect } from 'react';

ReactGA.initialize('G-3EY3XB1VXH');

export default async function Home() {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  return (
    <main>
      <HomeScreen />
    </main>
  )
}
