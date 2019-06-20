import * as actions from '../actionType';
import axios from 'axios';

export function verifyUserCredential(username, password) {
    return (dispatch) => {
        dispatch({type: actions.VERIFYING_CREDENTIALS});    
        axios.post('/login', { username, password})
        .then( response => dispatch({type: actions.VERIFY_CREDENTIALS_SUCCESS, payLoad: response.data.data}))
        .catch( (err) => dispatch({type: actions.VERIFY_CREDENTIALS_FAILURE, payLoad: err.message}));
    }
}

export function loadPlanets() {
    return (dispatch) => {
        dispatch({type: actions.LOADING_PLANETS});    
        axios.get('/planets')
        .then( response => dispatch({type: actions.LOAD_PLANETS_SUCCESS, payLoad: response.data.data}))
        .catch( (err) => dispatch({type: actions.LOAD_PLANETS_FAILURE, payLoad: err.message}));
    }  
}
