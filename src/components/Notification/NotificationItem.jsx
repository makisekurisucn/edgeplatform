import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Close from '@material-ui/icons/Close';
import CheckCircleOutlineOutlined from '@material-ui/icons/CheckCircleOutlineOutlined';
import HighlightOffOutlined from '@material-ui/icons/HighlightOffOutlined';
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import ReportProblemOutlined from '@material-ui/icons/ReportProblemOutlined';
import SpeakerNotesOutlined from '@material-ui/icons/SpeakerNotesOutlined';
import { getAutoFormattedTime } from '../../utils/formatTime';

const styles = theme => ({
    root: {
        position: 'relative',
        boxSizing: 'border-box',
        width: '278px',
        height: '100px',
        margin: '0px 10px 10px 10px'
    },
    item: {
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        boxSizing: 'border-box',
        height: '100%',
        padding: '11px 24px 11px 7px',
        cursor: 'default',
        border: '2px solid rgba(241, 226, 226, 0.4)',
        '&:hover': {
            '& $iconClose': {
                visibility: 'visible'
            }
        }
    },
    deleteAnimation: {
        height: '0px',
        overflow: 'hidden',
        margin: '0px 10px 0px 10px',
        transition: 'transform .3s cubic-bezier(0.17, 0.49, 0.3, 0.9), height .3s ease .3s, margin .3s ease .3s',
        transform: 'translateX(110%)'
    },
    iconType: {
        margin: '0px 5px',
        fontSize: '31px'
    },
    main: {
        flex: 'auto',
        margin: '0px 5px'
    },
    title: {
        color: 'rgba(238, 249, 255, 1)',
        fontSize: '17px',
        fontWeight: 600
    },
    content: {
        fontSize: '15px',
        wordBreak: 'break-word',
        // multi-line text overflow
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        /* autoprefixer: off */
        WebkitBoxOrient: 'vertical',
        /* autoprefixer: on */
        WebkitLineClamp: '2'
    },
    date: {
        fontSize: '13px',
        margin: '4px 0px'
    },
    iconClose: {
        position: 'absolute',
        top: '8px',
        right: '6px',
        fontSize: '18px',
        visibility: 'hidden',
        '&:hover': {
            color: 'rgba(238, 249, 255, 1)',
            cursor: 'pointer'
        }
    },
    default: {
        backgroundColor: 'rgba(49, 49, 49, 0.4)',
        '&:hover': {
            backgroundColor: 'rgba(49, 49, 49, 0.6)'
        }
    },
    info: {
        backgroundColor: 'rgba(41, 121, 255, 0.4)',
        '&:hover': {
            backgroundColor: 'rgba(41, 121, 255, 0.6)'
        }
    },
    success: {
        backgroundColor: 'rgba(67, 160, 71, 0.4)',
        '&:hover': {
            backgroundColor: 'rgba(67, 160, 71, 0.6)'
        }
    },
    warning: {
        backgroundColor: 'rgba(255, 160, 0, 0.4)',
        '&:hover': {
            backgroundColor: 'rgba(255, 160, 0, 0.6)'
        }
    },
    error: {
        backgroundColor: 'rgba(211, 47, 47, 0.4)',
        '&:hover': {
            backgroundColor: 'rgba(211, 47, 47, 0.6)'
        }
    }
});

const iconTypes = {
    default: SpeakerNotesOutlined,
    info: InfoOutlined,
    error: HighlightOffOutlined,
    warning: ReportProblemOutlined,
    success: CheckCircleOutlineOutlined
}

class NotificationItem extends React.Component {
    constructor(props) {
        super(props);
        this.notificationList = null;
        this.state = {
            isToDelete: false
        }
    }

    handleClose = (key) => (event) => {
        this.setState({
            isToDelete: true
        });

        if (this.props.handleClose) {
            setTimeout(() => {
                this.props.handleClose(key);
            }, 700);
        }
    }

    render() {
        const { classes, className, data } = this.props;
        let notificationType = data.type || 'default';
        let classNameWrap = classes.root + ' ' + classes[notificationType];
        if (className) {
            classNameWrap += ' ' + className;
        }
        if (this.state.isToDelete === true) {
            classNameWrap += ' ' + classes.deleteAnimation;
        }

        const Icon = iconTypes[notificationType];
        return (
            <div className={classNameWrap}>
                <div className={classes.item}>
                    <Close className={classes.iconClose} onClick={this.handleClose(data.key)} />
                    <div>
                        <Icon className={classes.iconType} />
                    </div>
                    <div className={classes.main}>
                        <div className={classes.title}>{data.title}</div>
                        <div className={classes.content} title={data.content}>{data.content}</div>
                        <div className={classes.date}>{getAutoFormattedTime(data.date)}</div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withStyles(styles)(NotificationItem);