import { AsyncStorage } from 'react-native'

const DECK_STORAGE_KEY = 'flashcard:storage'

export function getDecks() {

  const initialDeck = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
        },
      ],
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.',
        },
      ],
    },
  }

  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(result => {
      if (result !== null) {
        const data = JSON.parse(result)
        return data
      } else {
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initialDeck))
        return initialDeck
      }
    })
}

export function getDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((result) => {
      const decks = JSON.parse(result)
      const deck = decks[title]
      return deck
    })
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: [],
    }
  }))
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((result) => {
      const decks = JSON.parse(result)
      const deck = decks[title]
      deck.questions.push(card)
      return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
        [title]: { ...deck }
      }))
    })
}
