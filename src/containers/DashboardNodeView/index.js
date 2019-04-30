import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Tabs from '../../components/Tabs';
import NodeInfo from './NodeInfo';
import NodeMetric from './NodeMetric';
import NodeWorkload from './NodeWorkload';

const styles = theme =>( {
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1
    },
    appHeader: {
        width: '100%',
        height: 128,
        backgroundColor: '#4b8bafb3',
        padding: '0px 16px',
        boxSizing: 'border-box'
    },
    headerTop: {
        height: 74,
        lineHeight: '74px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    headerName: {
        display: 'flex',
        alignItems: 'center'
    },
    status: {
        display: 'inline-block',
        width: '48px',
        height: '18px',
        border: '1px solid #4BAF7E',
        color: '#4BAF7E',
        lineHeight: '18px',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 400
    },
    mainTitle: {
        color: '#EEF9FF',
        fontSize: '28px',
        marginRight: '4px',
        fontWeight: 600
    },
    subTitle: {
        fontSize: '16px',
        color: '#EEF9FF'
    },
    headerContent: {
        fontSize: '18px',
        color: '#EEF9FF',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        height: '20px',
        lineHeight: '20px'
    }
 
});
const tabList = [
  {
    name: '基本信息',
    component: NodeInfo
  },
  {
    name: '监控',
    component: NodeMetric
  },
  {
    name: '应用',
    component: NodeWorkload
  }
];
class ListItem extends Component {
  constructor(props) {
      super(props);
      this.state = {
      };
  }
  // componentWillMount() {

  //   this.setState({
  //     isHidden: true,
  //     animateStarted: false,
  //     animateFinished: false
  //   });
  //   console.log('hello');
  // }
  // componentWillReceiveProps(nextProp) {
    
  // }

  // componentDidUpdate(){
 
  // }
  render() {
    const { classes, className, children} = this.props;
    // const { isHidden, stage} = this.state;
    let classNameWrap = classes.root;
    if(className){
      classNameWrap += ' ' + className ;
    }

    return (
      <div className={ classNameWrap }>
          <div className={classes.appHeader}>
            <div className={classes.headerTop}>
                <div className={classes.headerName}>
                    <p className={classes.mainTitle}>节点名称</p>
                    <span className={classes.status}>运行中</span>
                </div>
                <p className={classes.subTitle}>华东 - 杭州西斗门</p>
            </div>
            <p className={classes.headerContent}>
                浙江省杭州市西湖区西斗门路3号天堂软件园11层
            </p>
          </div>
          <Tabs contentList={tabList} viewProps={'test'} />    
      </div>
    );
  }
}

ListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return state.region;
}
export default connect(mapStateToProps)(withStyles(styles)(ListItem));