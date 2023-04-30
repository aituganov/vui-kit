<template>
  <div class="ui-toast-item px-4 py-3 rounded-xl flex items-center" :class="message.type">
    <slot>
      {{ message.content }}
    </slot>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from './types'

const props = defineProps<{
  message: Message
}>()
</script>

<style lang="scss" scoped>
@import 'src/styles/colors';
.ui-toast-item {
  &.success {
    background-color: $color-success;
  }
  &.error {
    background-color: $color-error;
  }
  color: $color-white;
}
</style>
