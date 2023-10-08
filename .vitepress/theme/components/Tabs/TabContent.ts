import { safeInject } from '@tsutoringo/vue-utils';
import { provide, type InjectionKey, computed } from 'vue';
import { injectTabManager } from './TabManager';

const useTabContent = (id: number) => {
  const manager = injectTabManager();

  const imActive = computed(() => manager.activeTab.value === id);

  return {
    id,
    imActive
  }
};

export type UseTabContentStore = ReturnType<typeof useTabContent>;
export const useTabContentInjectionKey: InjectionKey<UseTabContentStore> = Symbol('tab content');
export const injectTabContent = () => safeInject(useTabContentInjectionKey);
export const provideTabContent= (id: number) => (m => (provide(useTabContentInjectionKey, m),m))(useTabContent(id));
