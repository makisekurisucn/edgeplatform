import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '../../../components/Table';
import Loading from '../../../components/Loading';
import { getJobList, startBlockingJobList, stopBlockingJobList } from '../../../actions/Job';
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
    tableWrap: {
        padding: 12
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
class SimpleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    itemClick = data => {
        // if (data.key === 'Name') {
        this.props.history.push(`/console/jobs/detail/${data.item.Name}`);
        // }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        getJobList(dispatch);
        startBlockingJobList(dispatch, '2m')
    }
    componentWillUnmount() {
        const { dispatch } = this.props;
        stopBlockingJobList(dispatch)
    }
    render() {
        const { classes, list, loading } = this.props;
        return (
            <div className={classes.root}>
                {/* <Paper> */}
                <Loading loading={loading}>
                    <AppMainUpper type='job_list' />
                    <div className={classes.tableWrap}>
                        <Table header={header} list={list} onItemClick={this.itemClick} className={classes.tableBody} />
                    </div>
                </Loading>
                {/* </Paper> */}


            </div>
        );
    }
}
SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};
function mapStateToProps(state, ownProps) {

    return state.joblist;
}

export default connect(mapStateToProps)(withStyles(styles)(SimpleTable));