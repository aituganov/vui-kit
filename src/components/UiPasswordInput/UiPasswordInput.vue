<template>
  <div class="ui-password-input">
    <UiInput
      v-model="pwdField.value.value"
      autocomplete="new-password"
      label="Пароль"
      :name="pwdName"
      :type="passwordType"
    >
      <template #prepend>
        <UiIcon name="lock-closed" />
      </template>
      <template #append>
        <UiIcon
          accent
          class="cursor-pointer"
          :name="isHiddenPassword ? 'eye' : 'eye-off'"
          @click="togglePasswordType"
        />
      </template>
    </UiInput>

    <div v-if="hasReset" class="password-reset cursor-pointer">
      <a @click="$emit('password-reset')">Забыли пароль?</a>
    </div>

    <UiInput
      v-if="pwdConfirmField"
      v-model="pwdConfirmField.value.value"
      autocomplete="new-password"
      label="Подтверждение пароля"
      :name="pwdConfirmName"
      :type="passwordType"
    >
      <template #prepend>
        <UiIcon name="shield-check" />
      </template>
    </UiInput>
  </div>
</template>

<script lang="ts" setup>
import { useField } from 'vee-validate'
import { computed, ref } from 'vue'
import { UiIcon } from '@/components/UiIcon'
import { UiInput } from '@/components/UiInput'

const passwordTypes = ['password', 'text']
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  hasConfirmation: {
    default: false,
    type: Boolean
  },
  hasReset: {
    default: false,
    type: Boolean
  },
  name: {
    default: 'password',
    type: String
  },
  label: {
    type: String
  },
  placeholder: {
    type: String,
    default: ''
  },
  rules: {
    required: false,
    type: String
  }
})
defineEmits<{
  (e: 'password-reset'): void
  (e: 'update:modelValue', val: Number | String): void
}>()
const passwordType = ref(passwordTypes[0])
const isHiddenPassword = computed(() => passwordType.value === passwordTypes[0])
const pwdName = ref(props.name)
const pwdRules = ref(props.rules)
const pwdConfirmName = ref(`${props.name}Confirm`)
const pwdConfirmRules = ref(`${props.rules}|confirmed:@${pwdName.value}`)

const pwdField = useField<string>(pwdName, pwdRules, {
  initialValue: props.modelValue
})
const pwdConfirmField = props.hasConfirmation
  ? useField<string>(pwdConfirmName, pwdConfirmRules)
  : null

const togglePasswordType = () =>
  (passwordType.value = isHiddenPassword.value
    ? passwordTypes[1]
    : passwordTypes[0])
</script>

<style lang="scss" scoped>
.ui-password-input {
  position: relative;
  .password-reset {
    font-size: 14px;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
