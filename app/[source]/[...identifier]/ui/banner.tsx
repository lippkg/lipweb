'use client';

import type { GetPackageResponse } from '@/lib/api';
import { Result } from '@/lib/result';
import {
  ClipboardIcon,
  CheckIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState, type JSX } from 'react';

function commandBuilder(
  pkg: GetPackageResponse,
  version?: string
): Result<string, string> {
  if (pkg.packageManager == 'lip') {
    if (pkg.source == 'github') {
      // lip--github
      return Result.Ok(
        `lip install github.com/${pkg.identifier}${
          version ? `@${version}` : ''
        }`
      );
    }
  } else if (pkg.packageManager == 'pip') {
    if (pkg.source == 'pypi') {
      // pip--pypi
      return Result.Ok(
        `pip install ${pkg.identifier}${version ? `==${version}` : ''}`
      );
    }
  } else if (pkg.packageManager == 'none') {
    // none--github
    return Result.Err(
      'This package does not support installation via a package manager'
    );
  }
  return Result.Err('');
}

function reamMeLinkBuilder(pkg: GetPackageResponse): string {
  if (pkg.packageManager == 'lip' || pkg.packageManager == 'none') {
    if (pkg.source == 'github') {
      return `https://github.com/${pkg.identifier}`;
    }
  } else if (pkg.packageManager == 'pip') {
    if (pkg.source == 'pypi') {
      return `https://pypi.org/project/${pkg.identifier}`;
    }
  }
  return '';
}

export default function Banner({
  pkg,
}: Readonly<{
  pkg: GetPackageResponse;
}>): JSX.Element {
  const [version, setVersion] = useState<string | undefined>();
  const releaseTimeString = new Date(
    pkg.versions[0]?.releasedAt
  ).toLocaleString();
  const installCmd = commandBuilder(pkg, version);
  const handleClipboardClick = (): void => {
    navigator.clipboard
      .writeText(installCmd.ok ? installCmd.val : '')
      .catch(() => {
        console.error('Failed to copy to clipboard');
      });

    const clipboardIcon = document.querySelector('.lipweb-clipboard-icon');
    const checkIcon = document.querySelector('.lipweb-check-icon');

    clipboardIcon?.classList.add('hidden');
    checkIcon?.classList.remove('hidden');

    // Reset after 1 second
    setTimeout(() => {
      clipboardIcon?.classList.remove('hidden');
      checkIcon?.classList.add('hidden');
    }, 1000);
  };

  return (
    <div className='py-10 bg-background px-3 text-foreground'>
      <div className='container mx-auto'>
        <div className='mt-24'>
          <h1 className='text-2xl mb-3'>{pkg.name}</h1>
          <div className='flex flex-wrap'>
            {pkg.tags.map((tag) => (
              <div
                key={tag}
                className='rounded-lg border bg-secondary flex mx-1 mb-2 px-4 py-1'
              >
                <span className='text-sm'>{tag}</span>
              </div>
            ))}
          </div>
        </div>
        {pkg.versions.length > 0 ? (
          <>
            <div className='mt-5'>
              <div className=''>
                <span>{pkg.description}</span>
              </div>
            </div>
            <div className='flex mt-5 text-sm'>
              <span className='mr-2'>
                Latest Version: {pkg.versions[0].version}
              </span>
              <span className='mr-2'>|</span>
              <span>Released: {releaseTimeString}</span>
            </div>
            <div className='mt-5 flex justify-start'>
              <select
                className='flex bg-slate-300 dark:bg-slate-600 p-3 rounded-l-md'
                onChange={(e) => {
                  setVersion(e.target.value);
                }}
              >
                {pkg.versions.map(({ version }) => (
                  <option key={version} value={version}>
                    {version}
                  </option>
                ))}
              </select>
              <div className='flex bg-slate-200 dark:bg-slate-700 p-3 overflow-hidden'>
                <code className='truncate'>{installCmd.val}</code>
              </div>
              {pkg.source == 'github' && pkg.packageManager == 'none' ? (
                <Link
                  href={`https://github.com/${pkg.identifier}/releases/tag/${
                    version ?? pkg.versions[0].version
                  }`}
                  className='flex bg-slate-300 dark:bg-slate-600 p-3 rounded-r-md hover:bg-slate-400 dark:hover:bg-slate-500 transition'
                >
                  <DocumentArrowDownIcon className='h-6 w-6' />
                </Link>
              ) : (
                <button
                  className='flex bg-slate-300 dark:bg-slate-600 p-3 rounded-r-md hover:bg-slate-400 dark:hover:bg-slate-500 transition'
                  onClick={() => handleClipboardClick()}
                >
                  <ClipboardIcon className='lipweb-clipboard-icon h-6 w-6' />
                  <CheckIcon className='lipweb-check-icon h-6 w-6 hidden' />
                </button>
              )}
            </div>
          </>
        ) : (
          <></>
        )}

        <Link 
          href={reamMeLinkBuilder(pkg)} 
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-400 to-gray-500 rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          View Source
        </Link>
      </div>
    </div>
  );
}
