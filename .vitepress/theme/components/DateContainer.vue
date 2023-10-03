<script lang='ts' setup>
import { DateTime } from 'luxon';
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
  time: DateTime
}>();

const nowTime = ref<DateTime>(DateTime.now());
let timerId: number | null = null;

onMounted(() => {
  timerId = window.setInterval(() => {
    nowTime.value = DateTime.now();
  }, 1000);
});

onUnmounted(() => {
  if (timerId) clearInterval(timerId);
});
</script>

<template>
  <time :datetime="props.time.toString()">{{ props.time.toRelative({
    base: nowTime
  }) }}</time>
</template>
