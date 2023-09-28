<script lang="ts">
import { Splitpanes, Pane } from 'splitpanes';
import { useData } from './composable/data';
import { onMounted, ref } from 'vue';
import Playground from './components/Playground.vue';
import initSqlJs, { Database, SqlJsStatic,  } from 'sql.js';
import { onContentUpdated } from 'vitepress';
</script>

<script lang="ts" setup>


const {
  frontmatter
} = useData();

const SQL = ref<SqlJsStatic | null>(null);
const query = ref<string>(frontmatter.value.playground.query);
const database = ref<Database | null>(null);

onMounted(async() => {
  SQL.value = await initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` });
  storeDatabase();
});

onContentUpdated(() => {
  storeDatabase();
});

const storeDatabase = () => {
  if (!SQL.value) return;

  if (database) database.value?.close();
  database.value = new SQL.value.Database();

  if(frontmatter.value.playground && frontmatter.value.playground.preQuery) {
    database.value.exec(frontmatter.value.playground.preQuery);
  }
};

</script>

<template>
  <Splitpanes class="root" vertical>
    <Pane :size="10" class="navigation">
      <aside>
        <ul>
          <li>SELECT FROM</li>
          <li>WHERE</li>
          <li>AND OR</li>
          <li>etc...</li>
        </ul>
      </aside>
    </Pane>
    <Pane v-if="frontmatter.playground && database != null">
      <Playground :database="database" v-model:query="query"></Playground>
    </Pane>
    <Pane class="vp-doc">
      <Content />
    </Pane>
  </Splitpanes>
</template>

<style lang="scss" scoped>

.splitpanes.root {
  width: 100vw;
  height: 100vh;
  overflow: none;

  .navigation {
    width: 100%;
    height: 100%;

    background-color: var(--vp-c-bg-alt);
  }

  .vp-doc {
    font-size: 0.8rem;
    padding: 1em;
    overflow: scroll;
  }
}
</style>
