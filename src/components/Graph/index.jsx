import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import echarts from 'echarts/lib/echarts'





function getOption() {
    var base = +new Date(1968, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var date = [];

    var data = [Math.random() * 300];

    for (var i = 1; i < 20000; i++) {
        var now = new Date(base += oneDay);
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
    }

    let option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
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
                name: '模拟数据',
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(99, 198, 253)'
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
        width: 500,
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
        let myChart = echarts.init(this.ID);
        let options = getOption();
        myChart.setOption(options);

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