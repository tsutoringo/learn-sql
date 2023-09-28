import { useData as useData$ } from 'vitepress';

export type Layout = 'playground' | 'problem';

export type ThemeConfig = {
  playground?: boolean
};

export const useData: typeof useData$<ThemeConfig> = useData$;
