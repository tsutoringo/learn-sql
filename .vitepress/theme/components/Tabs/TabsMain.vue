<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import { provideTabManager } from './TabManager';

const instance = getCurrentInstance()!;

const manager = provideTabManager(instance.uid);
</script>
<template>
  <div class="tabs__main">
    <div class="tabs">
      <slot name="default"></slot>
    </div>
    <div class="contents" :ref="(el) => { manager.contentTeleportPos.value = el as HTMLElement | null}">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs__main {
  height: 100%;
  display: flex;
  flex-direction: column;
  .tabs {
    display: flex;
  }

  .contents {
    flex: 1;
    overflow: scroll;
  }
}
</style>