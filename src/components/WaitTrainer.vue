<template>
  <div class="container container--main">
    <h2>
      <span>Hand</span>
    </h2>

    <hand-viewer :hand="question"/>

    <h2 class="m-t-2">
      <span>What is the wait?</span>
    </h2>

    <form
      v-show="status === 'user'"
      @submit="submitAnswer"
    >
      <answer-input v-model="userAnswer" :suits="question.hand.reduce((agg, x) => { const suit = x[1]; if (!agg.includes(suit)) { agg.push(suit); } return agg }, []).sort()"/>

      <div class="bottom-buttons">
        <button class="large">Submit</button>
      </div>
    </form>

    <div
      v-show="status !== 'user'"
      class="txt-center"
    >
      <div
        v-show="status === 'good'"
        class="m-t-2"
      >
        <font-awesome-icon
          :icon="faCheckCircle"
          style="font-size: 50px; color: var(--dark-green);"
        />
      </div>

      <div
        v-show="status === 'bad'"
        class="m-t-2"
      >
        <font-awesome-icon
          :icon="faTimesCircle"
          style="font-size: 50px; color: #B33A3A;"
        />
      </div>

      <div class="m-t">
        <div class="row">
          <tile-group>
            <tile v-for="tile in answer" :key="tile" :tile="tile" :small="isMobile || isMedium"/>
          </tile-group>
        </div>
      </div>

      <div class="bottom-buttons">
        <button class="large" @click="nextQuestion">
          <span class="long-desc">Next Question</span>
          <span class="short-desc">Next</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getUkeire, compareTiles } from '@/riichi-fn'
import { Tile, TileGroup } from '@emeraldcoder/riichi-ui-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { ref, computed } from 'vue'
import useWidthTreshold from '../composables/useWidthThreshold'
import { getRandomHandNotUsed } from '../hands-repository'
import AnswerInput from './AnswerInput.vue'
import HandViewer from './HandViewer.vue'

const { isMobile, isMedium } = useWidthTreshold()

const status = ref('user') // can be user (user need to enter a value), good (user gave the right answer) or bad (user gave the wrong answer)

const question = ref(getRandomHandNotUsed())

const answer = computed(() => {
  if (question.value == null) return null
  return getUkeire({
    hand: question.value.hand,
    calls: question.value.calls.map(x => ({ tiles: x.tiles }))
  })
})

const userAnswer = ref([])

function submitAnswer (e) {
  e.preventDefault()
  status.value = ukeireAreIdentical(userAnswer.value, answer.value) ? 'good' : 'bad'
}

function nextQuestion () {
  window.scrollTo(0, 0)

  const nextQuestion = getRandomHandNotUsed()

  if (nextQuestion == null) {
    // #TODO: Should not happen when we'll implement the random questions
    alert('No more questions')
  } else {
    question.value = nextQuestion
    userAnswer.value = []
    status.value = 'user'
  }
}

function ukeireAreIdentical (a, b) {
  if (a.length !== b.length) return false

  const sortedA = a.slice().sort(compareTiles)
  const sortedB = b.slice().sort(compareTiles)

  for (let i = 0; i < sortedA.length; i++) {
    if (compareTiles(sortedA[i], sortedB[i]) !== 0) return false
  }

  return true
}
</script>

<style>
.bottom-buttons {
  padding-top: calc(var(--gap-size) * 2);
  width: 100%;
  display: flex;
  justify-content: center;
  gap: var(--gap-size);
  max-width: 1000px;
  margin: auto;
}

.bottom-buttons button {
  flex: 1;
  border-radius: 0;
}

.bottom-buttons button .short-desc {
  display: none;
}

@media (max-width: 1920px) {
  .bottom-buttons {
    gap: unset;
    max-width: unset;

    position: fixed;
    bottom: 0;
    left: 0;
  }

  .container--main {
    padding-bottom: 70px;
  }
}

@media (max-width: 767px) {
  .bottom-buttons button .short-desc {
    display: block;
  }

  .bottom-buttons button .long-desc {
    display: none;
  }
}
</style>
