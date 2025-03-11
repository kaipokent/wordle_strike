<script setup lang="ts">
import { getRandomAnswer, LetterState, MAX_GUESSES, WORD_LENGTH, allWords } from '@/lib/words.ts'
import type { Letter } from '@/lib/words.ts'
import GameBoardRow from '@/components/Game/GameBoardRow.vue'

type Board = Array<Array<Letter>>

const answer = ref(getRandomAnswer())

const board = ref<Board>(
  Array.from({ length: MAX_GUESSES }, () =>
    Array.from({ length: WORD_LENGTH }, () => ({ letter: '', state: LetterState.INITIAL })),
  ),
)
const currentRow = ref(board.value[0])
const currentTileIndex = ref(0)
const allowInput = ref(true)

const currentWord = computed(() => currentRow.value.reduce((acc, cur) => acc + cur.letter, ''))
const isAcceptableWord = computed(
  () => currentWord.value.length === WORD_LENGTH && allWords.includes(currentWord.value),
)

const fillTile = (key: string) => {
  const lastIndex = WORD_LENGTH - 1

  // If this is the last letter, and it is already filled, skip input
  if (
    currentTileIndex.value === lastIndex &&
    currentRow.value[currentTileIndex.value].letter.length > 0
  ) {
    return
  }
  if (currentTileIndex.value < WORD_LENGTH) {
    currentRow.value[currentTileIndex.value].letter = key

    // Do not increment tile index if this is the last letter
    if (currentTileIndex.value < lastIndex) {
      currentTileIndex.value++
    } else {
      // TODO: Check if this is an acceptable word. If not, shake and highlight red
      console.log('Is a real word?', isAcceptableWord.value)
    }
  }
}

const clearTile = () => {
  const lastIndex = WORD_LENGTH - 1
  const isLastLetter =
    currentTileIndex.value === lastIndex &&
    currentRow.value[currentTileIndex.value].letter.length > 0

  if (currentTileIndex.value > 0 && !isLastLetter) currentTileIndex.value--
  currentRow.value[currentTileIndex.value].letter = ''
}

const completeRow = () => {}

const onKey = (key: string) => {
  if (!allowInput) return
  if (/^[a-zA-Z]$/.test(key)) {
    fillTile(key.toLowerCase())
  } else if (key === 'Backspace' || key === 'delete') {
    clearTile()
  } else if (key === 'Enter') {
    completeRow()
  }
}

const onKeyup = (e: KeyboardEvent) => onKey(e.key)

window.addEventListener('keyup', onKeyup)

onUnmounted(() => {
  window.removeEventListener('keyup', onKeyup)
})
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="game-board self-center flex flex-col gap-1 p-2.5">
      <GameBoardRow v-for="(row, i) in board" :key="`row ${i}`" :row="row" :rowNum="i" />
    </div>
    {{ answer }}
    <GameKeyboard @key-click="onKey" />
  </div>
</template>
