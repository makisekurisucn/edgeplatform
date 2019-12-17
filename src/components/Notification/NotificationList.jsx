import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { deleteNotification } from '../../actions/Notification';
import EmptyList from './EmptyList';
import NotificationItem from './NotificationItem';

const styles = theme => ({
    root: {
        position: 'fixed',
        // zIndex: '110000',
        top: '0px',
        right: '0px',
        height: '100%',
        transform: 'translateX(100%)',
        //如果去掉visibility:visible，在通知列表下的content的多行文本溢出效果就不会起作用
        visibility: 'visible',
        transition: 'transform .3s ease'
    },
    visible: {
        transform: 'translateX(0px)',
        visibility: 'visible'
    },
    notificationList: {
        boxSizing: 'border-box',
        padding: '1px',
        width: '300px',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'rgba(238, 249, 255, 0.6)',
        outline: 'none',
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    listTitle: {
        textAlign: 'center',
        padding: '14px 0px',
        color: '#EEF9FF'
    }
});

class NotificationList extends React.Component {
    constructor(props) {
        super(props);
        this.notificationList = null;
    }

    componentDidUpdate() {
        this.notificationList && this.notificationList.focus();
    }

    handleBlur = () => {
        this.props.handleBlur && this.props.handleBlur();
    }

    handleDelete = (key) => {
        const { dispatch } = this.props;
        deleteNotification(dispatch, key);
    }


    render() {
        const { classes, isListDisplay, list = [] } = this.props;
        let classNameWrap = classes.root;
        if (isListDisplay) {
            classNameWrap += ' ' + classes.visible;
        }
        return (
            <div className={classNameWrap}>
                <div className={classes.notificationList} onFocus={this.handleFocus} onBlur={this.handleBlur} tabIndex={0} ref={ele => { this.notificationList = ele }}>
                    {
                        list.length
                            ? <Fragment>
                                <div className={classes.listTitle}>未读新消息</div>
                                {
                                    list.map((item) => {
                                        return <NotificationItem key={item.key} data={item} handleClose={this.handleDelete} />
                                    })
                                }
                            </Fragment>
                            : <EmptyList />
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(NotificationList);