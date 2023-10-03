<script lang="ts" setup>
import { useData } from '../composable/data';
import NavGroup from './NavGroup.vue';
import NavGroupItem from './NavGroupItem.vue';
import VPLink from './VPLink.vue';

const { theme } = useData();
</script>

<template>
  <aside class="aside-nav">
    <div class="logo">g</div>
    <nav v-if="theme.sidebar && Array.isArray(theme.sidebar)">
      <NavGroup v-for="group in theme.sidebar">
        <template #title>{{ group.text }}</template>
        <template #item>
          <NavGroupItem v-for="item in group.items">
            <VPLink :href="item.link || ''">{{ item.text }}</VPLink>
          </NavGroupItem>
        </template>
      </NavGroup>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.aside-nav {
  width: 100%;
  height: 100%;

  padding: 1.2em;

  .nav-group {
    .nav-group-item {
      a {
        display: block;
        padding: 0.3em 0;

        color: var(--vp-c-text-2);

        transition: 0.4s;

        &.active, &:hover {
          color: var(--vp-c-brand-1);
        }
      }
    }
  }
}
</style>
