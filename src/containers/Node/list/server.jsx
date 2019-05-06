import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '../../../components/Table';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Loading from '../../../components/Loading';
import { getServerList } from '../../../actions/Node';

import Tooltip from '@material-ui/core/Tooltip';
import { NavLink } from 'react-router-dom'



// import { isAbsolute } from 'path';

const styles = theme => ({
    root: {
        // width: '100%',
        overflowX: 'auto',
        paddingLeft: theme.spacing.unit * 3,
        paddingRight: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 3
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
});
const header = [{ name: "名称", key: "Name" }, { name: "Leader", key: "Leader", type: "bool" }, { name: "Region", key: "Region" }, { name: "DC", key: "Dc" }, { name: "地址", key: "Addr" }, { name: "状态", key: "Status" }, { name: "创建时间", key: "SubmitTime", type: "time" }];
class SimpleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    itemClick = data => {
        // console.log(this);
        if (data.key === 'Name') {
            this.props.history.push(`/jobs/detail/${data.item.Name}`);
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        getServerList(dispatch);
    }
    render() {
        const { classes, list, loading } = this.props;
        return (
            <div className={classes.root}>
                <Paper>
                    <Loading loading={loading}>
                        <Table header={header} list={list} onItemClick={this.itemClick} />
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
    //   console.log(ownProps);

    return state.nodeServerList;
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleTable));