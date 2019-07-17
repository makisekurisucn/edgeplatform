import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';



const styles = theme => ({
    root: {
        position: 'relative',
        height: 73,
        boxSizing: 'border-box',
        border: '1px solid rgb(105,105,105)',
        margin: '5px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.12)'
        },
        color: '#EEF9FF',
        fontSize: 12,
        backgroundColor: 'rgba(216,216,216,0.11)'
    },
    topContent: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 14,
        boxSizing: 'border-box',
        textAlign: 'center',
        maxWidth: 105,
        height: 20,
        padding: '0px 9px',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        backgroundColor: 'rgb(105,105,105)'

    },
    date: {
        fontWeight: 300,
        color: 'rgb(181,181,181)',
        margin: '3px 15px',
        whiteSpace: 'nowrap'
    },
    middleContent: {
        height: 26
    },
    bottomContent: {
        height: 22,
        display: 'flex',
        justifyContent: 'space-between'
    },
    itemCount: {
        fontSize: 16,
        fontWeight: 500,
        marginLeft: 4,
        marginRight: 3
    },
    colorGreen: {
        color: '#4BAF7E'
    },
    colorYellow: {
        color: '#AF954B'
    },
    colorGray: {
        color: '#ABABAB'
    },
    // status: {
    //     color: 'rgb(75, 175, 126)'
    // },
    location: {
        fontWeight: 500,
        lineHeight: '22px',
        marginRight: 5
    },
    selectedBkg: {
        backgroundColor: 'rgba(0,0,0,0.12)'
    },
    arrow: {
        // color: '#979797',
        fontSize: 18,
        float: 'right'
    },
    selectedArrow: {
        color: 'rgb(75,139,175)'
    },
    selectedTitle: {
        backgroundColor: 'rgba(73,117,142,0.83)'
    }

});
class AllocationListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRegion: null
        };
    }

    clickHandler = (item, index) => (event) => {
        if (this.props.onClick) {
            this.props.onClick(item, index)
        }
    }

    render() {
        const { classes, className, index, selected, itemData = {} } = this.props;
        let classNameWrap = classes.root;
        let titleWrap = classes.title;
        let arrowWrap = classes.arrow;


        if (className) {
            classNameWrap = classes.root + ' ' + className;
        }

        if (selected) {
            classNameWrap += ' ' + classes.selectedBkg;
            titleWrap += ' ' + classes.selectedTitle;
            arrowWrap += ' ' + classes.selectedArrow;
        }
        console.log(classNameWrap)

        return (
            <div className={classNameWrap} onClick={this.clickHandler(itemData, index)}>
                <div className={classes.topContent}>
                    <div className={titleWrap} title={itemData.title}>{itemData.title}</div>
                    <div className={classes.date}>{itemData.date}</div>
                </div>
                <div className={classes.middleContent}>
                    <ArrowForwardIos className={arrowWrap} />
                </div>
                <div className={classes.bottomContent}>
                    <div>
                        {
                            itemData.runningTasksNumber > 0 ?
                                <div>
                                    <span className={classes.itemCount}>{itemData.runningTasksNumber}</span>
                                    <span className={classes.colorGreen}>运行中</span>
                                </div> : null
                        }
                        {
                            itemData.pendingTaskNumber > 0 ?
                                <div>
                                    <span className={classes.itemCount}>{itemData.pendingTaskNumber}</span>
                                    <span className={classes.colorYellow}>启动中</span>
                                </div> : null
                        }
                        {
                            itemData.deadTaskNumber > 0 ?
                                <div>
                                    <span className={classes.itemCount}>{itemData.deadTaskNumber}</span>
                                    <span className={classes.colorGray}>已停止</span>
                                </div> : null
                        }

                    </div>
                    <div className={classes.location}>{itemData.location}</div>
                </div>

            </div>
        );
    }
}

AllocationListItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(AllocationListItem));