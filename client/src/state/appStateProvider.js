import React, { useEffect, useState, useContext, useReducer, createContext } from 'react';
import { mainReducer, mainInitialState, action } from './mainReducer';

export const SateContext = createContext();

const clearMessage = {kind: 'info', message: ''};

function useFlashMessage(theMessage, delay=3000){
  const [message, setMessage] = useState(theMessage);
  
  useEffect(() => {
    let toId = setTimeout(() => { setMessage(clearMessage) }, delay);
    return () => {
      clearTimeout(toId);
    };
  }, [message, delay]);
  
  return [ message, setMessage ];
}


export const StateContextProvider = ({children}) => {
  const [message, setMessage] = useFlashMessage(clearMessage);
  
  return (
    <SateContext.Provider value = {{ 
          state: useReducer(mainReducer, mainInitialState),
          action,
          flash: [message, setMessage] 
        }}>
      { children }    
    </SateContext.Provider>
  );
};

export const useStateValue = () => useContext(SateContext);

