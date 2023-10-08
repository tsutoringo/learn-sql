import { safeInject } from '@tsutoringo/vue-utils';
import { InjectionKey, provide, reactive, ref } from 'vue';

export const useTabManager = (id: number) => {
  const activeTab = ref<number | null>(null);
  const contentTeleportPos = ref<HTMLElement | null>();


  return {
    id,
    activeTab,
    contentTeleportPos
  };
};


export type UseTabManagerStore = ReturnType<typeof useTabManager>;
export const useTabManagerInjectionKey: InjectionKey<UseTabManagerStore> = Symbol('tab manager');
export const injectTabManager = () => safeInject(useTabManagerInjectionKey);
export const provideTabManager = (id: number) => (m => (provide(useTabManagerInjectionKey, m),m))(useTabManager(id));
