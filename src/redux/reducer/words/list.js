import { FETCH_WORD_LIST, RECEIVE_WORD_LIST, FAILED_WORD_LIST } from '../../action/words/list'

const defaultState = {
    words: []
}

export function fetchWords(state = defaultState, action){
    switch(action.type){
        case FETCH_WORD_LIST:
            return ({ words: [], inProgress: true })
        case RECEIVE_WORD_LIST:
            return Object.assign({}, state, { words: action.payload, inProgress: false })
        case FAILED_WORD_LIST:
            return ({ words: [], inProgress: false })
        default:
            return state
    }
}