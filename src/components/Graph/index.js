import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import echarts from 'echarts/lib/echarts';






function getOption(values, config) {
    let date = values.date;
    let data = values.data;

    let option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            },
            formatter: config.option.tooltip.formatter
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: date,
            show: false
        },
        yAxis: config.option.yAxis,
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
                lineStyle: {
                    width: 1
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
        const values = this.props.values
        const config = this.props.config;
        if (this.ID) {
            let myChart = echarts.init(this.ID);
            let options = getOption(values, config);
            myChart.setOption(options);
            myChart.resize({ width: this.ID.clientWidth });
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