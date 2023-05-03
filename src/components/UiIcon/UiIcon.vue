<template>
  <div class="ui-icon" :class="{ accent: accent, sm: sm, xs: xs }">
    <component :is="component" />
  </div>
</template>

<script lang="ts" setup>
import { computed, defineAsyncComponent } from 'vue'
import { iconsPathPrefix } from '@/index';

const props = defineProps<{
  accent?: boolean
  name: string
  sm?: boolean
  xs?: boolean
}>()
const component = computed(() => {
  const name = props.name
  return defineAsyncComponent(() => import(`${iconsPathPrefix}${name}.svg`))
})
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
