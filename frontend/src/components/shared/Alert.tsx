import React from 'react';

import { useAlert } from '../../context/AlertContext';

import type { AlertType } from '../../context/AlertContext';

const alertStyles: Record<AlertType, { bg: string; border: string; text: string; icon: string }> = {
  error: {
    bg: 'bg-red-50',
    border: 'border-red-400',
    text: 'text-red-800',
    icon: '✕',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-400',
    text: 'text-yellow-800',
    icon: '⚠',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-400',
    text: 'text-green-800',
    icon: '✓',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-400',
    text: 'text-blue-800',
    icon: 'ℹ',
  },
};

export const AlertContainer: React.FC = () => {
  const { alerts, removeAlert } = useAlert();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-20 left-0 right-0 z-50 flex flex-col items-center gap-2 p-4">
      {alerts.map((alert) => {
        const styles = alertStyles[alert.type];
        return (
          <div
            key={alert.id}
            className={`${styles.bg} ${styles.border} ${styles.text} border-l-4 p-4 rounded-md shadow-lg max-w-2xl w-full flex items-start justify-between`}
            role="alert" 
          >
            <div className="flex items-start gap-3">
              <span className="text-xl font-bold shrink-0">{styles.icon}</span>
              <p className="font-medium">{alert.message}</p>
            </div>
            <button
              onClick={() => removeAlert(alert.id)}
              className={`${styles.text} hover:opacity-70 ml-4 font-bold text-xl leading-none shrink-0`}
              aria-label="Close alert"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};
