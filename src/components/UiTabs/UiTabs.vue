<template>
  <div class="ui-tabs" :class="{ sm: sm }">
    <UiLabel v-if="label">{{ label }}</UiLabel>

    <div class="tabs-wrapper flex p-1 rounded-lg">
      <div
        v-for="tab in tabs"
        class="tab flex-1 cursor-pointer flex items-center justify-center"
        :class="{ 'selected rounded-md': tab.id === modelValue }"
        :key="tab.id"
        @click="selectTab(tab)"
      >
        <UiIcon v-if="tab.icon" class="mr-2" xs :name="tab.icon" />
        <slot name="item" v-bind="{ tab }">
          {{ tab.title }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { UiIcon } from '@/components/UiIcon'
import { UiLabel } from '@/components/UiLabel'
import type { TabItem } from './types'

const props = defineProps({
  label: {
    default: '',
    type: String
  },
  sm: {
    default: false,
    type: Boolean
  },
  modelValue: {
    default: '',
    type: [Number, String]
  },
  tabs: {
    default: () => [],
    type: Array<TabItem>
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: Number | String): void
}>()

function selectTab(tab: TabItem) {
  emit('update:modelValue', tab.id)
}

onMounted(() => {
  if (props.modelValue || props.tabs.length < 1) {
    return
  }
  selectTab(props.tabs[0])
})
</script>

<style lang="scss" scoped>
@import 'src/styles/colors';
@import 'src/styles/vars';

.ui-tabs {
  .tabs-wrapper {
    background-color: rgba($color-accent, 0.1);

    .tab {
      color: $color-black;
      height: $input-height;
      font-weight: 600;
      font-size: 14px;
      transition: all 200ms ease-in-out;

      @media (prefers-color-scheme: dark) {
        color: $color-accent;
      }

      &.selected {
        background-color: $color-accent;
        color: $color-black;
      }
    }
  }
  &.sm {
    .tab {
      height: $input-height-sm;
    }
  }
}
</style>
