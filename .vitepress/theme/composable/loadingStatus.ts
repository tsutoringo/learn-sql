import { InjectionKey, provide, reactive, ref } from 'vue';
import { safeInject } from '@tsutoringo/vue-utils';

export const useLoadingStatus = () => {

  const loading = reactive<{
    status: string,
    now: boolean
  }>({
    status: '',
    now: true
  });

  const setLoadingStatus = (t: string) => {
    loading.now = true;
    loading.status = t;
  };

  const endLoading = () => {
    loading.now = false;
    loading.status = '';
  }

  return {
    setLoadingStatus,
    endLoading,
    loading
  };
};

// export const loadingChain = <C extends [string][]>() => {

// };

export type UseLoadingStatusStore = ReturnType<typeof useLoadingStatus>
export const useLoadingStatusInjectionKey: InjectionKey<UseLoadingStatusStore> = Symbol('loadingStatus');
export const injectLoadingStatus = () => safeInject(useLoadingStatusInjectionKey);
export const provideLoadingStatus = () => (m => (provide(useLoadingStatusInjectionKey, m),m))(useLoadingStatus())
