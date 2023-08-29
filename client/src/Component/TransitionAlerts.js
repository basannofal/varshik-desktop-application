

import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function TransitionAlerts({ open, handleClose, title, message, actionText }) {
    const theme = useTheme();

    return (
        <Dialog
            fullWidth={true}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            maxWidth={'xs'}
        >
            <DialogTitle id="responsive-dialog-title" >
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText style={{marginTop:10}}>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>

                <Button onClick={handleClose} autoFocus>
                {actionText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

