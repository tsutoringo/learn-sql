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
  'update:query': [ value: string ],
  loaded: []
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

const {
  loading,
  loaded,
  sql,
  setupStuff
} = injectPlaygroundStuff();

onBeforeMount(() => {
  if (loaded.value && sql.value) {
    database.value = new sql.value.Database();
    emit('loaded');
  } else {
    setupStuff().then((sql) => {
      database.value = new sql.Database();
      emit('loaded');
    });
  }
});

onUnmounted(() => {
  database.value?.close();
});

const execQuery = (incomingQuery: string, silent: boolean = false) => {
  if (!database.value) throw new Error('Dont run query before complete setup.');

  let result: QueryExecResult[] = [];
  let error: string | null = '';

  try {
    result = database.value.exec(incomingQuery);
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

defineExpose({
  loading,
  execQuery
});

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
          <div class="run-btn" @click="() => execQuery(query)">
            <GSymbol icon="play_arrow" fill></GSymbol>
          </div>
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
