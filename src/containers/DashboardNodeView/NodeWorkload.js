import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppCard from '../../components/AppCard';
// import Tabs from '../../components/Tabs';
const styles = theme => ({
  root: {
    padding: 10
  },
  marginBottom10: {
    marginBottom: '10px'
  }
});
class NodeWorkload extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes, className, children } = this.props;
    // const { isHidden, stage} = this.state;
    let classNameWrap = classes.root;
    if (className) {
      classNameWrap += ' ' + className;
    }

    return (
      <div className={classNameWrap}>
        <AppCard className={classes.marginBottom10} />
        <AppCard className={classes.marginBottom10} />
        <AppCard className={classes.marginBottom10} />
        <AppCard className={classes.marginBottom10} />
      </div>
    );
  }
}
NodeWorkload.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(NodeWorkload));