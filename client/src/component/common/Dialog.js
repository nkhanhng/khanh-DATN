import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from 'prop-types';

const AlertDialog = (props) => {
    const { action ,handleClose, text, open, id } = props;

    return (
        <div>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {text}
            </DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancle
            </Button>
            <Button onClick={() => action(id)} color="primary" autoFocus>
                Agree
            </Button>
            </DialogActions>
        </Dialog>
        </div>
  );
}

AlertDialog.propTypes = {
    action: PropTypes.func,
    handleClose: PropTypes.func,
    text: PropTypes.string,
    open: PropTypes.bool
};

export default AlertDialog;