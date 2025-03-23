import React from 'react';

export default function TaskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col flex-grow w-full max-w-4xl mx-auto py-8">
      {children}
    </main>
  );
}
