import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme =>( {
    progress: {
        margin: theme.spacing.unit * 3 + "px auto" ,
        display: "block"
    },
});

function Loading(props) {
  const { classes, loading, children} = props;
  if(loading){
    return (
        <CircularProgress className={classes.progress} />
    );      
  }
  else{
      return (
        <div>
            {children}
        </div>
      )
  }

}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool
};

export default withStyles(styles)(Loading);