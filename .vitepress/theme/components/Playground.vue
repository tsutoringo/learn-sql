<script lang="ts" setup>
import { Editor } from '@guolao/vue-monaco-editor';
import { Splitpanes, Pane } from 'splitpanes';
import { computed, onBeforeMount, onMounted, onUnmounted, reactive, ref } from 'vue';
import type { Database, QueryExecResult, SqlJsStatic } from 'sql.js';
import { GSymbol } from 'vue-material-symbols';
import { injectPlaygroundStuff } from '../composable/usePlaygroundStuff';

const props = defineProps<{
  query: string
}>();

const database = ref<Database | null>(null);

const emit = defineEmits<{
  'update:query': [ value: string ]
}>();

const query = computed<string>({
  get: () => props.query,
  set: (v) => emit('update:query', v)
});

const {
  loading,
  last,
  execQuery
} = injectPlaygroundStuff();

</script>

<template>
  <div class="playground">
    <template v-if="loading.now">
      {{ loading.status }}
    </template>
    <template v-else>
      <Splitpanes horizontal>
        <Pane class="editor">
          <Splitpanes vertical>
            <Pane>
              <Editor v-model:value="query" language="sql" theme="vs-dark" />
            </Pane>
          </Splitpanes>
          <button title="実行" class="run-btn" @click="() => execQuery(query)">
            <GSymbol icon="play_arrow" fill></GSymbol>
          </button>
        </Pane>
        <Pane class="vp-doc result">
          <div>
            <h3>実行内容</h3>
              <pre>{{ last.query }}</pre>
            <template v-if="last.result">
              <h3>Result</h3>
              <table v-for="table of last.result">
                <thead>
                  <th v-for="column in table.columns">
                    {{ column }}
                  </th>
                </thead>
                <tbody>
                  <template v-for="value in table.values">
                    <tr>
                      <template v-if="Array.isArray(value)" v-for="data of value">
                        <td>
                          {{ data }}
                        </td>
                      </template>
                    </tr>
                  </template>
                </tbody>
              </table>
            </template>
            <template v-if="last.error">
              <h3>エラー</h3>
              {{ last.error }}
            </template>
          </div>
        </Pane>
      </Splitpanes>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.playground {
  height: 100%;
  .editor {
    position: relative;
    .run-btn {
      position: absolute;
      bottom: 20px;
      right: 20px;
      background-color: var(--vp-c-bg);
      font-size: 1.2em;
      width: 2.2em;
      height: 2.2em;

      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      cursor: pointer;

      border-radius: 10px;

      transition: 0.4s;

      &:hover {
        color: var(--vp-c-brand-1);
      }
    }

  }

  .result {
    padding: 1em;
    height: 100;
    overflow: scroll;
  }
}
</style>
