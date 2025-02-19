<script setup lang="ts">
const MAX_TILES = 5
const MAX_GUESSES = 6
</script>

<template>
  <div class="game-board self-center flex flex-col gap-1 p-2.5">
    <div
      v-for="rowNum in MAX_GUESSES"
      :key="`row ${rowNum}`"
      class="flex flex-1 gap-1 justify-between"
    >
      <GameTile v-for="tileNum in MAX_TILES" :key="tileNum">{{ tileNum }}</GameTile>
    </div>
  </div>
</template>
