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
        height: '60px',
        lineHeight: '60px',
        color: '#EEF9FF',
        marginLeft: '10px'
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
            top: '16px',
            right: '7px',
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
    }

    componentDidMount() {
        window.addEventListener('addNotification', this.eventListener);
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
        const isDisplay = this.state.isListDisplay;
        if (isDisplay === false) {
            this.setState({
                isListDisplay: !isDisplay
            })
        }
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

        return (
            <Fragment>
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
    return state.notification;
}
export default connect(mapStateToProps)(withStyles(styles)(Notification));
