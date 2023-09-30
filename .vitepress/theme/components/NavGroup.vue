<script lang="ts" setup>
import { ref } from 'vue';

const collpase = ref<boolean>(true);
</script>
<template>
  <section class="nav-group expansible">
    <details open>
      <summary>
        <hgroup>
          <h2><slot name="title"></slot></h2>
        </hgroup>
      </summary>
      <div class="items">
        <ul>
          <slot name="item"></slot>
        </ul>
      </div>
    </details>
  </section>
</template>
<style lang="scss" scoped>
.nav-group {

  border-top: 1px solid var(--vp-c-divider);
  &:first-child {
    border-top: 0;
  }
  details {
    padding: 0.8em 0;
    summary {
      display: block;
      padding: 0.4em 0;
      cursor: pointer;
      
      &::-webkit-details-marker {
        display: none;
      }
      
      * {
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
