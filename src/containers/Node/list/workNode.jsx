import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
// import Table from '../../../components/Table';
import TableHoc from '../../../components/TableHoc';
import Color from '../../../components/Color';
import Loading from '../../../components/Loading';
import { getWorkerList } from '../../../actions/Node';




// import { isAbsolute } from 'path';

const styles = theme => ({
    root: {
        // width: '100%',
        overflowX: 'auto',
        padding: 12
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
    },

});
const kvMap = {
    service: '服务',
    pending: '启动中',
    running: '运行中',
    dead: '已停止',
    ready: '就绪',
    down: '已停止',
    alive: '运行中'
}
const statusConvert = (status) => {
    if(status ==="ready"){
        return <Color color="green">{kvMap[status]}</Color>;
    }
    else{
        return kvMap[status];
    }
};
const header = [{ name: "名称", key: "Name" }, { name: "IP地址", key: "Address"}, { name: "数据中心", key: "Datacenter" }, {name: "地点",key: "location"},{ name: "状态", key: "Status",convert: statusConvert }];
const TableH = TableHoc(header);
class SimpleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    itemClick = data => {
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
                <Loading loading={loading}>
                    <TableH list={list} onItemClick={this.itemClick} className={classes.tableBody}/>
                </Loading>
            </div>
        );
    }
}
SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {

    return state.nodeWorkerList;
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleTable));