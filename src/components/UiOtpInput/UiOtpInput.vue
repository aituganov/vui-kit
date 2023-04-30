<template>
  <div class="ui-otp flex gap-2 mx-auto">
    <div v-for="(item, idx) in items" :key="idx" :ref="(el) => setRef(el, idx)">
      <UiInput
        v-model="item.valueRef"
        autofocus
        class="editor"
        dense
        length-max="1"
        :disabled="disabled"
        @backspace="onBackspace(idx)"
        @paste="fillFromStr"
        @update:modelValue="partChanged($event, idx, item)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { UiInput } from '@/components/UiInput'

interface OTPItem {
  elmRef?: any
  valueRef?: any
}

const props = defineProps({
  disabled: {
    default: false,
    type: Boolean
  },
  length: {
    default: 6,
    type: [Number, String]
  },
  modelValue: {
    type: String
  }
})
const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
  (e: 'finish', val: string): void
}>()
const items = ref<OTPItem[]>([])

function fillFromStr(str: string) {
  const preparedString = str.replace(' ', '')
  const limit = Math.min(preparedString.length, +props.length)
  for (let i = 0; i < limit; i++) {
    items.value[i].valueRef = preparedString[i]
  }
  selectEmpty()
}
function _getValue(): string {
  return items.value.map((item: OTPItem) => item.valueRef).join('')
}
function _select(item: OTPItem) {
  setTimeout(() => item.elmRef.querySelector('input').select(), 50) // select after all actions
}
function onBackspace(idx: number) {
  if (idx === 0) {
    return
  }
  _select(items.value[idx - 1])
}
function setRef(el: any, idx: number) {
  items.value[idx].elmRef = el
}
function selectEmpty() {
  let empty
  for (let i = 0; i < +props.length; i++) {
    if (!items.value[i].valueRef) {
      empty = items.value[i]
      break
    }
  }
  const val = _getValue()
  emit('update:modelValue', val)
  if (empty) {
    _select(empty)
  } else {
    emit('finish', val)
  }
}
function partChanged(val: number | string, idx: number, item: OTPItem) {
  const strVal = val.toString()
  if (strVal.length > 1) {
    // handle autofill
    fillFromStr(strVal)
    return
  }
  const empties: { idx: number; val: OTPItem }[] = []
  for (let i = 0; i < +props.length; i++) {
    if (!items.value[i].valueRef) {
      empties.push({ idx: i, val: items.value[i] })
    }
  }
  if (empties[0] && empties[0].idx < idx) {
    nextTick(() => {
      empties[0].val.valueRef = val.toString()
      item.valueRef = ''
      empties.splice(0, 1)
      selectEmpty()
    })
  } else {
    selectEmpty()
  }
}

onMounted(() => selectEmpty())

watch(
  () => props.length,
  (val: number | string) => {
    items.value = []
    for (let i = 0; i < +val; i++) {
      items.value.push({
        valueRef: ref(props.modelValue ? props.modelValue[i] : ''),
        elmRef: ref(null)
      })
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.ui-otp {
  .editor {
    width: 44px;
  }
}
</style>
