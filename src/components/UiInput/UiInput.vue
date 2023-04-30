<template>
  <div
    class="ui-input grid gap-2"
    :class="{ error: errorMessage || fieldErrorMessages, focused: focused }"
  >
    <UiLabel v-if="label">
      {{ label }}
    </UiLabel>

    <div
      class="input-content border cursor-text overflow-hidden rounded-lg flex items-center justify-center transition-200"
      :class="padding"
      @click="selectInput"
    >
      <slot name="prepend" />

      <input
        v-if="fieldMask"
        v-bind="$attrs"
        v-maska
        ref="input"
        class="w-full"
        :aria-label="ariaLabel"
        :class="padding"
        :data-maska="fieldMask"
        :disabled="disabled"
        :maxlength="lengthMax"
        :name="name"
        :placeholder="placeholder"
        :type="type"
        @blur="onBlur"
        @focus="onFocus"
        @keyup.delete="emit('backspace', $event)"
        @maska="onMask"
        @paste="emit('paste', getClipboardData($event))"
      />

      <input
        v-else
        v-bind="$attrs"
        v-model="value"
        class="w-full"
        ref="input"
        :aria-label="ariaLabel"
        :class="padding"
        :disabled="disabled"
        :maxlength="lengthMax"
        :name="name"
        :placeholder="placeholder"
        :type="type"
        @blur="onBlur"
        @focus="onFocus"
        @keyup.delete="emit('backspace', $event)"
        @paste="emit('paste', getClipboardData($event))"
      />

      <slot name="append" />
    </div>

    <div class="error-wrapper">
      <UiErrorMessage :error-messages="errorMessage || fieldErrorMessages" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { MaskaDetail } from 'maska'
import { computed, ref } from 'vue'
import { useField } from 'vee-validate'
import { UiLabel } from '@/components/UiLabel'
import { UiErrorMessage } from '@/components/UiErrorMessage'

const props = defineProps({
  ariaLabel: {
    required: false,
    type: String
  },
  autofocus: {
    default: false,
    type: Boolean
  },
  dense: {
    default: false,
    type: Boolean
  },
  disabled: {
    default: false,
    type: Boolean
  },
  label: {
    required: false,
    type: String
  },
  fieldErrorMessages: {
    type: [Array<String>, String]
  },
  fieldMask: {
    required: false,
    type: [String, Array<String>]
  },
  lengthMax: {
    type: [Number, String]
  },
  name: {
    required: false,
    type: String
  },
  placeholder: {
    required: false,
    type: String
  },
  rules: {
    default: '',
    type: String
  },
  type: {
    default: 'text',
    type: String,
    validator: (val: string) => {
      return [
        'button',
        'checkbox',
        'color',
        'date',
        'datetime-local',
        'email',
        'file',
        'hidden',
        'image',
        'month',
        'number',
        'password',
        'radio',
        'range',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'time',
        'url',
        'week'
      ].includes(val)
    }
  },
  modelValue: {
    required: false,
    type: [Number, String]
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: number | string): void
  (e: 'backspace', ev: Event): void
  (e: 'blur', ev: Event): void
  (e: 'focus', ev: Event): void
  (e: 'paste', ev: string): void
}>()
const padding = computed(() => (props.dense ? 'px-2' : 'px-3'))
const input = ref()
const focused = ref(false)
const name = ref(props.name || '')
const rules = ref(props.rules)
// value for no mask
const { errorMessage, value } = useField(name, rules, {
  initialValue: props.modelValue
})

function getClipboardData(event: ClipboardEvent): string {
  return event.clipboardData ? event.clipboardData.getData('text/plain') : ''
}

function onBlur(e: Event) {
  focused.value = false
  emit('blur', e)
}
function onFocus(e: Event) {
  focused.value = true
  emit('focus', e)
}
function onMask(e: CustomEvent<MaskaDetail>) {
  emit('update:modelValue', e.detail.unmasked)
}
function selectInput() {
  if (props.autofocus) {
    input.value.select()
  } else {
    input.value.focus()
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/colors';
@import 'src/styles/vars';

.ui-input {
  &.error,
  &.focused {
    .input-content {
      border-width: 2px;
    }
  }
  &.focused {
    .input-content {
      border-color: $color-black;

      @media (prefers-color-scheme: dark) {
        border: 1px solid var(--vt-c-white);
      }
    }
  }
  &.error {
    .input-content {
      background-color: rgba($color-error, 0.1);
      border-color: $color-error;
    }
  }

  .input-content {
    background-color: var(--vt-c-white);
    border: 1px solid var(--color-border);
    height: $input-height;

    &:has(:-webkit-autofill) {
      background-color: #faffbd;
      color: black;
    }

    @media (prefers-color-scheme: dark) {
      background-color: var(--vt-c-black);
    }

    input {
      background-color: transparent;
      font-weight: 500;
      font-size: 16px;
      height: 100%;
      line-height: 19px;
      outline: none !important;
      &::placeholder {
        color: $color-brown;
        font-weight: 400;
        opacity: 0.5;
      }
      &:-ms-input-placeholder {
        color: $color-brown;
        font-weight: 400;
        opacity: 0.5;
      }
      &::-ms-input-placeholder {
        color: $color-brown;
        font-weight: 400;
        opacity: 0.5;
      }
    }
  }
  .error-wrapper {
    height: 20px;
    min-height: 20px;
  }
}
</style>
