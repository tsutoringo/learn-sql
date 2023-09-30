<script lang="ts" setup>
import { computed } from 'vue';
import { isActiveLink } from '../composable/isActiveLink';
import { guessLinkTarget } from '../util/URL';

const props = defineProps<{
  href: string
  target?: string
}>();

const imActive = computed(() => isActiveLink(props.href));
const target = computed(() => props.target || (typeof window !== 'undefined' ? guessLinkTarget(props.href) : undefined));

</script>

<template>
  <a :href="props.href" :target="target" :class="{ active: imActive }"><slot></slot></a>
</template>

<style lang="scss" scoped>

</style>
