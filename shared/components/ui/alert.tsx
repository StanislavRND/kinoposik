import Alert from '@mui/material/Alert';
import React from 'react';

interface Props {
  alertSeverity: 'success' | 'info' | 'warning' | 'error';
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  alertMessage: string;
}

export const AlertShow: React.FC<Props> = ({ alertSeverity, setShowAlert, alertMessage }) => {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}>
      <Alert
        sx={{
          backgroundColor: '#292929',
          color: '#fff',
        }}
        severity={alertSeverity}
        onClose={() => setShowAlert(false)}>
        {alertMessage}
      </Alert>
    </div>
  );
};
