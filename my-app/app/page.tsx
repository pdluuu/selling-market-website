'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Dashboard from './home/dashboard/page';
export default function Home() {
    const router = useRouter();
<<<<<<< HEAD
    router.push('/home/dashboard');
=======
    router.push('/home');
>>>>>>> refs/remotes/origin/main
    return <></>;
}
