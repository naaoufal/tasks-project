// "use client";
import Image from 'next/image';
import AllTasks from './pages/AllTasks';

// async function getData() {
//   const res = await fetch('http://localhost:3030/tasks')
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
 
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }
 
//   return res.json()
// }

export default async function Home() {

  // const data = await getData();

  return (
    <main>
      <AllTasks 
        // data={data} 
      />
    </main>
  )
}
