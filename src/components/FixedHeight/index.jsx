import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

class FixedHeight extends Component{
    constructor(props){
        super(props);
        this.state={
            expectedHeight:0
        };
    }

    componentWillMount(){
        this.setState({
            expectedHeight:window.innerHeight-this.props.reducedHeight
        });
    }

    componentDidMount(){
        window.addEventListener('resize',this.changeHeight);
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.changeHeight);
    }

    changeHeight=()=>{
        console.log(window.innerHeight);
        this.setState({
            expectedHeight:window.innerHeight-this.props.reducedHeight
        });

    }

    render(){
        const {children}=this.props;
        // const style=`height:${this.state.expectedHeight};overflow-y: auto`
        return (
            <div style={{height:this.state.expectedHeight,'overflowY': 'auto','overflowX': 'hidden'}}>
                {children}
            </div>
        );
    }
}




export default connect()(FixedHeight);