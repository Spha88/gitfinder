import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import * as types from '../types';

const AlertState = props => {
   const initialState = null;

   const [state, dispatch] = useReducer(AlertReducer, initialState);

   // Set Alert
   const setAlert = (msg, type) => {
      dispatch({
         type: types.SET_ALERT,
         payload: { msg, type },
      });
      setTimeout(() => dispatch({ type: types.REMOVE_ALERT }), 5000);
   };

   return (
      <AlertContext.Provider
         value={{
            alert: state,
            setAlert: setAlert,
         }}
      >
         {props.children}
      </AlertContext.Provider>
   );
};

export default AlertState;
