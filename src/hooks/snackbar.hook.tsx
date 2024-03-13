import React, { useState } from 'react';

import { Slide, SlideProps } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface SnackbarProps {
  message: string;
  autoHideDuration?: number;
  severity: 'success' | 'error' | 'info' | 'warning';
}

// eslint-disable-next-line react-refresh/only-export-components
const SlideTransition = (props: SlideProps) => {
  return <Slide {...props} direction="up" />;
};

export default function useSnackbar() {
  const [open, setOpen] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
    message: '',
    severity: 'info',
    autoHideDuration: 5000,
  });

  const handleClick = (
    severity: 'success' | 'error' | 'info' | 'warning',
    message: string,
    autoHideDuration?: number
  ) => {
    setSnackbarProps({
      message,
      severity,
      autoHideDuration: autoHideDuration || 5000,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SnackbarComponent: React.FunctionComponent = () => (
    <Snackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      autoHideDuration={snackbarProps.autoHideDuration}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        sx={{ width: '100%' }}
        severity={snackbarProps.severity}
      >
        {snackbarProps.message}
      </Alert>
    </Snackbar>
  );

  return { SnackbarComponent, handleClick };
}
