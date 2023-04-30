<template>
  <div
    v-bind="$attrs"
    class="ui-checkbox grid grid-flow-col gap-3 items-center cursor-pointer"
    :class="{ error: error, selected: modelValue }"
    @click="toggle"
  >
    <!--  TODO: setup input instead of div  -->
    <div
      class="box rounded-lg flex items-center justify-center transition-200"
      tabindex="0"
      @keyup.space="toggle"
    >
      <svg
        v-if="modelValue"
        width="11"
        height="8"
        viewBox="0 0 11 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 4L4 7L10 1"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="text-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  error: {
    default: false,
    type: Boolean
  },
  modelValue: {
    default: false,
    type: Boolean
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: Boolean): void
}>()

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style lang="scss" scoped>
@import 'src/styles/colors';

.ui-checkbox {
  &.error {
    .box {
      border-color: $color-accent;
    }
  }
  &.selected {
    .box {
      background-color: $color-accent;
      border-color: $color-accent;
    }
  }
  .box {
    border: 2px solid $color-disabled;
    outline: none;
    height: 24px;
    width: 24px;
    &:focus {
      box-shadow: 0 0 0 4px rgba($color-accent, 0.2);
    }
  }
  .text-wrapper {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.2px;
  }
}
</style>
