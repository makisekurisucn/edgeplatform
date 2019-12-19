import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import CommandSet from '../Select/CommandSet';


const styles = theme => ({
    root: {
        height: 50,
        boxSizing: 'border-box',
        lineHeight: '50px',
        fontSize: 20,
        color: 'rgb(76,92,102)',
        backgroundColor: 'rgb(231,231,231)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    root2: {
        height: 71,
        boxSizing: 'border-box',
        lineHeight: '64px',
        fontSize: 32,
        color: '#0C567F',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#eeeeee'
    },
    colorWrap: {
        backgroundColor: '#F5F6F6'
    },
    leftContent: {
        height: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        display: 'flex'
    },
    arrow1: {
        color: '#979797',
        fontSize: 29,
        padding: '0px 2px 0px 19px',
        cursor: 'pointer',
        height: '50px'
    },
    arrow2: {
        color: '#4B8BAF',
        fontSize: 37,
        paddingLeft: '19px',
        cursor: 'pointer',
        height: 71
    },
    createJob: {
        float: 'right',
        backgroundColor: 'rgb(75,139,175)',
        width: 128,
        height: 50,
        textAlign: 'center',
        color: 'rgb(238,249,255)',
        cursor: 'pointer'
    },
    status: {
        width: '106px',
        color: '#4BAF7E',
        lineHeight: '31px',
        textAlign: 'center',
        fontSize: '21px',
        fontWeight: 400,
        margin: '18px 20px',
        border: '2px solid #4BAF7E',
    },
    green: {
        color: '#4BAF7E',
        border: '2px solid #4BAF7E',
    },
    yellow: {
        color: '#AF954B',
        border: '2px solid #AF954B',
    },
    gray: {
        color: '#ABABAB',
        border: '2px solid #ABABAB',
    },
    select: {
        top: 18,
        height: '37px',
        position: 'relative',
        right: '10px',
        fontSize: 18,
        lineHeight: '37px'
    },
    commandSet: {
        color: '#EEF9FF'
    }
});


class AppMainUpper extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    goTo = (link) => (event) => {
        this.props.history.push(link);

    }
    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        const { classes, type, status, data = {}, statusColor } = this.props;


        let myAppMainUpper;
        switch (type) {
            case 'job_list':
                myAppMainUpper = <div className={classes.root}>
                    <div className={classes.leftContent}>
                        <ArrowBackIos className={classes.arrow1} onClick={this.goBack} />
                        <span>应用列表</span>
                    </div>
                    <span className={classes.createJob} onClick={this.goTo('/console/jobs/create')}>新建应用</span>
                </div>;
                break;
            case 'job_detail':
                myAppMainUpper = <div className={classes.root2}>
                    <div className={classes.title}>
                        <ArrowBackIos className={classes.arrow2} onClick={this.goBack} />
                        <div className={classes.jobApp}>{data.name}</div>
                        <div className={classes.status + ' ' + classes[statusColor]}>{status}</div>
                    </div>
                    <div className={classes.select}>
                        <CommandSet className={classes.commandSet} defaultCommand={data.defaultCommand} commandList={data.commandList} />
                    </div>
                </div>;
                break;
            case 'work_node_detail':
                myAppMainUpper = <div className={classes.root2 + ' ' + classes.colorWrap}>
                    <div className={classes.title}>
                        <ArrowBackIos className={classes.arrow2} onClick={this.goBack} />
                        <div className={classes.jobApp}>{data.name}</div>
                        <div className={classes.status}>{status}</div>
                    </div>

                </div>;
                break;
            default:
                myAppMainUpper = null;
        }

        return (
            <div>{myAppMainUpper}</div>
        );
    }
}
export default withRouter(withStyles(styles)(AppMainUpper));