'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { type JSX } from 'react';

export default function Search (): JSX.Element {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const handleSearch = (query: string): void => {
    const params = new URLSearchParams(searchParams);

    if (query !== '') {
      params.set('q', query);
      params.delete('page');
    } else {
      params.delete('q');
    }
    replace(`/?${params.toString()}`);
  };

  return (
    <div className="flex">
      <input
        type="text"
        className="h-10 w-8/12 ml-auto px-4 bg-slate-200 dark:bg-slate-800 rounded-md transition-all border-0 focus:ring-2 focus:bg-slate-100 dark:focus:bg-slate-700 focus:w-full focus:outline-none"
        placeholder="Search"
        onChange={e => { handleSearch(e.target.value); }}
        value={searchParams.get('q') ?? ''}
      />
    </div>
  );
}
