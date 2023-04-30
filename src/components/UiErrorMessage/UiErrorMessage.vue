<template>
  <div v-if="firstError" class="ui-input-error-message">
    {{ firstError }}
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  errorMessages: {
    default: () => [],
    type: [Array, String]
  }
})

const firstError = computed(() => {
  const messages = props.errorMessages
  return typeof messages === 'string' ? messages : messages[0]
})
</script>

<style lang="scss" scoped>
@import 'src/styles/colors';

.ui-input-error-message {
  color: $color-error;
  font-size: 13px;
}
</style>
