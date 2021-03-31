import { combineReducers } from "redux"

import { fetchWords } from './words/list'
import { fetchSearch } from './words/search'

const rootReducer = combineReducers({
    wordStore: fetchWords,
    searchStore: fetchSearch,
})

export default rootReducer