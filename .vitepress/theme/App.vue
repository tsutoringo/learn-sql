<script lang="ts">
import { Splitpanes, Pane } from 'splitpanes';
import { ref } from 'vue';
import { onContentUpdated } from 'vitepress';
import Playground from './components/Playground.vue';
import { useData } from './composable/data';
import AsideNav from './components/AsideNav.vue';
import { providePlaygroundStuff } from './composable/usePlaygroundStuff';
</script>

<script lang="ts" setup>
const {
  frontmatter
} = useData();

const {
  setupStuff,
  setDatabase,
  execQuery
} = providePlaygroundStuff();

const query = ref<string>('');

onContentUpdated(() => {
  setupStuff()
    .then(() => setDatabase())
    .then(() => initDatabase())
});

const initDatabase = () => {
  if(frontmatter.value.playground) {
    if (frontmatter.value.playground.query)
      query.value = frontmatter.value.playground.query;
    if (frontmatter.value.playground.preQuery)
      execQuery(frontmatter.value.playground.preQuery, true);
  }
};
</script>

<template>
  <div class="wrapper">
    <Splitpanes class="root" vertical>
      <Pane :size="20" class="navigation">
        <AsideNav />
      </Pane>
      <Pane>
        <Splitpanes class="root" vertical>
          <Pane v-if="frontmatter.playground">
            <Playground v-model:query="query"></Playground>
          </Pane>
          <Pane class="vp-doc">
            <Content />
          </Pane>
        </Splitpanes>
      </Pane>
    </Splitpanes>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  height: 100vh;

  .splitpanes.root {
    overflow: none;

    .navigation {
      width: 100%;
      height: 100%;

      background-color: var(--vp-c-bg-alt);
    }

    .vp-doc {
      font-size: 0.8rem;
      padding: 1em;
      padding-left: 2.2em;
      overflow: scroll;
    }
  }
}


</style>
