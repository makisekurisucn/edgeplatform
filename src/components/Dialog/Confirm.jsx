import React, { useState, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
    root: {
        // width: '51%'
        // width: '300px'
    },
    contentRoot: {
        width: '400px'
    }

});


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AlertDialogSlide(props) {
    const { classes } = props;
    const { dialogTitle, dialogContent, agree = {}, disagree = {} } = props;

    const [open, setOpen] = useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleAgree() {
        agree.func && agree.func();
        setOpen(false);
    }

    function handleDisagree() {
        disagree.func && disagree.func();
        setOpen(false);
    }

    return (
        <Fragment>
            {props.render(handleClickOpen)}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText className={classes.contentRoot} id="alert-dialog-slide-description">
                        {dialogContent}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAgree} color="primary">
                        {agree.text}
                    </Button>
                    <Button onClick={handleDisagree} color="primary">
                        {disagree.text}
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default withStyles(styles)(AlertDialogSlide);
