"use client";
import Image from 'next/image';
import HomeScreem from './pages/Home/page';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import ReactGA from "react-ga4";

ReactGA.initialize('G-0B0Y3289GS');

ReactGA.send({ 
  hitType: "pageview", 
  page: "/mypath", 
  title: "Custom Title" 
});

export default async function Home() {

  return (
    <main>
      <HomeScreem />
    </main>
  )
}
