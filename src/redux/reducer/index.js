import { combineReducers } from "redux"

import { fetchWords } from './words/list'

const rootReducer = combineReducers({
    wordStore: fetchWords,
})

export default rootReducer