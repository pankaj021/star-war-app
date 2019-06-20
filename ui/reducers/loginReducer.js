import * as actions from '../actions/actionType';

const initState = {
    isError: false,
    isLoading: false,
    loginErrorMsg: '',
    username: username || '',
    planets: []
}
const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case actions.VERIFYING_CREDENTIALS :
        case actions.LOADING_PLANETS: 
            return {...state, isLoading: true, isError: false};
        case actions.VERIFY_CREDENTIALS_SUCCESS :
        case actions.LOAD_PLANETS_SUCCESS: 
            return {
                ...state, 
                isLoading: false, isError: false, 
                username: action.payLoad.person.name, 
                planets: action.payLoad.planets,
                loginErrorMsg: ""
            };
        case actions.VERIFY_CREDENTIALS_FAILURE :
        case actions.LOAD_PLANETS_FAILURE:
            return {
                isLoading: false, isError: true, 
                loginErrorMsg: "Entered Credentials didn't match."
            };
        default:
            return state;
    }
};

export default loginReducer;