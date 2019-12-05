import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
        position: 'relative',
        height: 48,
        width: 384,
        lineHeight: "48px",
        fontSize: 20,
        fontWeight: '400',
        color: '#EEF9FF'
    },
    inputs: {
        height: "100%",
        width: "100%",
        position: 'absolute',
        zIndex: 100,
        // backgroundColor: 'rgba(22,22,22,0.8)',
        boxShadow: '1px 1px 6px #ababab',
        boxSizing: 'border-box',
        // top: 24,
        // left: 24,

        lineHeight: "inherit",
        textIndent: 10,
        fontSize: 'inherit',
        fontWeight: 'inherit',
        border: 'none',
        color: 'inherit',
        '&:focus': {
            outline: 'none'
        }
    },
    searchSign: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        margin: 'auto',
        right: 10,
        zIndex: 100,
        color: 'rgb(0, 0, 0)',
        fontSize: 30,
        cursor: 'pointer',
        '&:hover': {
            color: '#4B8BAF'
        }
    }

});
class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.input = null;
        this.timeID = null;
    }

    handleClick = () => {
        clearTimeout(this.timeID);
        this.props.onSearch(this.input.value.trim());
    }
    handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            this.handleClick();
        }
    }
    handleChange = () => {
        clearTimeout(this.timeID);
        this.timeID = setTimeout(() => {
            this.handleClick();
        }, 500);
    }
    render() {
        const { classes, className } = this.props;
        let classNameWrap;
        if (className) {
            classNameWrap = className + " " + classes.root;
        }
        else {
            classNameWrap = classes.root;
        }
        return (
            <div className={classNameWrap}>
                <input type="text" className={classes.inputs} ref={ele => { this.input = ele }} onKeyDown={this.handleKeyDown} onChange={this.handleChange} />
                <Search className={classes.searchSign} onClick={this.handleClick} />
            </div>
        );
    }
}

SearchBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBox);