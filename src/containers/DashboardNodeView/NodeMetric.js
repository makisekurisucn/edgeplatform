import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Tabs from '../../components/Tabs';
const styles = theme =>( {
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1
    }
});
class NodeMetric extends Component {
  constructor(props) {
      super(props);
      this.state = {
      };
  }

  render() {
    const { classes, className, children} = this.props;
    // const { isHidden, stage} = this.state;
    let classNameWrap = classes.root;
    if(className){
      classNameWrap += ' ' + className ;
    }

    return (
      <div className={ classNameWrap }>
        NodeMetric
      </div>
    );
  }
}

NodeMetric.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(NodeMetric));