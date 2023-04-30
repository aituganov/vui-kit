<template>
  <div class="ui-toast-list">
    <div v-if="hasMessages" class="list-wrapper grid gap-2">
      <UiToastListItem v-for="mess in messages" :message="mess" :key="mess.id" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { Message } from './types'
import UiToastListItem from './UiToastListItem.vue'

const props = defineProps<{
  messages: Message[]
}>()

const messages = ref(props.messages)
const hasMessages = computed(() => messages.value.length > 0)
</script>

<style lang="scss" scoped>
.ui-toast-list {
  position: absolute;
  bottom: 0;
  right: 0;
  .list-wrapper {
    padding: 12px;
  }
}
</style>
