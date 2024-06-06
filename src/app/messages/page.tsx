'use client'
// import Image from "next/image";
// import styles from "./page.module.css";
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';


export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  useEffect(() => {
    if (!loading && !session) {
      // Redirect to login page if not authenticated
      signIn('oidcs');
    }
  }, [session, loading]);

  if (!session) {
    return null; // If no session and still loading, do not render anything
  }

  return (
    <div>test</div>
  );
};
