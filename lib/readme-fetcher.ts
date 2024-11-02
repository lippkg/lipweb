export async function fetchReadme(
  source: "github" | "pypi",
  identifier: string
): Promise<string> {
  switch (source) {
    case "github":
      return fetchGithubReadme(identifier);
    case "pypi":
      return fetchPypiReadme(identifier);
  }
}

async function fetchGithubReadme(identifier: string): Promise<string> {
  const url = new URL(
    `https://raw.githubusercontent.com/${identifier}/HEAD/README.md`
  );
  const response = await fetch(url);
  return await response.text();
}

async function fetchPypiReadme(identifier: string): Promise<string> {
  const url = new URL(`https://pypi.org/pypi/${identifier}/json`);
  const response = await fetch(url);
  const data = (await response.json()) as { info: { description: string } };
  return data.info.description;
}
