import React, { type JSX } from 'react';
import { Metadata } from 'next';
import { searchPackages } from '@/lib/api';
import pluginCard from './ui/pluginCard';
import { Pageination } from './ui/pagination';

export const metadata: Metadata = {
  title:'Bedrinth'
};

export default async function Page({
  searchParams,
}: Readonly<{
  searchParams?: {
    q?: string;
    page?: number;
  };
}>): Promise<JSX.Element> {
  const result = await searchPackages(
    searchParams?.q,
    undefined,
    searchParams?.page
  );
  return (
    <main>
      <div className="container mx-auto px-3 mt-24 pt-4 bg-background text-foreground">
        {result.items.map(pluginCard)}
      </div>
      <Pageination
        pageIndex={result.pageIndex}
        totalPages={result.totalPages}
      />
    </main>
  );
}
