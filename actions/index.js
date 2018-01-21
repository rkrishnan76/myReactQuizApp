import { GET_QUESTION_SET, ADD_QUESTION_SET, ADD_QUESTION } from '../actions/actionTypes'

export const recieveDecks = (decks) => {
  return {
    type: GET_QUESTION_SET,
    decks,
  }
}

export const addDeck = (title) => {
  return {
    type: ADD_QUESTION_SET,
    title,
  }
}

export const addCard = (title, card) => {
  return {
    type: ADD_QUESTION,
    title,
    card
  }
}
