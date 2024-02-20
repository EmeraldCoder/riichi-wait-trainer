<template>
  <div class="container container--main">
    <h2>
      <span>Hand</span>
    </h2>

    <hand-viewer :hand="winningHand"/>

    <h2 class="m-t-2">
      <span>What is the wait?</span>
    </h2>

    <form
      v-show="status === 'user'"
      autocomplete="false"
      @submit="submitAnswer"
    >
      <answer-input v-model="userAnswer"/>

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
          :icon="validAnswerIcon"
          style="font-size: 50px; color: var(--dark-green);"
        />

        <div class="m-t bold">
          The hand wait is {{ JSON.stringify(handInfo.ukeire) }}
        </div>
      </div>

      <div
        v-show="status === 'bad'"
        class="m-t-2"
      >
        <font-awesome-icon
          :icon="invalidAnswerIcon"
          style="font-size: 50px; color: #B33A3A;"
        />

        <div class="m-t bold">
          The hand wait is {{ JSON.stringify(handInfo.ukeire) }} not {{ userAnswer }}
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

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { ref, computed } from 'vue'
import { getRandomHandNotUsed } from './../hands-repository'
import AnswerInput from './AnswerInput.vue'
import HandViewer from './HandViewer.vue'
import { getUkeire } from '@emeraldcoder/riichi-fn/src/getUkeire'
import { compareTiles } from '@emeraldcoder/riichi-fn/src/compareTiles'

export default {
  components: {
    FontAwesomeIcon,
    HandViewer,
    AnswerInput
  },

  setup () {
    // Question

    const winningHand = ref(getRandomHandNotUsed())

    const handInfo = computed(() => {
      if (winningHand.value == null) return null

      try {
        const hand = {
          hand: winningHand.value.hand,
          calls: winningHand.value.calls.map(x => ({ tiles: x.tiles }))
        }

        return {
          ukeire: getUkeire(hand).sort(compareTiles)
        }
      } catch (e) {
        console.error('error analysis hand:', winningHand.value.id)
        console.error(e)
      }

      return undefined
    })

    // Answer

    const userAnswer = ref([])
    const status = ref('user') // can be user (user need to enter a value), good (user gave the right answer) or bad (user gave the wrong answer)

    const submitAnswer = (e) => {
      e.preventDefault()

      if (ukeireAreIdentical(handInfo.value.ukeire, userAnswer.value)) {
        status.value = 'good'
      } else {
        status.value = 'bad'
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

    const nextQuestion = () => {
      const nextWinningHand = getRandomHandNotUsed()

      if (nextWinningHand == null) {
        // #TODO: Should not happen when we'll implement the random questions
        alert('No more questions')
      } else {
        winningHand.value = nextWinningHand
      }

      userAnswer.value = []
      status.value = 'user'

      window.scrollTo(0, 0)
    }

    return {
      handInfo,
      submitAnswer,
      userAnswer,
      status,
      validAnswerIcon: faCheckCircle,
      invalidAnswerIcon: faTimesCircle,
      nextQuestion,
      winningHand
    }
  }
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
