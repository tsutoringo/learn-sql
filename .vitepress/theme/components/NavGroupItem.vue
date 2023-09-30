<script lang="ts" setup>

</script>

<template>
  <li class="nav-group-item">
    <slot name="default"></slot>
  </li>
</template>

<style lang="scss" scoped>
.nav-group-item {
  &:deep() * {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>