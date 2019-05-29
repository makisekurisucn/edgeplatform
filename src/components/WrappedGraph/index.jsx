import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Graph from '../Graph'
const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        height: 172,
        width: '100%',
        border: '1px solid rgba(136, 136, 136, 0.44)',
        backgroundColor: 'rgba(238, 249, 255, 0.05)'
    },
    graph: {
        width: '100%',
        height: 140
    },
    textWrap: {
        height: 32,
        lineHeight: '32px',
        display: 'flex',
        padding: '0px 10px',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        fontWeight: 500,
        color: 'rgba(136, 136, 136, 0.44)',

    },
    current: {
        fontSize: 20,
        fontWeight: 600,
        color: '#EEF9FF'
    }
});
class WrappedGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { classes, className, data, nodeInfo, config } = this.props;
        const current = data[0] ? data[0].values[data[0].values.length - 1][1] : '';
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        return (
            <div className={classNameWrap}>
                <p className={classes.textWrap}>
                    <span className={classes.title}>{config.title}</span>
                    <span className={classes.current}>{config.dataWrap(current) +' '+ config.unit}</span>

                </p>
                <Graph className={classes.graph} nodeInfo={nodeInfo} config={config} data={data} />
            </div>
        );
    }
}
WrappedGraph.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(WrappedGraph);