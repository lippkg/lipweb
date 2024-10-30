'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export function Pagination({
  pageIndex,
  totalPages,
}: {
  pageIndex: number;
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const setPage = (page: number) => () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    replace(`/?${params.toString()}`);
  };
  function pagePicklist(){
    if(totalPages<=5){
      return Array.from({ length: totalPages }, (_, i) => i);
    }
    const ls = Array.from({ length: 5 }, (_, i) => i + pageIndex-3);
    if(ls[0]<1){
      return ls.map((i)=>i-ls[0]);
    }
    if(ls[ls.length-1]+1>totalPages){
      return ls.map((i)=>i-(ls[ls.length-1]-totalPages+1));
    }
    return ls;

  }
  if (totalPages > 1) {
    return (
      <nav
        role="navigation"
        aria-label="pagination"
        className="mx-auto flex w-full justify-center"
      >
        <button
          className={`mx-0.5 h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md ${pageIndex==1?'invisible':''}`}
          onClick={setPage(pageIndex - 1)}
        >
            &lt;
        </button>
        {pagePicklist().map((i:number) => (
          <button
            key={i}
            className={`mx-0.5 h-9 px-4 py-2 rounded-md ${
              pageIndex == i + 1
                ? 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            }`}
            onClick={setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className={`mx-0.5 h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md ${pageIndex==totalPages?'invisible':''}`}
          onClick={setPage(pageIndex + 1)}
        >
            &gt;
        </button>

      </nav>
    );
  } else {
    return <></>;
  }
}
