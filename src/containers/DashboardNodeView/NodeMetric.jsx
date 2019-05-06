import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import WrappedGraph from '../../components/WrappedGraph'
const styles = theme => ({
    root: {
        padding: 10
    },
    graph: {
        marginBottom: 10
    }
});
class NodeMetric extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {
            classes,
            className,
            children
        } = this.props;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }

        return (
            <div className={classNameWrap} >
                <WrappedGraph className={classes.graph} />
                <WrappedGraph className={classes.graph} />
            </div>
        );
    }
}

NodeMetric.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(NodeMetric));