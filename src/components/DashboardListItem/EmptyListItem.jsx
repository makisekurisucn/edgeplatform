import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';


const styles = theme => ({
    root: {
        position: 'relative',
        height: 108,
        width: '100%',
        boxSizing: 'border-box',
        padding: '0px 9px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(22,22,22,0.55)'
        }
    },
    innerWrap: {
        height: '100%',
        borderBottom: '1px solid rgba(255,255,255,0.46)',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    main: {
        height: '100%',
        width: '80%'
    },
    mainUpper: {
        height: '65%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mainTitle: {
        color: '#EEF9FF',
        fontSize: 22,
        '&:before': {
            backgroundColor: "#4BAF7E",
            width: 12,
            height: 12,
            display: 'inline-block',
            borderRadius: '50%',
            marginRight: 4
        }
    }
});
class EmptyListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    render() {
        const { classes, className} = this.props;
        let classNameWrap;
        if (className) {
            classNameWrap = className + " " + classes.root;
        }
        else {
            classNameWrap = classes.root;
        }
        return (
            <div className={classNameWrap} >
                <div className={classes.innerWrap}>
                    <div className={classes.main}>
                        <div className={classes.mainUpper}>
                            {/* {'aaaaaaaaaa'} */}
                            <p className={classes.mainTitle}>{'没有匹配的结果'}</p>
                            {/* <p className={classes.subTitle}>{itemData.region}</p> */}
                        </div>
                        {/* <div className={classes.mainLower} title={itemData.address}>{itemData.address}</div> */}
                    </div>
                </div>
            </div>
        );
    }
}

EmptyListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(EmptyListItem));