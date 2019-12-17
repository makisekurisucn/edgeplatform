import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { blueGrey } from '@material-ui/core/colors';

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
    noBoxShadow: {
        boxShadow: 'none'
    }
});

class EventInfo extends Component {
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
            <Paper className={classNameWrap} classes={{ elevation2: classes.noBoxShadow }}>
                <TabContainer>
                    <div className={classes.logWrap}>
                        {
                            detail.Events && detail.Events.map((e, eIndex) => (
                                <p className={classes.logContent} key={eIndex} >{e.Timestamp}: {e.Message}</p>
                            ))
                        }
                    </div>
                </TabContainer>
            </Paper>
        );
    }
}
EventInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(EventInfo));