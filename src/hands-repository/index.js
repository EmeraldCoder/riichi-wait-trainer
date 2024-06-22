import groups from './hands.json'

let randomGroupHands = null

export function getRandomHandNotUsed () {
  if (randomGroupHands == null) {
    randomGroupHands = groups.slice()
    shuffleArray(randomGroupHands)
  }

  const hand = randomGroupHands.shift()

  return hand
}

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}
