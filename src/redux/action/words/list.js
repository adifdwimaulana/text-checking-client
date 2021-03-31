import axios from 'axios'
import * as API_LINKS from '../../../config/link'
import { toast } from 'react-toastify'

export const FETCH_WORD_LIST = 'FETCH_WORD_LIST'
export const RECEIVE_WORD_LIST = 'RECEIVE_WORD_LIST'
export const FAILED_WORD_LIST = 'FAILED_WORD_LIST'

export function fetchWords(){
    return (dispatch) => {
        dispatch({ type: FETCH_WORD_LIST })

        axios({
            method: 'GET',
            url: API_LINKS.WORD_LIST_URL
        })
        .then((response) => {
            if(response.status === 200){
                if(response.data.status === 200){
                    dispatch({
                        type: RECEIVE_WORD_LIST,
                        payload: response.data.result
                    })
                } else {
                    dispatch({ type: FAILED_WORD_LIST })
                    return toast.error(response.data.message)
                }
            }
        })
        .catch((error) => {
            if (error.response) {
                if(error.response.status === 401) {
                    dispatch({
                        type: FAILED_WORD_LIST
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 403) {
                    dispatch({
                        type: FAILED_WORD_LIST
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 400) {
                    dispatch({
                        type: FAILED_WORD_LIST
                    })
                    return toast.error(error.response.data.message);
                } else if (error.response.status === 404 || error.response.status === 500) {
                    dispatch({
                        type: FAILED_WORD_LIST
                    })
                    return toast.error("Server cannot be contacted! Please ask your system administrator!");
                } else {
                    dispatch({
                        type: FAILED_WORD_LIST
                    })
                    return toast.error('Something went wrong... Please try again later...')
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
                dispatch({
                    type: FAILED_WORD_LIST
                })
                return toast.error('Request error! Please try again later...')
            } else {
                // Something happened in setting up the request that triggered an Error
                dispatch({
                    type: FAILED_WORD_LIST
                })
                return toast.error('Something went wrong... Please try again later...')
                // return toast.error(error.message);
            }
        })
    }
}