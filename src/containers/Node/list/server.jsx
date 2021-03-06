import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '../../../components/Table';
import Loading from '../../../components/Loading';
import { getServerList } from '../../../actions/Node';



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
});
const header = [{ name: "名称", key: "Name" }, { name: "主控节点", key: "Leader", type: "bool" }, { name: "地域", key: "Region" }, { name: "数据中心", key: "Dc" }, { name: "地址", key: "Addr" }, { name: "状态", key: "Status" }];
class SimpleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    itemClick = data => {
        // console.log(this);
        // if (data.key === 'Name') {
        //     this.props.history.push(`/console/jobs/detail/${data.item.Name}`);
        // }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        getServerList(dispatch);
    }
    render() {
        const { classes, list, loading } = this.props;
        return (
            <div className={classes.root}>
                <Loading loading={loading}>
                    <Table header={header} list={list} onItemClick={this.itemClick} />
                </Loading>
            </div>
        );
    }
}
SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {
    return state.nodeServerList;
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleTable));