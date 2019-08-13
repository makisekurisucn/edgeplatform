import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import NormalInput from '../../../components/FormController/NormalInput';
import NormalSelect from '../../../components/FormController/NormalSelect';
import KvInput from '../../../components/FormController/MultipleKvInput';
import MultipleInput from '../../../components/FormController/MultipleInput';
import NumberInput from '../../../components/FormController/NumberInput';
import PortMapInput from '../../../components/FormController/PortMapInput';
import KvItem from '../../../components/KvItem';
import CoveredKvItem from '../../../components/KvItem/CoveredKvItem';
import FadeWrap from '../../../components/FadeWrap';


const styles = theme => ({
    root: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        padding: '27px 14%'
    },
    prevRoot: {
        position: 'relative',
        top: 0,
        left: 0,
        opacity: 1,
        padding: '27px 35px'
    },
    marginBottom: {
        marginBottom: '28px'
    },
    kvItem: {
        marginBottom: 25,
        color: 'rgb(68, 105, 128)'
        // paddingLeft: '24px'
    },
    hidden: {
        overflow: 'hidden',
        boxSizing: 'border-box',
        height: '100%'
    }
});

const kvMap = {};

function processWrap(func, ...values) {
    return function (data) {
        return func(data, values);
    }
}

function multipleKVProcess(kvData = []) {
    let resArr = [];
    kvData.forEach((item) => {
        resArr.push(`${item.key}=${item.value}`);
    })
    return resArr.join('\n');
}

function multipleValueProcess(data = []) {
    let resArr = [];
    data.forEach((item) => {
        resArr.push(`${item.value}`);
    })
    return resArr.join('\n');
}

function portMappingProcess(data = []) {
    let resArr = [];
    data.forEach((item) => {
        resArr.push(`${item.LValue} ->${item.mapping.display} ${item.RValue}`);
    })
    return resArr.join('\n');
}

function numberProcess(data, unit) {
    return `${data}${unit}`;
}

function normalProcess(data) {
    return kvMap[data] || data;
}

const stanzaList = [];

class ScheduleStrategy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllValid: true

        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.stepPosition == 0 && this.props.stepPosition !== 0) {
            let newDataSet = Object.assign({}, this.state);
            delete newDataSet.isAllValid;

            if (this.props.updateData && this.props.dataName) {
                this.props.updateData(this.props.dataName, newDataSet, this.state.isAllValid);
            }
            // this.props.updataStatus(this.state.isAllValid)
        }
    }

    saveData = (name, result) => {
        let newDataSet = Object.assign({}, this.state, { [name]: result });
        delete newDataSet.isAllValid;

        let newIsAllValid = true;
        for (let key in newDataSet) {
            if (newDataSet[key].isValid == false) {
                newIsAllValid = false;
            }
        }
        this.setState({
            isAllValid: newIsAllValid,
            [name]: result
        })
        if (this.props.updateData && this.props.dataName) {
            this.props.updateData(this.props.dataName, newDataSet, newIsAllValid);
        }
    }


    render() {
        const { classes, className, stepPosition } = this.props;

        let rootWrap = classes.root;
        // if (stepPosition > 0) {
        if (stepPosition == 1) {
            rootWrap += ' ' + classes.hidden;
        }

        const style = {
            keyName: {
                fontSize: '14px',
                fontWeight: '300',
                marginBottom: '3px'
            },
            value: {
                paddingLeft: '9px',
                fontSize: '16px',
                fontWeight: '400',
                whiteSpace: 'pre-line',
                wordBreak: 'break-all'
            }
        }

        let dataSet = Object.assign({}, this.state);
        delete dataSet.isAllValid;

        return (
            <div className={rootWrap}>
                <div style={{ height: 0 }}>
                    <FadeWrap isHidden={stepPosition != -1} from={'right'} to={'left'}>
                        {
                            stanzaList.map((item, index) => {
                                let value = item.dataProcess(dataSet[item.name].data);
                                if (value == '' || value == undefined) {
                                } else {
                                    return (
                                        <KvItem key={item.name} keyName={item.title} className={classes.kvItem} value={value} style={style} />
                                    )
                                }
                            })
                        }

                    </FadeWrap>
                </div>
                <div style={{ height: 0 }}>
                    <FadeWrap isHidden={stepPosition != 0} from={'right'} to={'left'}>
                        {
                            stanzaList.map((item, index) => {
                                return (
                                    <item.component
                                        key={item.name}
                                        className={classes.marginBottom}
                                        name={item.name}
                                        title={item.title}
                                        hint={item.hint}
                                        rules={item.rules}
                                        options={item.options}
                                        defaultValue={dataSet[item.name].data}
                                        saveData={this.saveData}
                                    />
                                )
                            })
                        }
                    </FadeWrap>
                </div>
                <div style={{ height: 0 }}>
                    <FadeWrap isHidden={stepPosition != 1} from={'right'} to={'left'}>
                        {
                            stanzaList.map((item, index) => {
                                return (
                                    <CoveredKvItem key={index} className={classes.kvItem} />
                                )
                            })
                        }
                    </FadeWrap>
                </div>
            </div>
        )
    }
}
ScheduleStrategy.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ScheduleStrategy);