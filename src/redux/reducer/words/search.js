import { FETCH_SEARCH_LIST, RECEIVE_SEARCH_LIST, FAILED_SEARCH_LIST, RESET_SEARCH_LIST } from '../../action/words/search'

const defaultState = {
    suggestions: [],
    exist: false
}

export function fetchSearch(state = defaultState, action){
    switch(action.type){
        case FETCH_SEARCH_LIST:
            return ({ suggestions: [], exist: false, inProgress: true })
        case RECEIVE_SEARCH_LIST:
            let list = []
            let exist = false

            action.payload.forEach((result) => {
                list.push(result.name)
            })

            if(list.length > 0){
                exist = true
            }

            return Object.assign({}, state, { suggestions: list, exist, inProgress: false })
        case FAILED_SEARCH_LIST:
            return ({ suggestions: [], exist: false, inProgress: false })
        case RESET_SEARCH_LIST:
            return ({ suggestions: [], exist: false, inProgress: false })
        default:
            return state
    }
}