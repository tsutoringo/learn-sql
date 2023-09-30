<script lang="ts" setup>
import { GSymbol } from 'vue-material-symbols';
</script>
<template>
  <section class="nav-group expansible">
    <details open>
      <summary>
        <hgroup class="title">
          <h2><slot name="title"></slot></h2><div class="arrow"><GSymbol icon="chevron_right" /></div>
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

    > summary {
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

      .title {
        display: flex;
        
        > .arrow {
          margin-left: auto;
          display: flex;
          align-items: center;
          user-select: none;

          transition: 0.2s;
          transform: rotate(0);
        }
      }
    }

    &[open] > summary .title .arrow {
      transform: rotate(90deg);
    }
  }
}
</style>
