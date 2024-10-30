import { Result } from './result';

const apiUrl = 'https://api.bedrinth.com/v2';

export interface SearchPackagesResponse {
  pageIndex: number;
  totalPages: number;
  items: Array<{
    packageManager: 'lip' | 'pip' | 'none';
    source: 'github' | 'pypi';
    identifier: string;
    name: string;
    description: string;
    author: string;
    tags: string[];
    avatarUrl: string | null;
    hotness: number;
    updated: string;
  }>;
}

export interface GetPackageResponse {
  packageManager: 'lip' | 'pip' | 'none';
  source: 'github' | 'pypi';
  identifier: string;
  name: string;
  description: string;
  author: string;
  tags: string[];
  avatarUrl: string | null;
  hotness: number;
  updated: string;
  versions: Array<{
    version: string;
    releasedAt: string;
  }>;
}

export async function searchPackages(
  q?: string,
  perPage?: number,
  page?: number,
  sort?: 'hotness' | 'updated',
  order?: 'asc' | 'desc'
): Promise<SearchPackagesResponse> {
  const url = new URL(apiUrl);
  url.pathname = url.pathname + '/packages';
  if (q !== undefined) {
    url.searchParams.set('q', q);
  }
  if (perPage !== undefined) {
    url.searchParams.set('perPage', perPage.toString());
  }
  if (page !== undefined) {
    url.searchParams.set('page', page.toString());
  }
  if (sort !== undefined) {
    url.searchParams.set('sort', sort);
  }
  if (order !== undefined) {
    url.searchParams.set('order', order);
  }
  const response = await fetch(url);
  const data = await response.json() as { data: SearchPackagesResponse };
  return data.data;
}

export async function getPackage(
  source: string,
  identifier: string
): Promise<GetPackageResponse> {
  const url = new URL(apiUrl);
  url.pathname = url.pathname + `/packages/${source}/${identifier}`;
  const response = await fetch(url);
  const data = await response.json() as { data: GetPackageResponse };
  return data.data;
}

type ResponseErr = {
  code: number;
  message: string;
}

type GetPackageResult = Result<GetPackageResponse,ResponseErr>

export async function tryGetPackage(
  source: string,
  identifier: string
):Promise<GetPackageResult> {
  const url = new URL(apiUrl);
  url.pathname = url.pathname + `/packages/${source}/${identifier}`;
  const response = await fetch(url);
  if(response.ok) {
    return Result.Ok((await response.json()) as GetPackageResponse);
  } else {
    return Result.Err((await response.json()) as ResponseErr);
  }
}
