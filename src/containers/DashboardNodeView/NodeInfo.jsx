import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import KvItem from '../../components/KvItem'
import Tabs from '../../components/Tabs';
const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        padding: '30px 45px'
    },
    kvItem: {
        marginBottom: 30
    }
});
class NodeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes, className } = this.props;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }

        return (
            <div className={classNameWrap}>
                <KvItem keyName="类型" className={classes.kvItem} value="工作节点" />
                <KvItem keyName="主机名" className={classes.kvItem} value="node130.localhost" />
            </div>
        );
    }
}
NodeInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(NodeInfo));