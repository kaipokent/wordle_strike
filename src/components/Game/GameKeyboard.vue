<script setup lang="ts">
import { CornerDownLeft, Delete } from 'lucide-vue-next'

const rows: string[] = ['q w e r t y u i o p', 'a s d f g h j k l', 'enter z x c v b n m delete']
</script>

<template>
  <div id="keyboard">
    <div v-for="(row, i) in rows" :key="i" class="flex justify-center items-center gap-1 mb-1">
      <div class="spacer invisible" v-if="i === 1"></div>
      <Button
        v-for="letter in row.split(' ')"
        :key="letter"
        :class="[
          'cursor-pointer text-xl min-h-14 p-0 flex-1',
          { 'wide-key': letter === 'enter' || letter === 'delete' },
        ]"
        variant="keyboard-default"
      >
        <CornerDownLeft v-if="letter === 'enter'" aria-label="enter" class="w-6! h-6!" />
        <Delete v-else-if="letter === 'delete'" aria-label="delete" class="w-6! h-6!" />
        <template v-else>{{ letter.toUpperCase() }}</template>
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
