import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const styles = theme => ({
    root: {
        width: 384,
        height: 32,
        backgroundColor: '#191919e6',
        marginBottom: 4,
        color: '#EEF9FF',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: '32px'
    },
    back: {
        fontSize: 12,
        lineHeight: '32px',
        '&>*': {
            verticalAlign: 'middle'
        },
        cursor: 'pointer',
        height: 32,
        float: 'left',
        width: 0,
        whiteSpace: 'nowrap',
    }
});
class ListNav extends Component {


    clickHandler = () => {
        const { onBack, title } = this.props;
        if (onBack) {
            onBack(title);
        }
    }
    render() {
        const { classes, title } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.back} onClick={this.clickHandler}>
                    <ChevronLeft />
                    <span>返回</span>
                </div>
                {title}
            </div>
        )
    }
}

// Loading.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(ListNav);