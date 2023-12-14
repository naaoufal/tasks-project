"use client";
import Image from 'next/image';
import HomeScreem from './pages/Home/page';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

export default async function Home() {

  return (
    <main>
      <HomeScreem />
    </main>
  )
}
