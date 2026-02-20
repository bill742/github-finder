import { useReducer, ReactNode } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';
import { AlertContextType, Alert } from '../../types/alert';

interface AlertStateProps {
  children: ReactNode;
}

const AlertState: React.FC<AlertStateProps> = ({ children }) => {
  const initialState: Alert | null = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Set Alert
  const setAlert = (msg: string, type: string): void => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };

  // Create the context value matching AlertContextType
  const contextValue: AlertContextType = {
    alert: state,
    setAlert,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertState;
