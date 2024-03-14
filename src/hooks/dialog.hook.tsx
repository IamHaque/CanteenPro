import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

export default function useAlertDialog() {
  const [open, setOpen] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [onConfirmHandler, setOnConfirmHandler] = useState<(() => void) | null>(
    null
  );

  const closeDialog = () => {
    setOpen(false);
  };

  const openDialog = (
    text: string,
    title: string,
    button: string,
    onConfirm: () => void
  ) => {
    setAlertText(text);
    setAlertTitle(title);
    setButtonText(button);
    setOnConfirmHandler(() => onConfirm);
    setOpen(true);
  };

  const AlertDialog: React.FunctionComponent = () => {
    const handleConfirm = () => {
      if (onConfirmHandler) {
        onConfirmHandler();
      }
      closeDialog();
    };

    return (
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby={`dialog-title-${alertTitle}`}
        aria-describedby={`dialog-desc-${alertTitle}`}
      >
        <DialogTitle id={`dialog-title-${alertTitle}`}>
          {alertTitle}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id={`dialog-desc-${alertTitle}`}>
            {alertText}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>

          <Button autoFocus onClick={handleConfirm}>
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return { AlertDialog, openDialog, closeDialog };
}
