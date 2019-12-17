import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withSnackbar } from 'notistack';


class MessageButtons extends Component {
    componentDidMount() {
        window.addEventListener(this.props.eventName, this.handleEvent);
    }

    componentWillUnmount() {
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

    handleClickWithAction = () => {
        this.props.enqueueSnackbar('Customise this snackbar youself.', {
            variant: 'default',
            action: (
                <Button color="secondary" size="small" onClick={() => alert('clicked on my custom action')}>
                    My action
                </Button>
            )
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
