import React from "react";
import {useTheme} from "@emotion/react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Typography,
    useMediaQuery
} from "@mui/material";

export default function ResponsiveDialog({deleteBtn, handleClick, handleClose, open, color='secondary'}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <div>
            <Button onClick={handleClick} color={color}>
                <Typography color={'tomato'} component={'span'} variant={'button'}>
                    Delete
                </Typography>
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle color={'tomato'} id="responsive-dialog-title">
                    Are you sure
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The data cannot be recovered after the account is deleted
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={deleteBtn} autoFocus>
                        <Typography color={'tomato'} component={'span'} variant={'button'}>
                            Delete
                        </Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}