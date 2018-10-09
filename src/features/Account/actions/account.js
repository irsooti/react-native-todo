import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_ATTEMPT,
  LOGIN_FINISHED,
  LOGOUT,
  SIGNUP_ATTEMPT,
  SIGNUP_FAILED,
  SIGNUP_SUCCESS
} from './actionTypes';
import uuid from 'uuid/v4';
import Axios from 'axios';
import { FIREBASE_API_KEY } from '../../../utils/globalConst';

export const logout = () => ({
  type: LOGOUT
});

export const setLoaderStatus = bool => ({
  type: bool ? LOGIN_ATTEMPT : LOGIN_FINISHED,
  payload: {
    status: bool
  }
});

export const loginSuccessful = (email, token, refreshToken, localId) => ({
  type: LOGIN_SUCCESS,
  payload: {
    email,
    token,
    refreshToken,
    localId
  }
});

export const signUp = (email, password, successFn) => {
  return (dispatch, getState) => {
    console.log('EHI,io qua entro');
    dispatch({
      type: SIGNUP_ATTEMPT
    }),
      Axios.post(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
          FIREBASE_API_KEY,
        { email, password, returnSecureToken: true }
      )
        .then(({ data }) => {
          console.log(data);
          dispatch({
            type: SIGNUP_SUCCESS
          }),
            dispatch(
              loginSuccessful(
                data.email,
                data.idToken,
                data.refreshToken,
                data.localId
              )
            );

          if (typeof successFn === 'function')
            successFn(getState().account.user);
        })
        .catch(err => {
          dispatch({
            type: SIGNUP_FAILED,
            payload: {
              message: err.toString()
            }
          });
        });
  };
};

export const loginFailed = message => ({
  type: LOGIN_FAILED,
  payload: {
    message
  }
});

export const verifyToken = (refreshToken, user) => dispatch => {
  dispatch(setLoaderStatus(true));
  Axios.post(
    'https://securetoken.googleapis.com/v1/token?key=' + FIREBASE_API_KEY,
    {
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    }
  )
    .then(response => {
      console.log(user);
      dispatch(
        loginSuccessful(
          user.email,
          response.data.id_token,
          response.data.refresh_token,
          user.localId
        )
      );
      dispatch(setLoaderStatus(false));
    })
    .catch(reject => {
      dispatch(loginFailed('Bad request'));
      dispatch(setLoaderStatus(false));
    });
};

export const attemptToLogin = (email, pass, successFn) => {
  return (dispatch, getState) => {
    dispatch(setLoaderStatus(true));
    Axios.post(
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
        FIREBASE_API_KEY,
      {
        email: email,
        password: pass,
        returnSecureToken: true
      }
    )
      .then(response => {
        console.log(response);
        dispatch(
          loginSuccessful(
            response.data.email,
            response.data.idToken,
            response.data.refreshToken,
            response.data.localId
          )
        );
        dispatch(setLoaderStatus(false));
        if (typeof successFn === 'function') successFn(getState().account.user);
      })
      .catch(reject => {
        dispatch(loginFailed('Bad request'));
        dispatch(setLoaderStatus(false));
      });
  };
};
