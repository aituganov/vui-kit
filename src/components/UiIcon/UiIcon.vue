<template>
  <div 
    v-html="svgIcon"
    class="ui-icon"
    :class="{ accent: accent, sm: sm, xs: xs }"
  ></div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { iconsPathPrefix } from '@/index';

const props = defineProps<{
  accent?: boolean
  name: string
  sm?: boolean
  xs?: boolean
}>()
const svgRaw = ref()
const loadSvgIcons = (name) => fetch(`${iconsPathPrefix}${name}.svg`)
  .then(res => res.text())
  .then(raw => svgRaw.value = raw)
const svgIcon = computed(() => {
  loadSvgIcons(props.name)
  return svgRaw.value
});
</script>

<style lang="scss" scoped>
@import 'src/styles/colors';
.ui-icon {
  display: inline-block;
  background-color: transparent;
  color: currentColor;
  height: 24px;
  width: 24px;
  &.accent {
    color: $color-accent;
  }
  &.sm {
    height: 18px;
    width: 18px;
  }
  &.xs {
    height: 18px;
    width: 18px;
  }
}
</style>
