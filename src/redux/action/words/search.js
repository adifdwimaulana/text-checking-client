import axios from 'axios'
import * as API_LINKS from '../../../config/link'
import { toast } from 'react-toastify'

export const FETCH_SEARCH_LIST = 'FETCH_SEARCH_LIST'
export const RECEIVE_SEARCH_LIST = 'RECEIVE_SEARCH_LIST'
export const FAILED_SEARCH_LIST = 'FAILED_SEARCH_LIST'
export const RESET_SEARCH_LIST = 'RESET_SEARCH_LIST'

export function fetchSearch(data){

    if(data == 'reset'){
        return (dispatch) => {
            dispatch({ type: RESET_SEARCH_LIST })
        }
    }

    return (dispatch) => {
        dispatch({ type: FETCH_SEARCH_LIST })

        axios({
            method: 'POST',
            url: API_LINKS.WORD_SEARCH_URL,
            data: { input: data }
        })
        .then((response) => {
            if(response.status === 200){
                if(response.data.status === 200){
                    dispatch({
                        type: RECEIVE_SEARCH_LIST,
                        payload: response.data.result
                    })
                } else {
                    dispatch({ type: FAILED_SEARCH_LIST })
                    return toast.error(response.data.message)
                }
            }
        })
        .catch((error) => {
            if (error.response) {
                if(error.response.status === 401) {
                    dispatch({
                        type: FAILED_SEARCH_LIST
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 403) {
                    dispatch({
                        type: FAILED_SEARCH_LIST
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 400) {
                    dispatch({
                        type: FAILED_SEARCH_LIST
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 404 || error.response.status === 500) {
                    dispatch({
                        type: FAILED_SEARCH_LIST
                    })
                    return toast.error("Server cannot be contacted! Please ask your system administrator!");
                } else {
                    dispatch({
                        type: FAILED_SEARCH_LIST
                    })
                    return toast.error('Something went wrong... Please try again later...')
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
                dispatch({
                    type: FAILED_SEARCH_LIST
                })
                return toast.error('Request error! Please try again later...')
            } else {
                // Something happened in setting up the request that triggered an Error
                dispatch({
                    type: FAILED_SEARCH_LIST
                })
                return toast.error('Something went wrong... Please try again later...')
                // return toast.error(error.message);
            }
        })
    }
}