import { InjectionKey, provide, reactive, ref } from 'vue';
import { useLoadingStatus } from './loadingStatus';
import { setupSql } from './setupSql';
import { setupMonacoEditor } from './setupMonacoEditor';
import type { Database, QueryExecResult, SqlJsStatic } from 'sql.js';
import { safeInject } from '@tsutoringo/vue-utils';

class PlaygroundError extends Error {
}

const usePlaygroundStuff = () => {
  const {
    loading,
    setLoadingStatus,
    endLoading,
    loaded
  } = useLoadingStatus();

  let sql: SqlJsStatic | null = null;
  let database: Database | null = null;
  const queue: [incomingQuery: string, silent: boolean][] = [];

  const last = reactive<{
    result: QueryExecResult[] | null,
    query: string,
    error: string | null
  }>({
    result: null,
    query: '',
    error: null
  });

  const setupStuff = async (): Promise<void> => {
    if (!loaded.value) {
      setLoadingStatus('MonacoEditorをセットアップ中...');
      await setupMonacoEditor();
    }

    if (!sql) {
      setLoadingStatus('SQLをセットアップ中...');
      sql = await setupSql();
    }

    endLoading();
  }

  const setDatabase = () => {
    if (database) {
      database.close();
    }

    if (!sql) {
      throw new PlaygroundError('Dont setup database before complete setupStuff.');
    }

    database = new sql.Database();
  }

  const execQuery = (incomingQuery: string, silent: boolean = false) => {
    if (!database) throw new PlaygroundError('Dont exeQuery before complete setupStuff.')
  
    let result: QueryExecResult[] = [];
    let error: string | null = '';
  
    try {
      result = database.exec(incomingQuery);
      error = null;
    } catch (cachedError) {
      result = [];
      error = cachedError.message;
    }
  
    if (!silent) {
      last.query = incomingQuery;
      last.result = result;
      last.error = error;
    }
  }

  return {
    setLoadingStatus,
    endLoading,
    loading,
    loaded,
    setupStuff,
    setDatabase,
    last,
    execQuery
  };
};

export type usePlaygroundStuffStore = ReturnType<typeof usePlaygroundStuff>;
export const usePlaygroundStuffInjectionKey: InjectionKey<usePlaygroundStuffStore> = Symbol('playground');
export const injectPlaygroundStuff = () => safeInject(usePlaygroundStuffInjectionKey);
export const providePlaygroundStuff = () => (m => (provide(usePlaygroundStuffInjectionKey, m),m))(usePlaygroundStuff());
