import * as actionTypes from '../actions/actionTypes';
import { updateState } from '../../../utils/data';

const initialState = {
  loginAttempting: false,
  userLoggedIn: false,
  signUpAttempting: false,
  loginError: false,
  signupError: null,
  errors: {
    login: ''
  },
  user: {
    email: null
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGOUT:
      return updateState(state, {
        loginError: false,
        userLoggedIn: false,
        user: { ...initialState.user }
      });

    case actionTypes.LOGIN_FINISHED:
    case actionTypes.LOGIN_ATTEMPT:
      return updateState(state, { loginAttempting: action.payload.status });
    case actionTypes.LOGIN_FAILED:
      let errors = { ...state.errors };
      errors.login = action.payload.message;
      console.log(errors);

      return updateState(state, {
        loginError: true,
        errors: errors
      });

    case actionTypes.SIGNUP_ATTEMPT:
      return updateState(state, { signUpAttempting: true });
    case actionTypes.SIGNUP_SUCCESS:
      return updateState(state, { signUpAttempting: false, signupError: null });
    case actionTypes.SIGNUP_FAILED:
      return updateState(state, {
        signUpAttempting: false,
        signupError: action.payload.message
      });
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginError: false,
        userLoggedIn: true,
        user: {
          ...state.user,
          email: action.payload.email,
          token: action.payload.token,
          refreshToken: action.payload.refreshToken,
          localId: action.payload.localId
        }
      };

    default:
      return state;
  }
};

export default reducer;
