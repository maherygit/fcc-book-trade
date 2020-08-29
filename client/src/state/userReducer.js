export const userInitialState = null
  
export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('user loggedin', action.payload)
      return { ...action.payload }
    case 'LOGOUT':
      console.log('user loggedout')
      return null
    default:
      console.log('action not yet handled : ', action.type)
      return state;
  }
};  

export function loginAction(user) {
  return {
    type: 'LOGIN',
    payload: user
  }
}

export function logoutAction() {
  return {
    type: 'LOGOUT'
  }
}