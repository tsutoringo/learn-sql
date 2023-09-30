import { InjectionKey, provide, ref } from 'vue';
import { useLoadingStatus } from './loadingStatus';
import { setupSql } from './setupSql';
import { setupMonacoEditor } from './setupMonacoEditor';
import type { SqlJsStatic } from 'sql.js';
import { safeInject } from '@tsutoringo/vue-utils';

const usePlaygroundStuff = () => {
  const {
    loading,
    setLoadingStatus,
    endLoading,
    loaded
  } = useLoadingStatus();

  const sql = ref<SqlJsStatic | null>(null);

  const setupStuff = async (): Promise<SqlJsStatic> => {
    if (!loaded.value) {
      setLoadingStatus('MonacoEditorをセットアップ中...');
      await setupMonacoEditor();
    }

    if (!sql.value) {
      setLoadingStatus('SQLをセットアップ中...');
      sql.value = await setupSql();
    }

    endLoading();

    return sql.value;
  }

  return {
    sql,
    setLoadingStatus,
    endLoading,
    loading,
    loaded,
    setupStuff
  };
};

export type usePlaygroundStuffStore = ReturnType<typeof usePlaygroundStuff>;
export const usePlaygroundStuffInjectionKey: InjectionKey<usePlaygroundStuffStore> = Symbol('playground');
export const injectPlaygroundStuff = () => safeInject(usePlaygroundStuffInjectionKey);
export const providePlaygroundStuff = () => (m => (provide(usePlaygroundStuffInjectionKey, m),m))(usePlaygroundStuff());
