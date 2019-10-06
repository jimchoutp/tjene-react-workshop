export function getPageParam(url: string | null): number | null {
  if (url === null) {
    return null;
  }

  const page = new URL(url).searchParams.get("page");

  if (page == null) {
    return null;
  }

  return parseInt(page);
}

export function getResourceIdFromPath(url: string): string | null {
  const matches = url.match(/(\w+)\/?$/);

  return matches ? matches[1] : null;
}
