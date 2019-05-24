import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import FadeWrap from '../../components/FadeWrap';
import FixedHeight from '../../components/FixedHeight';
// import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1
    },
    tabWrap: {
        backgroundColor: 'rgba(75,139,175,0.7)',
        color: '#EEF9FF',
        fontSize: '14px',
        height: 32,
        lineHeight: '32px',
        display: 'flex',
        // disp
    },
    tabItem: {
        width: 120,
        textAlign: 'center',
        fontWeight: 400,
        cursor: 'pointer'
    },
    tabSelected: {
        color: '#fff',
        position: 'relative',
        '&:before': {
            display: 'block',
            content: '""',
            width: 26,
            height: 4,
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: '0px',
            margin: 'auto',
            left: '0px',
            right: '0px'
        }
    },
    tabContentWrap: {
        position: 'relative',
        height: 600
    },
    itemWrap: {
        // position: 'absolute',
        // width: '100%',
        // top: '0px'
        height: 0,
        overflow: 'visible'
    }
});
class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            prevIndex: 0
        };
    }

    componentWillMount() {
        let currentIndex = this.props.index === undefined ? 0 : this.props.index;
        this.setState({
            index: currentIndex
        });

    }
    componentWillReceiveProps(nextProp) {
        let currentIndex = nextProp.index === undefined ? 0 : nextProp.index;
        this.setState({
            index: currentIndex
        });
    }
    switchTab = (index) => (event) => {
        if (index !== this.state.index) {
            this.setState({
                index: index,
                prevIndex: this.state.index
            });
        }
    }
    componentDidUpdate() {

    }
    render() {
        const { classes, className, contentList, index, viewProps } = this.props;
        const currentIndex = this.state.index;
        const prevIndex = this.state.prevIndex;
        let classNameWrap = classes.root;
        let tabList = contentList || [];
        if (className) {
            classNameWrap += ' ' + className;
        }

        return (
            <div className={classNameWrap}>
                <ul className={classes.tabWrap}>
                    {
                        tabList.map((item, index) => {
                            let cls = classes.tabItem;
                            if (index === currentIndex) {
                                cls += ' ' + classes.tabSelected;
                            }
                            return <li className={cls} key={item.name} onClick={this.switchTab(index)}>{item.name}</li>
                        })
                    }
                </ul>
                <FixedHeight reducedHeight={268}>
                    <div className={classes.tabContentWrap}>
                        {
                            tabList.map((item, index) => {
                                let hidden = true;
                                let from = 'left';
                                let to = 'right';
                                if (index === currentIndex) {
                                    if (index > prevIndex) {
                                        from = 'right'
                                    } else {
                                        from = 'left'
                                    }
                                    hidden = false;
                                } else if (index > currentIndex) {
                                    from = 'right';
                                    to = 'right';
                                } else {
                                    from = 'left';
                                    to = 'left';
                                }
                                return <div className={classes.itemWrap} key={item.name}><FadeWrap isHidden={hidden} from={from} to={to}><item.component isHidden={hidden} data={viewProps} /></FadeWrap></div>
                            })
                        }
                    </div>
                </FixedHeight>
                
            </div>
        );
    }
}

Tabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(Tabs));