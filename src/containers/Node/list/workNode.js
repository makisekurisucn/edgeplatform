import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '../../../components/Table';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Loading from '../../../components/Loading';
import { getWorkerList } from '../../../actions/Node';
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink } from 'react-router-dom'



// import { isAbsolute } from 'path';

const styles = theme => ({
    root: {
        // width: '100%',
        overflowX: 'auto',
        // paddingLeft: theme.spacing.unit * 3,
        // paddingRight: theme.spacing.unit * 3,
        // paddingTop: theme.spacing.unit * 3
    },
    table: {
        minWidth: 700,
    },
    fab: {
        margin: theme.spacing.unit,
        position: "absolute",
        right: 3 * theme.spacing.unit,
        bottom: 3 * theme.spacing.unit,

    },
    tableBody:{
        cursor:'pointer'
    }
});
const header = [{ name: "名称", key: "Name" }, { name: "地址", key: "Address" }, { name: "DC", key: "Datacenter" }, { name: "状态", key: "Status" }];
class SimpleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    itemClick = data => {
        // console.log(this);
        // if (data.key === 'Name') {
        this.props.history.push(`/console/node/worker/${data.item.ID}`);
        // }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        getWorkerList(dispatch);


    }
    render() {
        const { classes, list, loading } = this.props;
        return (
            <div className={classes.root}>
                <Paper>
                    <Loading loading={loading}>
                        <Table header={header} list={list} onItemClick={this.itemClick} className={classes.tableBody}/>
                    </Loading>
                </Paper>
            </div>
        );
    }
}
SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {
    console.log(state);
    console.log(ownProps);

    return state.nodeWorkerList;
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleTable));