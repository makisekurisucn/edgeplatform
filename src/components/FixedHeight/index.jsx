import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

class FixedHeight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expectedHeight: 0,
            needFixed: true
        };
    }

    componentWillMount() {
        if (this.props.reducedHeight) {
            window.addEventListener('resize', this.changeHeight);
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

    componentDidMount() {
        // window.addEventListener('resize',this.changeHeight);
    }

    componentWillUnmount() {
        if (this.state.needFixed) {
            window.removeEventListener('resize', this.changeHeight);
        }
    }

    changeHeight = () => {
        this.setState({
            expectedHeight: window.innerHeight - this.props.reducedHeight
        });

    }

    render() {
        const { children } = this.props;
        // const style=`height:${this.state.expectedHeight};overflow-y: auto`
        if (this.state.needFixed) {
            return (
                <div style={{ height: this.state.expectedHeight, 'overflowY': 'auto', 'overflowX': 'hidden' }}>
                    {children}
                </div>
            );
        }
        else {
            return (
                <div style={{'overflowY': 'hidden', 'overflowX': 'hidden' }}>
                    {children}
                </div>
            );
        }
    }
}




export default connect()(FixedHeight);