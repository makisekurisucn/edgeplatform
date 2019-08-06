import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '../../../components/Table';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Loading from '../../../components/Loading';
import { getJobList } from '../../../actions/Job';
import Tooltip from '@material-ui/core/Tooltip';
import { NavLink } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import AppMainUpper from '../../../components/AppMainUpper';



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
    tableBody: {
        cursor: 'pointer'
    }
});
const header = [{ name: "名称", key: "Name" }, { name: "类型", key: "Type" }, { name: "状态", key: "Status" }, { name: "创建时间", key: "SubmitTime", type: "time" }];
const list = [{ name: "hello", test: "没过", id: 1 }];
class SimpleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    itemClick = data => {
        // console.log(this);
        // if (data.key === 'Name') {
        this.props.history.push(`/console/jobs/detail/${data.item.Name}`);
        // }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        getJobList(dispatch);
        // this.state.list = list;
        // console.log("test1");
        //  react setState 测试用例

    }
    render() {
        const { classes, list, loading } = this.props;
        console.log(list);
        return (
            <div className={classes.root}>
                <Paper>
                    <Loading loading={loading}>
                        <AppMainUpper type='job_list' />
                        <Table header={header} list={list} onItemClick={this.itemClick} className={classes.tableBody} />
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

    return state.joblist;
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleTable));