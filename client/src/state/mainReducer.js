import { userReducer, userInitialState, loginAction, logoutAction } from './userReducer';

export const mainInitialState = {
  user : userInitialState
}

export const mainReducer = ( state , action ) => {
  console.log("mainReducer ", state);
  return {
    user : userReducer( state.user, action)
  }
}

export const action = {
  login: loginAction,
  logout: logoutAction
}