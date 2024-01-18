"use client";
import Image from 'next/image';
import HomeScreen from './pages/Home/page';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ReactGA from "react-ga4";
import { useEffect } from 'react';

ReactGA.initialize('G-3EY3XB1VXH');

export default function Home() {

  useEffect(() => {
    // ReactGA.pageview(window.location.pathname + window.location.search);
    ReactGA.send({ 
      hitType: "pageview", 
      page: window.location.pathname + window.location.search, 
      title: "Custom Title" 
    });
  });

  return (
    <main>
      <HomeScreen />
    </main>
  )
}
