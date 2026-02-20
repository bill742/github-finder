import { createContext, useContext } from 'react';
import { AlertContextType } from '../../types/alert';

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error(
      'useAlertContext must be used within an AlertState provider',
    );
  }
  return context;
};

export default AlertContext;
