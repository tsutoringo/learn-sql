<script lang="ts" setup>
import { injectTabContent } from './TabContent';
import { injectTabManager } from './TabManager';

const manager = injectTabManager();
const content = injectTabContent();
</script>

<template>
  <label class="tabs__title" :class="{ active: content.imActive.value }" >
    <input type="radio" @change="() => { manager.activeTab.value = content.id }" :name="`group-${manager.id}`">
    <span>
      <slot></slot>

    </span>
  </label>
</template>

<style lang="scss" scoped>
.tabs__title {
  font-size: 0.8em;
  cursor: pointer;
  display: inline-block;
  
  padding: 0.5em 0.8em;

  color: var(--vp-c-text-2);
  position: relative;

  &.active, &:hover {
    color: var(--vp-c-text-1);
  }

  > span {
    display: inline-block;
    line-height: 2.2em;
  }
  
  &.active > span {
    border-bottom: 1px solid var(--vp-c-brand-1);
  }

  &.active::before {
  }

  input {
    display: none;
  }
}
</style>
