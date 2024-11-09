import { Result } from "./result";

const apiUrl = "https://api.bedrinth.com/v0.3";

export interface SearchPackagesResponse {
  pageIndex: number;
  totalPages: number;
  items: Array<{
    identifier: string;
    name: string;
    description: string;
    author: string;
    tags: string[];
    avatarUrl: string | null;
    projectUrl: string | null;
    hotness: number;
    updated: string;
  }>;
}

export interface GetPackageResponse {
  identifier: string;
  name: string;
  description: string;
  author: string;
  tags: string[];
  avatarUrl: string | null;
  projectUrl: string | null;
  hotness: number;
  updated: string;
  contributors: Contributor[];
  versions: Version[];
}

export interface Version {
  version: string;
  releasedAt: string;
  source: string;
  packageManager: "lip" | "pip" | "none" | "";
  platformVersionRequirement: string;
}

export interface Contributor {
  username: string;
  contributions: number;
}

export async function searchPackages(
  q?: string,
  perPage?: number,
  page?: number,
  sort?: "hotness" | "updated",
  order?: "asc" | "desc"
): Promise<SearchPackagesResponse> {
  const url = new URL(apiUrl);
  url.pathname = url.pathname + "/packages";
  if (q !== undefined) {
    url.searchParams.set("q", q);
  }
  if (perPage !== undefined) {
    url.searchParams.set("perPage", perPage.toString());
  }
  if (page !== undefined) {
    url.searchParams.set("page", page.toString());
  }
  if (sort !== undefined) {
    url.searchParams.set("sort", sort);
  }
  if (order !== undefined) {
    url.searchParams.set("order", order);
  }
  const response = await fetch(url);
  const data = (await response.json()) as { data: SearchPackagesResponse };
  return data.data;
}

export async function getPackage(
  identifier: string
): Promise<GetPackageResponse> {
  const url = new URL(apiUrl);
  url.pathname = url.pathname + `/packages/${identifier}`;
  const response = await fetch(url);
  const data = (await response.json()) as { data: GetPackageResponse };
  return data.data;
}

type ResponseErr = {
  code: number;
  message: string;
};

type GetPackageResult = Result<GetPackageResponse, ResponseErr>;

export async function tryGetPackage(
  identifier: string
): Promise<GetPackageResult> {
  const url = new URL(apiUrl);
  url.pathname = url.pathname + `/packages/${identifier}`;
  const response = await fetch(url);
  if (response.ok) {
    return Result.Ok(
      ((await response.json()) as { data: GetPackageResponse }).data
    );
  } else {
    return Result.Err((await response.json()) as ResponseErr);
  }
}
