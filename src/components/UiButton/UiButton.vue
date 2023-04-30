<template>
  <button
    v-bind="$attrs"
    class="ui-button flex items-center justify-center gap-2 px-8 rounded-md transition-200"
    :class="{
      'is-disabled': disabled,
      sm: sm,
      xs: xs,
      icon: icon,
      outlined: outlined
    }"
    :disabled="disabled"
    :type="type"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>

defineProps({
  disabled: {
    default: false,
    type: Boolean
  },
  icon: {
    default: false,
    type: Boolean
  },
  outlined: {
    default: false,
    type: Boolean
  },
  sm: {
    default: false,
    type: Boolean
  },
  xs: {
    default: false,
    type: Boolean
  },
  type: {
    type: String,
    validator: (val: string) => {
      return [
        'button',
        'submit',
        'reset'
      ].includes(val)
    }
  }
})
</script>

<style lang="scss" scoped>
@import 'src/styles/colors';
$color-accent-hover: #ffcc00;

.ui-button {
  background-color: $color-accent;
  color: $color-black;
  font-weight: 550;
  font-size: 16px;
  height: 48px;

  &.icon {
    height: 48px;
    padding: 0 12px;
  }

  &.outlined {
    background-color: transparent;
    border: 1px solid rgba($color-accent, 0.7);
    color: $color-accent;

    @media (prefers-color-scheme: dark) {
      background-color: $color-black;
    }
  }

  &.sm {
    height: 40px;
  }
  &.xs {
    font-size: 12px;
    height: 32px;
    padding: 0 10px;
  }

  &:not(.is-disabled):hover {
    background-color: $color-accent-hover;
    &.outlined {
      background-color: rgba($color-accent, 0.2);
      border-color: $color-accent-hover;
      color: $color-accent-hover;
    }
    &:active {
      transform: translateY(1px);
    }
  }

  &.is-disabled {
    opacity: 0.4;
  }
}
</style>
