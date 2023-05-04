<template>
  <Form class="grid gap-3" @submit="emit('submit', $event)">
    <slot></slot>
  </Form>
  
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate'
const emit = defineEmits<{
  (e: 'submit', values: any): void
}>()
</script>