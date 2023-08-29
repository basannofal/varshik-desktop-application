import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ConfirmDialog({ open, handleClose, title, message, onAgree, onDisagree }) {
    const theme = useTheme();

    return (
        <Dialog
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onDisagree}>
                    Disagree
                </Button>
                <Button onClick={onAgree} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
}
