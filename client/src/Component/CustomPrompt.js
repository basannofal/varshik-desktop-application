import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function CustomPrompt({ message, open, onClose, onAgree }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [inputValue, setInputValue] = React.useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleAgree = () => {
        onAgree(inputValue);
        setInputValue('');
    };

    return (
        <div>
            <Dialog
                fullWidth={true}
                open={open}
                onClose={onClose}
                maxWidth={'xs'}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Enter Captcha"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Enter value"
                        type="text"
                        fullWidth
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAgree} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
