import { GET_QUESTION_SET, ADD_QUESTION_SET, ADD_QUESTION } from '../actions/actionTypes'

function decks(state = {}, action) {
  switch (action.type) {
    case GET_QUESTION_SET :
      return {
        ...action.decks
      }
    case ADD_QUESTION :
    return {
      ...state,
      [action.title]: {
        ...state[action.title],
        questions: [
          ...state[action.title].questions,
          action.card
        ]
      }
    }
    case ADD_QUESTION_SET :
    return {
      ...state,
      [action.title]: {
        title: action.title,
        questions: []
      }
    }
    default :
      return state
  }
}

export default decks
