<script lang="ts" setup>
import { computed } from 'vue';
import { isActiveLink } from '../composable/isActiveLink'

const props = defineProps<{
  href: string
}>();

const imActive = computed(() => isActiveLink(props.href))

</script>

<template>
  <a :href="props.href" :class="{ active: imActive }"><slot></slot></a>
</template>

<style lang="scss" scoped>

</style>