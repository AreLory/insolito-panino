import React, { createContext, useContext, useState, useCallback } from 'react';

export type AlertType = 'error' | 'info' | 'warning' | 'success';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
}

interface AlertContextType {
  alerts: Alert[];
  showAlert: (type: AlertType, message: string) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = useCallback((type: AlertType, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36);
    const newAlert: Alert = { id, type, message };

    setAlerts((prev) => [...prev, newAlert]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 3000);
  }, []);

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, showAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
