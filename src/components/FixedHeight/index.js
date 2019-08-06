import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { connect } from 'react-redux';

const styles = theme => ({
    root: {
        overflowX: 'hidden',
        overflowY: 'auto'
    }
});

class FixedHeight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expectedHeight: 0,
            needFixed: true
        };
        this.timeID = null;
        this.delay = 200;
        this.prevResize = 0;
    }

    componentDidMount() {
        if (this.props.reducedHeight) {
            window.addEventListener('resize', this.resizeListener);
            this.setState({
                expectedHeight: window.innerHeight - this.props.reducedHeight
            });
        }
        else {
            this.setState({
                needFixed: false
            })
        }
    }

    componentWillUnmount() {
        if (this.state.needFixed) {
            window.removeEventListener('resize', this.resizeListener);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.reducedHeight !== this.props.reducedHeight) {
            this.changeHeight(nextProps.reducedHeight)
        }
    }

    resizeListener = () => {
        const current = Date.now();
        if ((current - this.prevResize) >= this.delay) {
            this.changeHeight(this.props.reducedHeight);
            this.prevResize = current;
        } else {
            clearTimeout(this.timeID);
            this.timeID = setTimeout(() => {
                this.prevResize = current;
                this.changeHeight(this.props.reducedHeight);
            }, this.delay);
        }
    }

    changeHeight = (reducedHeight) => {
        this.setState({
            expectedHeight: window.innerHeight - reducedHeight
        });

    }

    render() {
        const { children, className, classes } = this.props;

        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className
        }
        // const style=`height:${this.state.expectedHeight};overflow-y: auto`
        if (this.state.needFixed) {
            return (
                <div className={classNameWrap} style={{ height: this.state.expectedHeight }}>
                    {children}
                </div>
            );
        }
        else {
            return (
                <div style={{ 'overflowY': 'hidden', 'overflowX': 'hidden' }}>
                    {children}
                </div>
            );
        }
    }
}

FixedHeight.propTypes = {
    classes: PropTypes.object.isRequired
};


export default withStyles(styles)(FixedHeight);