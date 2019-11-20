import React, { useState, useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { deleteNotification } from '../../actions/Notification';
import EmptyList from './EmptyList';
import NotificationItem from './NotificationItem';
//delete
import { addNotification } from '../../actions/Notification';

const styles = theme => ({
    root: {
        position: 'fixed',
        // zIndex: '110000',
        top: '0px',
        right: '0px',
        height: '100%',
        transform: 'translateX(100%)',
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
        outline: 'none'
    },
    listTitle: {
        textAlign: 'center',
        padding: '14px 0px',
        color: '#EEF9FF'
    }
});

const initialList = [
    {
        key: 'first',
        title: 'warning',
        msg: 'this is a warning'
    },
    {
        key: 'second',
        title: 'error',
        msg: 'this is a error'
    },
    {
        key: 'third',
        title: 'success',
        msg: 'this is a success'
    },
    {
        key: 'forth',
        title: 'default',
        msg: 'this is a default'
    }
]

class NotificationList extends React.Component {
    constructor(props) {
        super(props);
        this.notificationList = null;
        //delete
        this.index = 0;
        this.arr = [
            { key: 5, type: 'default', title: `小明`, content: '目前公司网络不稳定', date: '15:58' },
            { key: 6, type: 'info', title: `小红`, content: '报名成功后需在5天内提供证明', date: '16:03' },
            { key: 7, type: 'success', title: `小霞`, content: '可达鸭', date: '16:23' },
            { key: 8, type: 'warning', title: `小刚`, content: '大岩蛇', date: '17:37' },
            { key: 9, type: 'error', title: `小智`, content: '皮卡丘', date: '17:58' },
        ]
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

    //delete
    handleAdd = () => {
        const { dispatch } = this.props;
        const date = new Date();
        // addNotification(dispatch, { key: date.valueOf(), type: 'warning', title: `warning`, content: date.toString(), date: date.valueOf() });
        addNotification(dispatch, this.arr[this.index]);
        if (this.index < 4) {
            this.index = this.index + 1;
        }
        // var event = new Event('addNotification');
        // window.dispatchEvent(event);
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
                    <div onClick={this.handleAdd}>add</div>
                    {/* <div>add</div> */}
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