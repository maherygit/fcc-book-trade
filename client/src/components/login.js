import React, {useState} from 'react';
import userService from '../utils/userService';
import { validateTextField } from '../utils/fieldValidation';

import './registerForm.css';

const Login = (props) => {
  const [loginInfos, setLoginInfos] = useState({ email: "", password : ""});
   
  const handleInput = evt => {
      setLoginInfos( { ...loginInfos, [evt.target.name] : evt.target.value } );   
  }
  
 
  const validateFields = () => {
    if(validateTextField(loginInfos.email, 3, 30, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) return false;
    if(validateTextField(loginInfos.password, 5, 10)) return false;
    
    return true;
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if(validateFields()) {
      // post register infos to backend
      userService.logUser(loginInfos.email, loginInfos.password);
    }
  }
  
  return (
    <div className="register_form_container">
      <div className="register_form">
        <label htmlFor='email'>  
          <input type="text" id="email" name="email" value={loginInfos.email} onChange={handleInput} placeholder=" "/>
          <span className='label'>Email</span>
          <span className='border'></span>
        </label>
        
        <label htmlFor="password">
          <input type="password" id="password" name="password" value={loginInfos.password} onChange={handleInput} placeholder=" "/>
          <span className='label'>Password</span>
          <span className='border'></span>
        </label>
        <button onClick={handleSubmit} className="submit_btn"> Login </button>
      </div>
    </div>
  );
};

export default Login;