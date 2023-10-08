<script lang="ts" setup>
import { getCurrentInstance } from 'vue';
import { provideTabContent } from './TabContent';
import { injectTabManager } from './TabManager';


defineSlots<{
  default(props: {}): any
  content(props: {}): any
}>();

const manager = injectTabManager();
const content = provideTabContent(getCurrentInstance()!.uid);
</script>

<template>
  <div class="tabs__tab" :class="{ active: content.imActive.value }" >
    <slot name="default"></slot>
    <Teleport v-if="manager.contentTeleportPos.value" :to="manager.contentTeleportPos.value">
      <div class="content" :class="{ active: content.imActive.value }" v-show="content.imActive.value">
        <slot name="content"></slot>
      </div>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>

</style>
