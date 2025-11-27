"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RegisterPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page since registration is disabled
    router.push('/login');
  }, [router]);

  return null;
};

export default RegisterPage;
