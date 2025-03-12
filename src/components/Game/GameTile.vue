<script setup lang="ts">
import type { Letter } from '@/lib/words.ts'

defineProps<{ tile: Letter }>()
</script>

<template>
  <div :class="['game-tile text-4xl font-bold text-zinc-700', tile.state]">
    {{ tile.letter.toUpperCase() }}
  </div>
</template>
