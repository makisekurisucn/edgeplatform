import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import NotificationsNone from '@material-ui/icons/NotificationsNone';

const styles = theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '20px',
        color: 'rgba(133, 144, 166, 0.7)',
        textAlign: 'center'
    },
    icon: {
        fontSize: '118px',
        margin: '10px 0px'
    },
    text: {
        fontSize: '22px'
    }
});

function EmptyList(props) {
    const { classes, className } = props;
    let classNameWrap = classes.root;
    if (className) {
        classNameWrap += ' ' + className
    }
    return (
        <div className={classNameWrap}>
            <NotificationsNone className={classes.icon} />
            <div className={classes.text}>还没有消息</div>
        </div>
    );
}

export default withStyles(styles)(EmptyList);