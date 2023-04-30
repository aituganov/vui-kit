<template>
  <div class="ui-phone-input grid gap-2">
    <UiLabel>Номер телефона</UiLabel>

    <div class="flex gap-2">
      <UiSelect
        class="code"
        name="code"
        option-value="code"
        option-title="code"
        :disabled="disabled"
        :model-value="codeValue"
        :options="formats"
        @update:modelValue="updateCode"
      />

      <UiInput
        v-if="currentPhoneType"
        class="flex-1"
        name="number"
        :disabled="disabled"
        :field-error-messages="codeErrorMessage || numberErrorMessage"
        :field-mask="currentPhoneType.mask"
        :model-value="numberValue"
        :placeholder="currentPhoneType.placeholder"
        @update:modelValue="updatePhone"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useField } from 'vee-validate'
import type { PhoneAvailable } from './types'
import { UiInput } from '@/components/UiInput'
import { UiLabel } from '@/components/UiLabel'
import { UiSelect } from '@/components/UiSelect'

const props = defineProps({
  disabled: {
    default: false,
    type: Boolean
  },
  formats: {
    required: true,
    type: Array<PhoneAvailable>
  },
  code: {
    default: '',
    type: String
  },
  number: {
    default: '',
    type: String
  },
  required: {
    default: false,
    type: Boolean
  }
})
const emit = defineEmits<{
  (e: 'update:code', val: string): void
  (e: 'update:number', val: string): void
}>()

const { value: codeValue, errorMessage: codeErrorMessage } = useField(
  'code',
  props.required ? 'required' : '',
  {
    initialValue: props.code,
    validateOnValueUpdate: true
  }
)
const {
  value: numberValue,
  errorMessage: numberErrorMessage,
  validate: numberValidate
} = useField('number', _phoneValidator, {
  initialValue: props.number,
  validateOnValueUpdate: true
})
const currentPhoneType = computed<PhoneAvailable | undefined>(() => {
  return props.formats.find(
    (elm: PhoneAvailable) => elm.code === codeValue.value
  )
})

function updateCode(val: string | number) {
  emit('update:code', val.toString())
}
function updatePhone(val: string | number) {
  emit('update:number', val.toString())
}
function _phoneValidator(val: string) {
  if (props.required && !val) {
    return 'Введите номер телефона'
  }
  if (
    (!props.required && !val) ||
    val.length === currentPhoneType.value?.length
  ) {
    return true
  }
  return 'Неверный формат телефона'
}
watch(
  () => props.code,
  (val: string) => {
    codeValue.value = val
    numberValidate()
  }
)
watch(
  () => props.number,
  (val: string) => (numberValue.value = val)
)
watch(
  () => props.formats,
  async (newVal: PhoneAvailable[]) => {
    if (newVal && newVal.length && !currentPhoneType.value) {
      updateCode(newVal[0].code)
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.ui-phone-input {
  .code {
    width: 105px;
  }
}
</style>
