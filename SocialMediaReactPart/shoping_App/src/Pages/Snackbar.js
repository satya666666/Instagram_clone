import { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

// Create a context for the snackbar
const SnackbarContext = createContext();

// Custom hook to use the snackbar
export const useSnackbar = () => useContext(SnackbarContext);

// Snackbar provider component
export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info', // 'error', 'warning', 'info', 'success'
  });

  const enqueueSnackbar = (message, options = {}) => {
    setSnackbar({
      open: true,
      message,
      severity: options.variant || 'info',
      autoHideDuration: options.autoHideDuration || 5000,
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.autoHideDuration}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={closeSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Simple utility function for components that don't have access to the context
let snackbarQueue = [];
let snackbarCallback = null;

export const registerSnackbarCallback = (callback) => {
  snackbarCallback = callback;
  
  // Process any queued snackbars
  if (snackbarQueue.length > 0) {
    snackbarQueue.forEach(item => {
      callback(item.message, item.options);
    });
    snackbarQueue = [];
  }
};

export const enqueueSnackbar = (message, options = {}) => {
  if (snackbarCallback) {
    snackbarCallback(message, options);
  } else {
    // Queue the snackbar for when a callback is registered
    snackbarQueue.push({ message, options });
  }
};

export default {
  SnackbarProvider,
  useSnackbar,
  enqueueSnackbar,
  registerSnackbarCallback,
};
