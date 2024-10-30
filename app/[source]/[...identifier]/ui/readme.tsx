import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import RemarkLinkRewrite from 'remark-link-rewrite';
import type { GetPackageResponse } from '@/lib/api';
export default async function Readme({
  readme,
  pkg,
}: Readonly<{
  readme: string;
  pkg: GetPackageResponse;
}>) {
  const processedReadme = await remark()
    .use(html)
    .use(remarkGfm)
    .use(RemarkLinkRewrite, {
      replacer: (url: string) => {
        switch (pkg.source) {
        case 'github':
          if (
            url.startsWith('http://') ||
              url.startsWith('https://') ||
              url.startsWith('#')
          ) {
            return url;
          } else {
            return `https://github.com/${pkg.identifier}/blob/HEAD/${url}`;
          }
        case 'pypi':
          return url;
        }
      },
    })
    .process(readme);
  const contentHtml = processedReadme.toString();

  return (
    <div className='py-10 px-3 text-primary'>
      <div
        className='lg:container mx-auto prose dark:prose-invert prose-img:inline'
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
