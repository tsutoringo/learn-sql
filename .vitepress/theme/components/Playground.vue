<script lang="ts" setup>
import { Editor } from '@guolao/vue-monaco-editor';
import { Splitpanes, Pane } from 'splitpanes';
import { computed, ref } from 'vue';
import type { Database, QueryExecResult, SqlJsStatic } from 'sql.js';
import { GSymbol } from 'vue-material-symbols';
import { injectPlaygroundStuff } from '../composable/usePlaygroundStuff';
import DateContainer from './DateContainer.vue';
import * as Tabs from './Tabs/';
import SQLResultTable from './SQL/SQLResultTable.vue';

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
          <Tabs.Main>
            <Tabs.Tab>
              <Tabs.Title>実行結果</Tabs.Title>
              <template #content>
                <SQLResultTable v-if="last.result" :result="last.result" />
              </template>
            </Tabs.Tab>
            <Tabs.Tab>
              <Tabs.Title>Explain</Tabs.Title>
              <template #content>
                Coming soon
              </template>
            </Tabs.Tab>
          </Tabs.Main>
          <!-- <div>
            <h3>実行内容 <small><DateContainer v-if="last.time" :time="last.time"/></small></h3>
              <pre>{{ last.query }}</pre>
            <template v-if="last.result">
            </template>
            <template v-if="last.error">
              <h3>エラー</h3>
              {{ last.error }}
            </template>
          </div> -->
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
    height: 100;
    overflow: scroll;
  }
}
</style>
