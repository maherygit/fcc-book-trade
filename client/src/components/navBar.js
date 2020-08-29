import React from 'react';
import { useStateValue } from '../state/appStateProvider';
import { Link } from 'react-router-dom';

import './navBar.css';

const logOut = (dispatch) => {
  dispatch({ action: "loggedOut" });
}

export default function NavBar(props){
  const { state: {user}, action: {login, logout} , flash } = useStateValue();
  
  return (
    <div className="navbar_container">
      <Link to="/"><button className="navbar_btn home">Home</button></Link>
      <Link to="/users/index"><button className="navbar_btn users">Users</button></Link>
      <Link to="/books/index"><button className="navbar_btn users">Books</button></Link>
      {
        user && 
        ( <span className="navbar_user_part"> 
            <span className="navbar_user_info">{ user.email }</span> <button className="navbar_btn" onClick={logout}> Logout </button>
          </span>)
      }
    </div> 
  );
}
