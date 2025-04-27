import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-4xl flex-grow flex-col py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
