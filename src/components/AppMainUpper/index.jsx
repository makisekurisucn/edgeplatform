import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CommandSet from '../Select/CommandSet';


const styles = theme => ({
    root: {
        height: 50,
        boxSizing: 'border-box',
        lineHeight: '50px',
        // textAlign: 'center',
        fontSize: 20,
        borderBottom: '1px solid rgb(149,163,170)',
        color: 'rgb(76,92,102)',
        // position: 'relative',
        backgroundColor: 'rgb(231,231,231)',
        display: 'flex',
        justifyContent: 'space-between'
    },
    root2: {
        height: 71,
        boxSizing: 'border-box',
        lineHeight: '71px',
        // textAlign: 'center',
        fontSize: 32,
        color: '#EEF9FF',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(96,139,162)'
    },
    title: {
        display: 'flex'
    },
    arrow1: {
        color: '#979797',
        fontSize: 29,
        verticalAlign: 'middle',
        padding: '0px 2px 0px 19px',
        cursor: 'pointer',
        height: 49
        // lineHeight: '60px'
    },
    arrow2: {
        color: '#EEF9FF',
        fontSize: 37,
        paddingLeft: '19px',
        cursor: 'pointer',
        height: 71
        // lineHeight: '60px'
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
        // height: '36px',
        color: '#EEF9FF',
        lineHeight: '34px',
        textAlign: 'center',
        fontSize: '21px',
        fontWeight: 400,
        backgroundColor: '#4BAF7E',
        borderRadius: '11px',
        margin: '18px 20px'
    },
    select: {
        top: 18,
        height: '35px',
        position: 'relative',
        right: '10px',
        fontSize: 18,
        lineHeight: '35px'
    }
});
const hasRouter = (current, link) => {
    let currentArray = current.split('/');
    let linkArray = link.split('/');
    if (currentArray[0] === '') {
        currentArray.shift();
    }
    if (linkArray[0] === '') {
        linkArray.shift();
    }
    if (currentArray[currentArray.length - 1] === '') {
        currentArray.pop();
    }
    if (linkArray[linkArray.length - 1] === '') {
        linkArray.pop();
    }
    let isMatch = true;
    linkArray.forEach((item, index) => {
        if (!currentArray[index]) {
            isMatch = false;
        }
        else if (currentArray[index] !== item) {
            isMatch = false;
        }
    });
    return isMatch;


}


class AppMainUpper extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // props.history.listen((location) => {
        //     console.log(location.pathname);
        //     this.setState({
        //         selected: hasRouter(location.pathname, props.link)
        //     });

        // })
    }

    // componentWillMount() {
    //     this.setState({
    //         selected: hasRouter(this.props.location.pathname, this.props.link)
    //     });
    // }

    // componentWillReceiveProps(nextProp) {
    //     if (nextProp.location.pathname && nextProp.link) {
    //         this.setState({
    //             selected: hasRouter(nextProp.location.pathname, nextProp.link)
    //         });
    //     }
    // }
    goTo = (link) => (event) => {
        console.log(link);
        this.props.history.push(link);

    }
    goBack = () => {
        this.props.history.goBack();
    }
    render() {
        const { classes, className, type, status, defaultCommand, commandList } = this.props;
        const { selected } = this.state;
        let classNameWrap = '';

        let myAppMainUpper;
        switch (type) {
            case 'job_list':
                myAppMainUpper = <div className={classes.root}>
                    <div>
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
                        <div className={classes.jobApp}>应用APP</div>
                        <div className={classes.status}>{status}</div>
                    </div>
                    <div className={classes.select}>
                        <CommandSet defaultCommand={defaultCommand} commandList={commandList} />

                        {/* <span className={classes.command}>{defaultCommandName}</span>
                        <div className={classes.expandMore}>
                            <ExpandMore className={classes.expandMoreArrow} ></ExpandMore>
                            <ul className={classes.selectList}>
                                <li>编辑</li>
                                <li>删除</li>
                            </ul>
                        </div> */}
                    </div>
                </div>;
                break;
        }

        return (
            <div>{myAppMainUpper}</div>
            /* joblist头部 */
            // <div className={classes.root}>
            //     <ArrowBackIos className={classes.arrow} />
            //     <span>应用列表</span>
            //     <span className={classes.createJob} onClick={this.goTo('/console/jobs/create')}>新建应用</span>
            // </div>
            /* jobdetail头部 */
            // <div className={classes.root2}>
            //     <ArrowBackIos className={classes.arrow} />
            //     <span className={classes.jobApp}>应用APP</span>
            //     <span className={classes.status}>运行中</span>
            // </div>
        );
    }
}
export default withRouter(withStyles(styles)(AppMainUpper));