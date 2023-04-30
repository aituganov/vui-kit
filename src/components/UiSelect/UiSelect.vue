<template>
  <div class="ui-select">
    <UiLabel v-if="label">
      {{ label }}
    </UiLabel>

    <div class="flex">
      <div
        v-bind="$attrs"
        class="content border flex-1 flex items-center rounded-lg"
        :class="{
          'disabled cursor-default': disabled,
          'cursor-pointer': !disabled,
          'is-error': hasError
        }"
        @click="togglePopup"
      >
        <div class="input-content flex-1">
          <div v-if="selected" class="value">
            <slot name="item" v-bind="{ value: selected }">
              <span>{{ selectTitle }}</span>
            </slot>
          </div>
          <div v-else class="placeholder">
            {{ placeholder }}
          </div>
        </div>

        <UiIcon
          v-if="!disabled"
          class="chevron flex-initial"
          xs
          :class="popupIsOpened ? 'up' : 'down'"
          :name="chevronName"
        />

        <div v-if="popupIsOpened" class="select-popup border rounded-lg">
          <div v-if="options.length" class="options">
            <div
              v-for="(option, idx) of options"
              class="option flex items-center"
              :class="{
                selected: isSelected(option),
                disabled: optionDisabled(option)
              }"
              :key="idx"
              @click="selectOption($event, option)"
            >
              <slot name="option" v-bind="{ option }">
                {{ optionTitle ? option[optionTitle] : option }}
              </slot>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="hasClear && !disabled && selected"
        class="clear border cursor-pointer flex items-center justify-center ml-2 rounded-lg"
        @click="$emit('clear')"
      >
        <UiIcon class="close-icon transition-200" name="close" xs />
      </div>
    </div>

    <UiErrorMessage :error-messages="errorMessages" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { UiErrorMessage } from '@/components/UiErrorMessage'
import { UiIcon } from '@/components/UiIcon'
import { UiLabel } from '@/components/UiLabel'

const props = defineProps({
  disabled: {
    default: false,
    type: Boolean
  },
  hasClear: {
    default: false,
    type: Boolean
  },
  errorMessages: {
    default: () => [],
    type: [Array, String]
  },
  label: {
    type: String
  },
  optionDisabled: {
    default: (option: any) => false,
    type: Function
  },
  options: {
    default: () => [],
    type: Array<any>
  },
  optionIcon: {
    type: String
  },
  optionTitle: {
    type: String
  },
  optionValue: {
    type: String
  },
  placeholder: {
    type: String
  },
  modelValue: {
    default: '',
    type: [Number, String]
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void
}>()

const popupIsOpened = ref(false)
const chevronName = computed(() =>
  popupIsOpened.value ? 'chevron-up' : 'chevron-down'
)
const hasError = computed(() => props.errorMessages.length > 0)
const selected = computed(() => {
  if (!props.optionValue) {
    return props.modelValue
  } else if (props.modelValue !== undefined) {
    return props.options.find(
      (elm) => elm[props.optionValue!] === props.modelValue
    )
  } else {
    return null
  }
})
const selectTitle = computed(() => {
  if (!props.optionTitle) {
    return selected.value
  } else if (selected.value) {
    return selected.value[props.optionTitle]
  } else {
    return ''
  }
})
const selectValue = computed({
  get: function () {
    if (!props.optionValue) {
      return selected.value
    } else if (selected.value) {
      return selected.value[props.optionValue]
    } else {
      return ''
    }
  },
  set: function (val) {
    emit('update:modelValue', val)
  }
})

function closePopup() {
  popupIsOpened.value = false
}
function togglePopup() {
  if (props.disabled) {
    return
  }
  popupIsOpened.value = !popupIsOpened.value
}
function isSelected(opt: any) {
  return (
    selectValue.value === (props.optionValue ? opt[props.optionValue] : opt)
  )
}
function selectOption(e: Event, opt: any) {
  e.preventDefault()
  e.stopPropagation()
  if (props.optionDisabled(opt)) {
    return
  }
  selectValue.value = props.optionValue ? opt[props.optionValue] : opt
  closePopup()
}
</script>

<style lang="scss" scoped>
@import 'src/styles/colors';
@import 'src/styles/vars';

.ui-select {
  .clear {
    border-color: $color-border;
    height: $input-height;
    width: $input-height;
    .close-icon {
      opacity: 0.4;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  .content {
    border-color: $color-border;
    padding-left: 18px;
    padding-right: 18px;
    height: $input-height;
    font-weight: 500;
    font-size: 16px;
    position: relative;

    &.disabled {
      background-color: transparent;
    }

    .chevron {
      color: $color-accent;
      &.up {
        z-index: $z-index-popup + 1;
      }
    }
  }

  .select-popup {
    border-color: $color-black;
    background-color: $color-white;
    position: absolute;
    top: -1px;
    left: -1px;
    max-height: 190px;
    max-width: calc(100% + 2px);
    overflow-y: scroll;
    width: calc(100% + 2px);
    z-index: $z-index-popup;

    @media (prefers-color-scheme: dark) {
      background-color: $color-black;
      border-color: var(--vt-c-white);
    }

    .options {
      .option {
        height: 46px;
        padding-left: 18px;
        padding-right: 18px;

        &.disabled {
          opacity: 0.3;
        }

        &:hover,
        &.selected {
          &:not(.disabled) {
            color: $color-red;
          }
        }
      }
    }
  }
}
</style>
