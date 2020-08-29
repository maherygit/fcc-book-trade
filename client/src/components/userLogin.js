import React, {useState} from 'react';
import { useStateValue } from '../state/appStateProvider';

import Register from './register';
import Login from './login';

import './userLogin.css';

const UserLogin = (props) => {
  const [state, dispatch] = useStateValue().state;
  const [selected, setSelected] = useState("register");
  
  function handleClick(evt) {
    let sel = evt.target.attributes.name.nodeValue;
    setSelected(sel);
  }
  
  return (
    <aside className="userLogin_container">
      <div className="userLogin_login_way">
        <span name="register" className={ "userLogin_way_item" + ((selected ==="register") ? " active" : "")} onClick={handleClick}> Register </span>
        <span name="login" className={ "userLogin_way_item" + ((selected ==="login") ? " active" : "")} onClick={handleClick}> Login </span>
      </div>
      <div className="userLogin_main">
      {
        (selected === "register")? 
        <Register />
          :
        <Login />
      }
      </div>
    </aside>
  );
};

export default UserLogin;