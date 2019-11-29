import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';

const styles = {
    root: {
        flexGrow: 1,
        display: 'flex',
        margin: 16,
        justifyContent: 'center',
        alignItems: 'middle',
    },
    button: {
        margin: 8,
        color: '#fff',
        backgroundColor: '#313131',
    },
    success: {
        backgroundColor: '#43a047',
    },
    error: {
        backgroundColor: '#d32f2f',
    },
    info: {
        backgroundColor: '#2979ff',
    },
    warning: {
        backgroundColor: '#ffa000',
    }
};

const buttons = [
    { variant: 'success', message: 'Successfully done the operation.' },
    { variant: 'error', message: 'Something went wrong.' },
    { variant: 'warning', message: 'Be careful of what you just did!' },
    { variant: 'info', message: 'For your info...' },
];


class MessageButtons extends Component {
    componentDidMount() {
        // window.addEventListener('addNotification', this.handleEvent);
        window.addEventListener(this.props.eventName, this.handleEvent);
    }

    componentWillUnmount() {
        // window.removeEventListener('addNotification', this.handleEvent);
        window.removeEventListener(this.props.eventName, this.handleEvent);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (!this.props.toCloseAll && nextProps.toCloseAll) {
            this.closeAll();
        }
    }

    action = (key) => (
        <Fragment>
            <Button onClick={() => { alert(`I belong to snackbar with key ${key}`); }}>
                {'Alert'}
            </Button>
            <Button onClick={() => { this.props.closeSnackbar(key) }}>
                {'Dismiss'}
            </Button>
        </Fragment>
    );

    handleEvent = (e) => {
        window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
        if (this.props.toCloseAll) {
        } else {
            this.props.enqueueSnackbar(e.detail && e.detail.title, {
                variant: e.detail.type,
                // action: this.action
                // action: (
                //     <Button color="secondary" size="small" onClick={() => alert('clicked on my custom action')}>
                //         My action
                //     </Button>
                // )
                // children:<div>{e.detail.content}</div> //弹出框的样式
            })
        }
    }

    closeAll = () => {
        this.props.closeSnackbar();
    }

    // handleClick = button => () => {
    //     window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
    //     this.props.enqueueSnackbar(button.message, { variant: button.variant });
    // };

    handleClickWithAction = () => {
        this.props.enqueueSnackbar('Customise this snackbar youself.', {
            variant: 'default',
            action: (
                <Button color="secondary" size="small" onClick={() => alert('clicked on my custom action')}>
                    My action
                </Button>
            ),
            // Alternatively, you can access the key of current snackbar by passing an action of type function
            // action: key => (
            //     <Fragment>
            //         <Button color="secondary" size="small" onClick={() => alert(`Clicked on action of snackbar with key: ${key}`)}>
            //             Detail
            //         </Button>
            //         <Button color="secondary" size="small" onClick={() => this.props.closeSnackbar(key)}>
            //             Dismiss
            //         </Button>
            //     </Fragment>
            // ),
        });
    };

    render() {
        return null;
    }
}

MessageButtons.propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired
};

export default withSnackbar(MessageButtons);
