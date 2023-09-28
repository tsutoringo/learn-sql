<script lang="ts" setup>
import { Editor } from '@guolao/vue-monaco-editor';
import { Splitpanes, Pane } from 'splitpanes';
import { computed, reactive } from 'vue';
import type { Database, QueryExecResult } from 'sql.js';

const props = defineProps<{
  query: string,
  database: Database
}>();

const emit = defineEmits<{
  'update:query': [ value: string ]
}>();

const query = computed<string>({
  get: () => props.query,
  set: (v) => emit('update:query', v)
});

const last = reactive<{
  result: QueryExecResult[] | null,
  query: string,
  error: string | null
}>({
  result: null,
  query: '',
  error: null
});

const runQuery = () => {
  last.query = query.value;
  try {
    last.result = props.database.exec(last.query);
    last.error = null;
  } catch (error) {
    last.result = null;
    last.error = error.message;
  }
}

</script>

<template>
  <Splitpanes class="playground" horizontal>
        <Pane class="editor">
          <Splitpanes vertical>
            <Pane>
              <Editor v-model:value="query" language="sql" theme="vs-dark" />
            </Pane>
          </Splitpanes>
          <div class="run-btn" @click="() => runQuery()">
            <span>▶</span>
          </div>
        </Pane>
        <Pane class="vp-doc result">
          <div>
            <h3>実行内容</h3>
              {{ last.query }}
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

<style lang="scss" scoped>
.playground {

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
    }

  }

  .result {
    padding: 1em;
    height: 100;
    overflow: scroll;
  }
}
</style>
