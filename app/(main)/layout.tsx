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
      <main className="mx-auto flex w-full max-w-4xl grow flex-col px-5 py-8 sm:px-8 md:px-0">
        {children}
      </main>
      <Footer />
    </div>
  );
}
