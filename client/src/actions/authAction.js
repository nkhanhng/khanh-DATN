import { GET_ERRORS, SET_CURRENT_USER } from "./type"
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
            .then(res => history.push('/login'))
            .catch(err => 
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            )
}

//Login - Get user token
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //save to local store
            const { token } = res.data;
            //set token to ls
            localStorage.setItem('jwtToken', token);
            //Set token to Header
            setAuthToken(token);
            //Decode token
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

//Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Logout user
export const logoutUser = () => dispatch => {
    //remove token
    localStorage.removeItem('jwtToken');
    // remove auth header
    setAuthToken(false);
    //Set current user to {} and isAuthenticated to false
    dispatch(setCurrentUser({}))
}