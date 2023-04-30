<template>
  <div
    class="ui-label mt-1 overflow-hidden overflow-ellipsis whitespace-nowrap"
    :style="{ opacity: opacity }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  opacity: {
    default: 1,
    type: [Number, String]
  }
})
</script>

<style scoped>
.ui-label {
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
}
</style>
