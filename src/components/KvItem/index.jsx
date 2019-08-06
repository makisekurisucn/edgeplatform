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
    valueContent: {
        display: 'table',
        width: '100%'
    },
    value: {
        display: 'table-cell',
        fontSize: 16,
        // color: '#EEF9FF',
        fontWeight: 600
    },
    sign: {
        display: 'table-cell',
        width: '44px',
        paddingLeft: '14px',
        textAlign: 'center',
        verticalAlign: 'middle'
    }
});
class KvItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { classes, className, keyName, value, style = {}, sign } = this.props;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        return (
            <div className={classNameWrap}>
                <div className={classes.keyName} style={style.keyName}>{keyName}</div>
                <div className={classes.valueContent}>
                    {/* {
                        sign ? <div className={classes.sign}>{sign}</div> : null
                    } */}
                    <div className={classes.value} style={style.value}>{value}</div>
                    {
                        sign ? <div className={classes.sign}>{sign}</div> : null
                    }
                </div>
                {/* <div className={classes.value} style={style.value}>{value}</div> */}
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