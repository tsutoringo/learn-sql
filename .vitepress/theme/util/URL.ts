type URLOrPath = URL | string;

export const toFullPath = (link: URLOrPath): URL =>
  new URL(link, location.href);

export const isSameOrigin = (link: URLOrPath): boolean =>
  toFullPath(link).origin === location.origin;

export const guessLinkTarget = (link: URLOrPath): string | undefined =>
  isSameOrigin(link) ? undefined : '_blank'
