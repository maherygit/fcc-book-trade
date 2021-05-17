import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

import userService from '../../utils/userService';
import { validateTextField } from '../../utils/fieldValidation';
import { useStateValue } from '../../state/appStateProvider';
import CButton from '../UI/CButton'

import './registerForm.css';

const emptyFields = {email: "", password: "", name: ""}; 

const Register = (props) => {
  const [registerInfos, setRegisterInfos] = useState({...emptyFields});
  const [regError, setRegError] = useState({...emptyFields, register: ""});
  const { state: [, dispatch], action, flash: [, setFlashMessage] } = useStateValue();
   
  const handleInput = evt => {
      setRegisterInfos( { ...registerInfos, [evt.target.name] : evt.target.value } );    
  }
  
  const validateFields = () => {
    let errorMessages = {...emptyFields};
    let hasError = false;
    let res = validateTextField(registerInfos.email, 3, 30, /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/);
    console.log("email validation ", res)
    if( res.error ) { 
      console.log("email has error ")
      hasError = true;
      errorMessages.email = res.error;
    }
    
    res = validateTextField(registerInfos.password, 5, 10);
    console.log("password valid ", res)

    if( res.error )  { 
      console.log("password has error")
      hasError = true;
      errorMessages.password = res.error;
    }

    res = validateTextField(registerInfos.name, 2, 30);
    console.log("name valid ", res)

    if( res.error )  { 
      console.log("name has error")
      hasError = true;
      errorMessages.name = res.error;
    }
    

    if(hasError) {
      return { error : errorMessages };
    }
    
    return { error : null };
  }
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setRegError(prevState => ({...emptyFields, register: ""}));
    let resValidate = validateFields();
    console.log("*****", resValidate)
    if(!resValidate.error) {
      // post register infos to backend
      const {user, error} = await userService.registerUser(registerInfos.email, registerInfos.password, registerInfos.name);
      setFlashMessage({kind: 'info', message: "registering sent"});

      if(error) {
        //console.log("submit error ", JSON.stringify(error))
        setRegError(prevState => ({...prevState, register : error}));
        setFlashMessage({kind: 'error', message: "Registering failed"})
      } else {
        setRegError({...emptyFields, register: ""});
        setRegisterInfos({...emptyFields});
        setFlashMessage({kind: 'success', message: "Registering succeeded"})
        dispatch(action.login(user.data))
      }
    } else {
      setRegError({...resValidate.error, register: ""});
    }
  }
  
  return (
    <div className="register_form_container">
      <div className="register_form">
        <label htmlFor='name'>  
          <input type="text" id="name" name="name" value={registerInfos.name} onChange={handleInput} placeholder=" "/>
          <span className='label'>Name</span>
          <span className='border'></span>
          { regError.name && <p style={{color: "red"}}> {regError.name} </p> }
        </label>

        <label htmlFor='email'>  
          <input type="text" id="email" name="email" value={registerInfos.email} onChange={handleInput} placeholder=" "/>
          <span className='label'>Email</span>
          <span className='border'></span>
          { regError.email && <p style={{color: "red"}}> {regError.email} </p> }
        </label>
        
        <label htmlFor="password">
          <input type="password" id="password" name="password" value={registerInfos.password} onChange={handleInput} placeholder=" "/>
          <span className='label'>Password</span>
          <span className='border'></span>
          { regError.password && <p style={{color: "red"}}> {regError.password} </p> }
        </label>
        
        { regError.register && <p style={{color: "red"}}> {regError.register} </p> }
        
        <CButton onClick={handleSubmit} className="submit_btn"> Register </CButton>
      </div>
    </div>
  );
};

export default Register;