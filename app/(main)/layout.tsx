import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full min-h-screen mx-auto">
      <Header />
      <main className="flex flex-col flex-grow w-full max-w-4xl mx-auto py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
