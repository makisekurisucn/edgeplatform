import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppCard from '../../components/AppCard';
import {setRegion} from '../../utils/handleRequest';
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

    turnToJobDetail=(ID)=>{
        const currentRegion=this.props.data.region;

        setRegion(currentRegion);
        window.location.href=`/#/console/jobs/detail/${ID}`;

    }

    render() {
        const { classes, className, children, data, list } = this.props;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }

        return (
            <div className={classNameWrap}>
                {
                    list.map((item) => {
                        if (item.NodeID === data.ID) {
                            let pendingTasksNumber=0,deadTasksNumber=0,runningTaskNumber=0;
                            Object.keys(item.TaskStates).forEach(task=>{
                                switch(item.TaskStates[task].State){
                                    case 'dead':
                                        deadTasksNumber++;break;
                                    case 'pending':
                                        pendingTasksNumber++;break;
                                    case 'running':
                                        runningTaskNumber++;break;
                                    default:
                                }
                            })
                            const wrappedData={
                                ID:item.JobID,
                                name:item.Name,
                                time:item.CreateTime,
                                deadTasksNumber,
                                pendingTasksNumber,
                                runningTaskNumber
                            }
                            return <AppCard className={classes.marginBottom10} data={wrappedData} onItemClick={this.turnToJobDetail} key={item.ID} />
                        }
                    })
                }
            </div>
        );
    }
}
NodeWorkload.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
    return state.Allocationlist;
}
export default connect(mapStateToProps)(withStyles(styles)(NodeWorkload));