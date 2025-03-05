<script setup lang="ts">
import { type Letter } from '@/lib/words.ts'

const props = defineProps<{ row: Letter[]; rowNum: number }>()
</script>

<template>
  <div class="flex flex-1 gap-1 justify-between">
    <GameTile v-for="(tile, i) in props.row" :key="`${rowNum}-${i}-${tile.letter}`" :tile="tile" />
  </div>
</template>
