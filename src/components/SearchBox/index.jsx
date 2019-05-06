import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Search from '@material-ui/icons/Search';

const styles = theme => ({
    root: {
        position: 'relative',
        height: 48,
        width: 384,
    },
    inputs: {
        height: "100%",
        width: "100%",
        position: 'absolute',
        zIndex: 100,
        backgroundColor: '#161616cc',
        boxShadow: '1px 1px 6px #ababab',
        boxSizing: 'border-box',
        // top: 24,
        // left: 24,

        lineHeight: "48px",
        textIndent: 10,
        fontSize: 20,
        border: 'none',
        color: '#EEF9FF',
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
        color: '#EEF9FF',
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
            currentRegion: null
        };
    }
    //   componentWillMount() {
    //     const { dispatch } = this.props;
    //     getRegionList(dispatch);
    //   }
    componentWillReceiveProps(nextProp) {
        if (nextProp.regionList.length && !this.state.currentRegion) {
            this.setState({
                currentRegion: nextProp.regionList[0]
            });
        }
    }
    selectRegion = region => {
        this.setState({
            currentRegion: region
        });
    }
    render() {
        const { classes, barName, regionList, className } = this.props;
        let classNameWrap;
        if (className) {
            classNameWrap = className + " " + classes.root;
        }
        else {
            classNameWrap = classes.root;
        }
        return (
            <div className={classNameWrap}>
                <input type="text" className={classes.inputs} />
                <Search className={classes.searchSign} />
            </div>
        );
    }
}

SearchBox.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(SearchBox));