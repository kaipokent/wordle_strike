<script setup lang="ts">
import type { Letter } from '@/lib/words.ts'
import { allWords, getRandomAnswer, LetterState, MAX_GUESSES, WORD_LENGTH } from '@/lib/words.ts'
import GameBoardRow from '@/components/Game/GameBoardRow.vue'

type Board = Array<Array<Letter>>

const answer = ref(getRandomAnswer())

const board = ref<Board>(
  Array.from({ length: MAX_GUESSES }, () =>
    Array.from({ length: WORD_LENGTH }, () => ({ letter: '', state: LetterState.INITIAL })),
  ),
)

const currentRowIndex = ref(0)
const currentTileIndex = ref(0)
const allowInput = ref(true)
const inErrorState = ref(false)
const guesses = ref<string[]>([])

const currentRow = computed(() => board.value[currentRowIndex.value])
const currentWord = computed(() => currentRow.value.reduce((acc, cur) => acc + cur.letter, ''))
const isAcceptableWord = computed(
  () => currentWord.value.length === WORD_LENGTH && allWords.includes(currentWord.value),
)

const clearErrorState = () => {
  currentRow.value.forEach((tile) => (tile.state = LetterState.INITIAL))
}

const clearRow = () => {
  currentRow.value.forEach((tile) => {
    tile.letter = ''
    tile.state = LetterState.INITIAL
  })
  currentTileIndex.value = 0
}

const fillTile = (key: string) => {
  const lastIndex = WORD_LENGTH - 1

  // If this is the last letter, and it is already filled, skip input
  if (
    currentTileIndex.value === lastIndex &&
    currentRow.value[currentTileIndex.value].letter.length > 0
  ) {
    return
  }
  if (inErrorState.value) clearErrorState()
  if (currentTileIndex.value < WORD_LENGTH) {
    currentRow.value[currentTileIndex.value].letter = key

    // Do not increment tile index if this is the last letter
    if (currentTileIndex.value < lastIndex) {
      currentTileIndex.value++
    } else {
      if (!isAcceptableWord.value) {
        currentRow.value.forEach((tile) => (tile.state = LetterState.ERROR))
        inErrorState.value = true
      }
    }
  }
}

const clearTile = () => {
  if (inErrorState.value) clearErrorState()

  const lastIndex = WORD_LENGTH - 1
  const isLastLetter =
    currentTileIndex.value === lastIndex &&
    currentRow.value[currentTileIndex.value].letter.length > 0

  if (currentTileIndex.value > 0 && !isLastLetter) currentTileIndex.value--
  currentRow.value[currentTileIndex.value].letter = ''
}

const completeRow = () => {
  if (!isAcceptableWord.value) return
  if (inErrorState.value) clearErrorState()

  // Check for already guessed words
  if (guesses.value.includes(currentWord.value)) {
    alert('Already guessed that...')
    clearRow()
    return
  }
  // Check letter states
  currentRow.value.forEach((letterState, i) => {
    if (letterState.letter === answer.value[i]) {
      letterState.state = LetterState.CORRECT
    } else if (answer.value.indexOf(letterState.letter) > -1) {
      letterState.state = LetterState.PRESENT
    } else {
      letterState.state = LetterState.ABSENT
    }
  })
  // Update keyboard letter state
  // Check is word matches answer
  guesses.value.push(currentWord.value)
  const matchesAnswer = currentWord.value === answer.value
  if (matchesAnswer) {
    alert('Woot, woot. You did it!')
    allowInput.value = false
  } else if (currentRowIndex.value < WORD_LENGTH) {
    currentRowIndex.value++
    currentTileIndex.value = 0
  } else {
    allowInput.value = false
    alert('Womp, womp. All out of guesses :(')
  }
}

const onKey = (key: string) => {
  if (!allowInput.value) return
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
