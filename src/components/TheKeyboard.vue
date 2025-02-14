<script setup lang="ts">
import { CornerDownLeft, Delete } from 'lucide-vue-next'

const rows: string[] = ['q w e r t y u i o p', 'a s d f g h j k l', 'enter z x c v b n m delete']
</script>

<template>
  <div id="keyboard">
    <div v-for="(row, i) in rows" :key="i" class="flex justify-center items-center">
      <Button
        v-for="letter in row.split(' ')"
        :key="letter"
        class="cursor-pointer m-0.5 text-lg min-h-14"
        variant="keyboard-default"
      >
        <CornerDownLeft v-if="letter === 'enter'" aria-label="Enter" />
        <Delete v-else-if="letter === 'delete'" aria-label="Delete" />
        <span v-else>{{ letter.toUpperCase() }}</span>
      </Button>
    </div>
  </div>
</template>
