import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { blueGrey, lightGreen, amber, lightBlue } from '@material-ui/core/colors';

import Typography from '@material-ui/core/Typography';


function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    fab: {
        margin: theme.spacing.unit,
        position: "absolute",
        right: 3 * theme.spacing.unit,
        bottom: 3 * theme.spacing.unit,
    },
    headerContainer: {
        padding: 16,

    },
    headerTtile: {
        fontSize: 24,
        height: 30,
        lineHeight: "30px",
        marginRight: 10
    },
    headerStatus: {
        fontSize: 14,
        color: blueGrey[50],
        backgroundColor: blueGrey[200],
        padding: "2px 10px",
        borderRadius: 4
    },
    contentHeader: {
        fontWeight: 'bold',
        margin: 0
    },
    contentBody: {
        textIndent: 50,
    },
    contentItem: {
        marginBottom: 20,
    },
    bold: {
        fontWeight: 'bold'
    },
    contentDivider: {
        marginBottom: 20,
        marginTop: 20
    },
    headerUnderline: {
        marginTop: 10,
        marginBottom: 10
    },
    taskItem: {
        marginBottom: 20
    },
    taskItemName: {
        textAlign: 'right'
    },
    large: {
        fontSize: 20
    },
    groupName: {
        color: lightBlue[800]
    },
    secondaryColor: {
        color: theme.sec
    },
    historyHeader: {
        marginRight: 20
    },
    statusList: {
        fontSize: '1rem',
        lineHeight: '1.75',
        display: 'flex'

    },
    statusItem: {
        width: 28,
        height: 28,
        borderRadius: '50%',
        textAlign: 'center',
        marginRight: 18,
        cursor: 'pointer'
    },
    statusGrey: {
        color: blueGrey[50],
        backgroundColor: blueGrey[200],
    },
    statusGreen: {
        color: lightGreen[50],
        backgroundColor: lightGreen[700],
    },
    statusYellow: {
        color: amber[50],
        backgroundColor: amber[800],
    },
    statusSelected: {
        transform: 'scale(1.2)'
    },
    logWrap: {
        backgroundColor: blueGrey[900],
        height: 300,
        overflowY: 'auto',
        borderRadius: 4,
        padding: 8
    },
    logContent: {
        fontSize: 16,
        color: blueGrey[50],
        marginTop: 4,
        marginBottom: 4
    },
    taskGroupWrap: {
        backgroundColor: blueGrey[50]
    },
    driverStatus: {
        fontSize: 12,
        fontWeight: 'normal'
    },
    noBoxShadow: {
        boxShadow: 'none'
    }
});

const kvMap = {
    pending: '启动中',
    service: '服务',
    running: '运行中'
}

class WorkNodeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    selectTask = (index) => [
        this.setState({
            selectedTaskIndex: index
        })
    ]

    render() {
        const { classes, className, data: detail } = this.props;
        let classNameWrap = classes.root;

        if (className) {
            classNameWrap += ' ' + className;
        }

        return (
            <Paper className={classes.root} classes={{ elevation2: classes.noBoxShadow }}>
                {/* <Typography component="div">
                    <Grid container className={classes.headerContainer} alignItems="center">
                        <Grid className={classes.headerTtile}>{detail.Name}</Grid>
                        <Grid className={`${classes.headerStatus} ${detail.Status === "ready" ? classes.statusGreen : null} ${detail.Status === "pending" ? classes.statusYellow : null}`}>{detail.Status}</Grid>
                    </Grid>
                </Typography> */}
                {/* <AppBar position="static">
                    <Tabs value={index} onChange={this.handleChange}>
                        <Tab label="基本信息" />
                        <Tab label="事件信息" />
                    </Tabs>
                </AppBar> */}

                <TabContainer>


                    <div className={classes.logWrap}>
                        {detail.Events && detail.Events.map((e, eIndex) => (
                            <p className={classes.logContent} key={eIndex} >{e.Timestamp}: {e.Message}</p>
                        ))

                        }
                    </div>
                </TabContainer>



            </Paper>
        );
    }
}
WorkNodeInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(WorkNodeInfo));