"use client"
import { useRouter } from 'next/navigation';
import Particles from '@/components/background/particles';
import gsap from 'gsap';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const ThreeScene = dynamic(() => import('../components/threejs/ThreeScene'));

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    gsap.fromTo(
      '.animate-me',
      { opacity: 0, x: -100 }, // Initial state
      { opacity: 1, x: 0, duration: 4 } // Final state with animation properties
    );
  }, []);
  useEffect
  return (
    <div className="flex flex-col max-w-[1000px] w-full mt-32">
   
      {/* <button onClick={() => router.push("/")}>
      Home
      </button> */}
      <section className='animate-me gap-4 flex flex-col xl:max-w-[700px]'>
        <h1 className='text-white text-5xl font-bold  xl:max-w-[500px]'>
           3D Full Stack Web Developer
        </h1>
        <h2 className='text-zinc-500 text-2xl'>
          I'm Deony Diras, specialized in building immersive 3D experiences and dynamic web applications using <span className='bg-zinc-900 text-white text-lg p-2 rounded-lg border-[.5px] border-white'>JavaScript.</span>
        </h2>
      </section>
    </div>
  );
}
