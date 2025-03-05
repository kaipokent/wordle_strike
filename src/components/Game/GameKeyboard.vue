<script setup lang="ts">
import { CornerDownLeft, Delete } from 'lucide-vue-next'

defineEmits(['keyClick'])

const rows: string[] = ['q w e r t y u i o p', 'a s d f g h j k l', 'delete z x c v b n m enter']
</script>

<template>
  <div id="keyboard">
    <div v-for="(row, i) in rows" :key="i" class="flex justify-center items-center gap-1 mb-1">
      <div class="spacer invisible" v-if="i === 1"></div>
      <Button
        v-for="key in row.split(' ')"
        :key="key"
        :class="[
          'cursor-pointer text-xl min-h-14 p-0 flex-1',
          { 'wide-key': key === 'enter' || key === 'delete' },
        ]"
        variant="keyboard-default"
        @click="$emit('keyClick', key)"
      >
        <CornerDownLeft
          v-if="key === 'enter'"
          aria-label="enter"
          class="w-6! h-6!"
          :stroke-width="2.5"
        />
        <Delete
          v-else-if="key === 'delete'"
          aria-label="delete"
          class="w-6! h-6!"
          :stroke-width="2.5"
        />
        <template v-else>{{ key.toUpperCase() }}</template>
      </Button>
      <div class="spacer invisible" v-if="i === 1"></div>
    </div>
  </div>
</template>

<style scoped>
.spacer {
  flex: 0.5;
}
.wide-key {
  flex: 1.5;
}
</style>
