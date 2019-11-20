import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
// import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1
    },
    animate: {
        transition: 'all 500ms cubic-bezier(0.1 , 0.9 , 0.2 , 1)'
    },
    left: {
        left: -20,
        opacity: 0
    },
    right: {
        left: 20,
        opacity: 0
    },
    top: {
        top: -20,
        opacity: 0
    },
    bottom: {
        top: 20,
        opacity: 0
    },
    none: {
        display: 'none'
    }
});
class FadeWrap extends Component {
    constructor(props) {
        // stage: initialized, animationStarted, finished
        super(props);
        this.wrap = React.createRef();
        this.initialized = false;
        this.state = {
            isHidden: false,
            stage: 'finished'
        };
    }
    UNSAFE_componentWillMount() {

        this.setState({
            isHidden: this.props.isHidden,
            stage: 'finished'
        });
        // console.log(this.state);
        // console.log(this.props);

    }
    UNSAFE_componentWillReceiveProps(nextProp) {
        if (!this.initialized) {
            this.setState({
                isHidden: nextProp.isHidden,
                stage: 'finished'
            });
            this.initialized = true;
            return;
        }
        if (nextProp.isHidden === true || nextProp.isHidden === 'true') {

            if (this.state.isHidden === false) {
                this.setState({
                    isHidden: true,
                    stage: 'initialized'
                });
                setTimeout(() => {
                    this.setState({
                        isHidden: true,
                        stage: 'animationStarted'
                    });
                }, 10);
                setTimeout(() => {
                    this.setState({
                        isHidden: true,
                        stage: 'finished'
                    });
                }, 510);
            }

        } else {
            if (this.state.isHidden === true) {
                this.setState({
                    isHidden: false,
                    stage: 'initialized'
                });
                setTimeout(() => {
                    this.setState({
                        isHidden: false,
                        stage: 'animationStarted'
                    });
                }, 10);
                setTimeout(() => {
                    this.setState({
                        isHidden: false,
                        stage: 'finished'
                    });
                }, 510);
            }
        }
    }

    componentDidUpdate() {
        // console.log(this.state);
        // if(!this.state.animateStarted && !this.state.animateFinished){
        //   this.setState({
        //     animateStarted: true
        //   });
        //   setTimeout(()=>{
        //     this.setState({
        //       animateFinished: true,
        //       animateStarted: false,
        //     });
        //   },200);
        // }

        // setTimeout(() => {
        //   console.log(this.refs);
        // },200)
    }
    render() {
        const { classes, className, children } = this.props;
        const { isHidden, stage } = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        let from = this.props.from || 'left';
        let to = this.props.to || 'left';
        if (stage === 'initialized') {
            if (!isHidden) {
                classNameWrap += ' ' + classes[from]
            }
        } else if (stage === 'animationStarted') {
            classNameWrap += ' ' + classes.animate;
            if (isHidden) {
                classNameWrap += ' ' + classes[to];
            }
        } else if (stage === 'finished') {
            if (isHidden) {
                classNameWrap += ' ' + classes.none;
            }
        }

        return (
            <div className={classNameWrap} ref={this.wrap}>
                {children}
            </div>
        );
    }
}

FadeWrap.propTypes = {
    classes: PropTypes.object.isRequired,
};

// function mapStateToProps(state, ownProps) {
//     return state.region;
// }
// export default connect(mapStateToProps)(withStyles(styles)(FadeWrap));
export default withStyles(styles)(FadeWrap);