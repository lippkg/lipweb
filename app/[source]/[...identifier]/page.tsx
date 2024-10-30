export const runtime = "edge";

import { type JSX } from 'react';
import { Metadata } from 'next';
import { tryGetPackage } from '@/lib/api';
import { fetchReadme } from '@/lib/readme-fetcher';
import Banner from './ui/banner';
import Readme from './ui/readme';
import { redirect } from 'next/navigation';

export async function generateMetadata({
  params,
}: Readonly<{
  params: { source: string; identifier: string[] };
}>): Promise<Metadata> {
  const identifier = params.identifier.join('/');
  const response = await tryGetPackage(params.source, identifier);
  if (response.err) {
    return {};
  }
  const pkg = response.val;
  return {
    title: `${pkg.name}-Bedrinth`,
  };
}

export default async function Page({
  params,
}: Readonly<{
  params: { source: string; identifier: string[] };
}>): Promise<JSX.Element> {
  const identifier = params.identifier.join('/');
  const response = await tryGetPackage(params.source, identifier);
  if (response.err) {
    redirect('/404');
  }
  const pkg = response.val;
  const readme = await fetchReadme(
    params.source as 'github' | 'pypi',
    identifier
  );

  return (
    <main>
      <Banner pkg={pkg} />
      <Readme readme={readme} pkg={pkg} />
    </main>
  );
}
