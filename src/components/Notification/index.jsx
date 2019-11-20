import React, { useState, useEffect, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import NotificationsNone from '@material-ui/icons/NotificationsNone';
import { addNotification } from '../../actions/Notification';
import RenderInBody from '../RenderInBody';
import NotificationList from './NotificationList';

import { SnackbarProvider } from 'notistack';
import Snackbar from '../Snackbar';

const styles = theme => ({
    root: {
        position: 'relative',
        width: '40px',
        height: '40px',
        lineHeight: '40px',
        color: '#EEF9FF',
        padding: '0px 4px'
    },
    viewport: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#262E2F'
        }
    },
    icon: {
        position: 'relative',
        height: '100%',
        width: '100%',
        minWidth: '100%',
        fontSize: '28px',
        transition: 'transform .3s ease'
    },
    iconAfter: {
        '&:after': {
            content: '""',
            width: '6px',
            height: '6px',
            position: 'absolute',
            top: '6px',
            right: '4px',
            display: 'inline-block',
            backgroundColor: '#ff0000',
            borderRadius: '50%'
        }
    },
    number: {
        height: '100%',
        width: '100%',
        minWidth: '100%',
        fontSize: '18px',
        transition: 'transform .3s ease'
    },
    count: {
        height: '100%',
        whiteSpace: 'pre-line',
        transition: 'transform .3s ease'
    },
    hide: {

    },
    toLeft: {
        transform: 'translateX(-100%)'
    },
    toLeftTop: {
        transform: 'translateY(-100%)'
        // transform: 'translate(-100%,-100%)'
    }
});

let countList = '';
for (let i = 0; i < 100; i++) {
    countList += `${i}\n`
}
countList += `99+`;



class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.notificationList = null;
        this.state = {
            isListDisplay: false,
            isNumberHidden: true,
            toScrollUp: false
        }
        this.countDownTime = null;
        //以下内容需要删除
        this.index = 0;
        this.arr = [
            { key: 0, type: 'default', title: `小明`, content: '目前公司网络不稳定', date: '15:58' },
            { key: 1, type: 'info', title: `小红`, content: '报名成功后需在5天内提供证明', date: '16:03' },
            { key: 2, type: 'success', title: `小霞`, content: '可达鸭', date: '16:23' },
            { key: 3, type: 'warning', title: `小刚`, content: '大岩蛇', date: '17:37' },
            { key: 4, type: 'error', title: `小智`, content: '皮卡丘', date: '17:58' }
        ]
    }

    componentDidMount() {
        window.addEventListener('addNotification', this.eventListener);
    }

    UNSAFE_componentWillReceiveProps() {
        console.log('Icon will receive props');
    }

    componentWillUnmount() {
        window.removeEventListener('addNotification', this.eventListener);
    }

    eventListener = () => {
        if (!this.state.isListDisplay) {
            if (this.state.isNumberHidden) {
                this.showNumber();
                this.countDownTime = setTimeout(() => {
                    this.hideNumber();
                }, 3000);
            } else {
                //数字向上滚动，重置计时器
                clearTimeout(this.countDownTime);
                this.countDownTime = setTimeout(() => {
                    this.hideNumber();
                }, 3000);

            }
        }
    }

    showNumber = () => {
        clearTimeout(this.countDownTime);
        this.state.isNumberHidden && this.setState({
            isNumberHidden: false
        })
    }

    hideNumber = () => {
        !this.state.isNumberHidden && this.setState({
            isNumberHidden: true,
            toScrollUp: false
        })
    }

    handleClick = () => {
        console.log('----------------------------');
        console.log('clicked the bell');
        const isDisplay = this.state.isListDisplay;
        console.log('isDisplay: ' + isDisplay);
        if (isDisplay === false) {
            this.setState({
                isListDisplay: !isDisplay
            })
        }
        // this.setState({
        //     isListDisplay: !isDisplay
        // })

    }

    hideList = () => {
        if (this.state.isListDisplay === true) {
            console.log('------------------');
            console.log('on blur');
            //因onblur和onclick会有冲突，且onblur先触发，等到onclick时又设置列表为显示。因此暂时把onblur延迟执行，先执行onclick
            setTimeout(() => {
                this.setState({
                    isListDisplay: false
                })
            }, 100);
            // this.setState({
            //     isListDisplay: false
            // })
        }
    }

    //以下内容需要删除
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
        const { classes, className, list = [] } = this.props;
        const count = list.length;

        let classNameWrap = classes.root;
        let iconClassName = classes.icon, numberAreaClassName = classes.number, numberClassName = classes.count;
        if (className) {
            classNameWrap += ' ' + className;
        }

        if (count !== 0) {
            iconClassName += ' ' + classes.iconAfter;
        }

        if (!this.state.isNumberHidden) {
            iconClassName += ' ' + classes.toLeft;
            numberAreaClassName += ' ' + classes.toLeft;
        }

        // if (this.state.toScrollUp) {
        //     numberClassName += ' ' + classes.toTop;
        // }
        // if (count) {
        //     numberClassName += ' ' + classes.toTop;
        // }
        console.log('notification render');

        return (
            <Fragment>
                {/* 以下button需要删除 */}
                <button onClick={this.handleAdd} style={{ marginRight: '210px' }}>add</button>
                <div className={classNameWrap}>
                    <div className={classes.viewport} onMouseEnter={this.showNumber} onMouseLeave={this.hideNumber} onClick={this.handleClick}>
                        <div className={iconClassName}>
                            <NotificationsNone />
                        </div>
                        <div className={numberAreaClassName}>
                            <div className={numberClassName} style={{ transform: `translateY(-${Math.min(count, 100) * 100}%)` }}>{countList}</div>
                            {/* <div className={classes.count}>{count + 1}</div> */}
                        </div>
                    </div>
                    <RenderInBody>
                        <NotificationList isListDisplay={this.state.isListDisplay} handleBlur={this.hideList} list={list} dispatch={this.props.dispatch} />
                    </RenderInBody>
                </div>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                >
                    <Snackbar eventName={'addNotification'} toCloseAll={this.state.isListDisplay} />
                </SnackbarProvider>
            </Fragment>
        );
    }
}


function mapStateToProps(state, ownProps) {
    console.log('map state to props');
    console.log(state);
    return state.notification;
}
export default connect(mapStateToProps)(withStyles(styles)(Notification));
