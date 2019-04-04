import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';

// import AddIcon from '@material-ui/icons/Add';

import { isAbsolute } from 'path';

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class SimpleTable extends Component {
  constructor(props) {
      super(props);
      this.state = {
      };
  }
  clickHandler = (item, key) => (event) => {
    const { onItemClick } = this.props;
    if( onItemClick ){
      onItemClick({
        item,
        key,
        event
      });
    }
  }
  processItem = (head, row) => {
    if(head.type === "time"){
      return moment(row[head.key]).format('MMMM Do YYYY, h:mm:ss a');
    }
    if(head.type === "bool"){
      return row[head.key] + ''
    }
    else{
      return row[head.key]
    }
  }
  render() {
      const { classes, header, list } = this.props;

      return (
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                {header.map((head) => (
                    <TableCell align="center" key={head.name}>{head.name}</TableCell>
                ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row) => (
                  <TableRow key={row.id}>
                  {header.map((head) => (
                    <TableCell align="center" key={row[head.key]} onClick={this.clickHandler(row,head.key)} > {this.processItem(head,row)}</TableCell>
                  ))}
                  </TableRow>
                ))}
                {
                  list.length ? null:<TableRow><TableCell>空</TableCell></TableRow>
                }
              </TableBody>
            </Table>

      );
  }
}
SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string, key: PropTypes.string})).isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};
SimpleTable.defaultProps = {
    header: [],
    list: [],
};

export default withStyles(styles)(SimpleTable);
// export default SimpleTable;
