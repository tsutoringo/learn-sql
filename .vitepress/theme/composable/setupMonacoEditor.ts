import { loader } from '@guolao/vue-monaco-editor';
import { registerCompletionItemProvider } from '../monaco/sql';

let loaded = false;

export const setupMonacoEditor = async () => {
  if (!loaded) {
    await import('monaco-editor/esm/vs/basic-languages/sql/sql.contribution');
    await import('monaco-editor/esm/vs/editor/edcore.main').then((monaco) => {
      loader.config({
        monaco
      });
      registerCompletionItemProvider(monaco);
    });
    loaded = true;
  }
  return;
}
