<template>
  <div
    v-bind="$attrs"
    class="ui-switch cursor-pointer rounded-2xl transition-200"
    :class="{ on: modelValue }"
    @click="toggleValue"
  >
    <div class="dot rounded-full transition-200"></div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: Boolean): void
}>()

function toggleValue() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style lang="scss" scoped>
@import 'src/styles/colors';

.ui-switch {
  background-color: $color-white;
  position: relative;
  height: 28px;
  width: 48px;

  &.on {
    background-color: $color-black;
    .dot {
      left: 24px;
    }
  }
  .dot {
    background-color: $color-accent;
    position: absolute;
    top: 4px;
    left: 4px;
    height: 20px;
    width: 20px;
  }
}
</style>
