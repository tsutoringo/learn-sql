import { DefaultTheme, useData as useData$ } from 'vitepress';

export type Layout = 'playground' | 'problem';

export const useData: typeof useData$<DefaultTheme.Config> = useData$;
