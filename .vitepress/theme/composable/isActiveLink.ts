import { useRoute } from 'vitepress';

const HASH_RE = /#.*$/
const EXT_RE = /(index)?\.(md|html)$/

export const isActiveLink = (targetPath: string, ) => {
  const route = useRoute();

  return normalizePath(route.path) === normalizePath(targetPath);
};

export const normalizePath = (path: string) => {
  return decodeURI(path)
    .replace(HASH_RE, '')
    .replace(EXT_RE, '');
}