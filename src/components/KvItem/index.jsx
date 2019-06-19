import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1
    },
    keyName: {
        fontSize: 14,
        // color: '#EEF9FF',
        fontWeight: 400,
        marginBottom: 6
    },
    value: {
        fontSize: 16,
        // color: '#EEF9FF',
        fontWeight: 600
    }
});
class KvItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { classes, className, keyName, value, style = {} } = this.props;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        return (
            <div className={classNameWrap}>
                <p className={classes.keyName} style={style.keyName}>{keyName}</p>
                <p className={classes.value} style={style.value}>{value}</p>
            </div>
        );
    }
}
KvItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(KvItem));