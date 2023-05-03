<template>
  <div v-if="show" class="ui-modal ui-modal-backdrop flex" @click.self="close">
    <div
      class="ui-modal-content flex flex-col justify-center p-6 sm:justify-start sm:p-12 sm:rounded-2xl"
    >
      <div>
        <slot name="title">
          <div v-if="title" v-html="title" class="title mb-8 text-center"></div>
        </slot>

        <div class="close cursor-pointer" @click="close">
          <UiIcon class="icon-close transition-200" name="close" />
        </div>

        <div class="body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { UiIcon } from '@/components/UiIcon'
const props = defineProps({
  show: {
    default: false,
    type: Boolean
  },
  title: {
    default: '',
    type: String
  }
})
const emit = defineEmits<{
  (e: 'close'): void
}>()

function close() {
  emit('close')
}

function _escapeHandler(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.show) {
    close()
  }
}

onMounted(() => document.addEventListener('keyup', _escapeHandler))
onUnmounted(() => document.removeEventListener('keyup', _escapeHandler))

watch(
  () => props.show,
  (val: boolean) => {
    if (val) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
@import 'src/styles/colors';
$color-backdrop: rgba($color-black, 0.5);

.ui-modal {
  &.ui-modal-backdrop {
    z-index: 20;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: $color-backdrop;
    overflow-y: auto;
  }

  .ui-modal-content {
    color: $color-black;
    background-color: $color-white;
    margin: auto;
    min-height: 100vh;
    position: relative;
    width: 100%;

    @screen sm {
      height: auto;
      min-height: unset;
      max-width: 500px;
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      line-height: 120%;

      @screen sm {
        font-size: 36px;
      }
    }

    .close {
      position: absolute;
      top: 16px;
      right: 16px;
      .icon-close {
        opacity: 0.25;
        &:hover {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
