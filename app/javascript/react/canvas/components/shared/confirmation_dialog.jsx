import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationDialog({open, handleClose, children}) {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="text-lg m-4">
            {children}
          </div>
        </DialogTitle>
        <DialogActions>
          <button
            onClick={handleClose}
            className="btn btn-primary btn-sm"
            autoFocus
          >
            OK
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
