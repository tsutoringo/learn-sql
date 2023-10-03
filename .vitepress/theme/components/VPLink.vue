<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { isActiveLink } from '../composable/isActiveLink';
import { guessLinkTarget } from '../util/URL';
import { GSymbol } from 'vue-material-symbols';

const props = defineProps<{
  href: string
  target?: string
}>();

const imActive = computed(() => isActiveLink(props.href));
const target = ref<string | undefined>('');

onMounted(() => {
  if(!target.value) {
    target.value = guessLinkTarget(props.href);
  }
});

</script>

<template>
  <a :href="props.href" :target="target" :class="{ active: imActive }">
    <span class="inline">
      <span class="text">
        <slot></slot>
      </span>
      <GSymbol v-if="target === '_blank'" icon="open_in_new" :size="20"/>
    </span>
  </a>
</template>

<style lang="scss" scoped>
a {
  
  .inline {
    display: inline-flex;
    width: 100%;

    .g-symbol {
      vertical-align: middle;
      margin-left: auto;
    }
  }
}
</style>
