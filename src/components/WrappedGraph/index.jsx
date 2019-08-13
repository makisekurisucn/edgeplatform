import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Graph from '../Graph';
import Select from '../Select/HorizontalButton';
const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        height: 172,
        width: '100%',
        border: '1px solid rgba(136, 136, 136, 0.44)',
        backgroundColor: 'rgba(238, 249, 255, 0.05)',
        boxSizing: 'border-box'
    },
    graph: {
        width: '100%',
        height: 140
    },
    textWrap: {
        height: 32,
        lineHeight: '32px',
        display: 'flex',
        padding: '0px 10px',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18,
        fontWeight: 500,
        color: 'var(--metric-title-color,rgba(136, 136, 136, 0.44))',
        maxWidth: '20%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    current: {
        fontSize: 20,
        fontWeight: 600,
        color: '#EEF9FF',
        maxWidth: '20%',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    },
    selectList: {
        height: 32,
        width: '100%'
    }
});
class WrappedGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource !== this.props.dataSource) {
            this.selectData(0);
        }
    }

    selectData = (index) => {
        this.setState({
            selectedIndex: index
        })
    }

    render() {
        // const { classes, className, results, values, config } = this.props;
        const { classes, className, results, config } = this.props;
        let values = {
            data: [],
            date: []
        };
        if (results[this.state.selectedIndex]) {
            values = results[this.state.selectedIndex].values;
        }
        const data = values.data;
        const current = (data.length > 0) ? (data[data.length - 1]) + ' ' + config.unit : 'no data';
        // const { isHidden, stage} = this.state;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        let selectList = [];
        results.forEach(result => {
            selectList.push({
                text: result.name
            })
        })
        return (
            <div className={classNameWrap}>
                <div className={classes.textWrap}>
                    <span className={classes.title}>{config.title}</span>
                    {
                        selectList.length > 1 ?
                            <div style={{ display: 'inline', width: '50%' }}>
                                <Select className={classes.selectList} selectList={selectList} selectedIndex={this.state.selectedIndex} onClick={this.selectData} maxWidth={'65px'}></Select>
                            </div> : null
                    }

                    <span className={classes.current}>{current}</span>

                </div>
                <Graph className={classes.graph} config={config} values={values} />
            </div>
        );
    }
}
WrappedGraph.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(WrappedGraph);