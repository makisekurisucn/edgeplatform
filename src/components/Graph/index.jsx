import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import echarts from 'echarts/lib/echarts';
import {getPreciseTime} from '../../utils/formatTime'





function getOption(values,config) {
    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [];

    for (var i = 0; i < values.length; i++) {
        let valueData=getPreciseTime(values[i][0]*1000);
        date.push(valueData);
        data.push(config.dataWrap(values[i][1]));
    }

    let option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            },
            formatter:config.option.tooltip.formatter
            // formatter:'时间 : {b0}<br/>{a0} : {c0}%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            show: false
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            show: false
        },
        grid: {
            show: false,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%'


        },
        series: [
            {
                name: config.title,
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(99, 198, 253)'
                },
                lineStyle:{
                    width:1
                },
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(99, 198, 253)'
                    }, {
                        offset: 1,
                        color: 'rgba(99, 198, 253, 0)'
                    }])
                },
                data: data
            }
        ]
    };
    return option;

}
const styles = theme => ({
    root: {
        width: "100%",
        height: 200
    }
});
class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    initGraph = () => {
        if(this.props.data[0]){
            let myChart = echarts.init(this.ID);
            let config = this.props.config;
            let values = this.props.data[0].values
            let options = getOption(values,config);
            myChart.setOption(options);
            myChart.resize({width:this.ID.clientWidth});
        }
    }

    //   componentDidMount() {
    //     this.initGraph()
    //   }
    componentDidUpdate() {
        setTimeout(() => {
            this.initGraph()
        }, 200)
    }
    render() {
        const { classes, className } = this.props;
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        return (
            <div className={classNameWrap} ref={ID => this.ID = ID} >
            </div>
        );
    }
}
Graph.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Graph);