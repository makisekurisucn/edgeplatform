import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NormalInput from '../../../components/FormController/NormalInput';
import NormalSelect from '../../../components/FormController/NormalSelect';
import KvInput from '../../../components/FormController/MultipleKvInput';
import MultipleInput from '../../../components/FormController/MultipleInput';
import NumberInput from '../../../components/FormController/NumberInput';
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
        color: 'rgb(116, 116, 116)'
        // paddingLeft: '24px'
    },
    hidden: {
        overflow: 'hidden',
        boxSizing: 'border-box',
        height: '100%'
    }
});


const JOB_DATACENTERS = "Job-Datacenters",
    TASKGROUPS_COUNT = "TaskGroups-Count";

const DISPLAY = 'display', UPLOAD = 'upload';

const kvMap = {};

function processWrap(func, ...values) {
    return function (data, usingType) {
        return func(data, usingType, values);
    }
}

function multipleKVProcess(kvData = [], usingType) {
    if (usingType === DISPLAY) {
        let resArr = [];
        kvData.forEach((item) => {
            resArr.push(`${item.key}=${item.value}`);
        })
        return resArr.join('\n');
    } else if (usingType === UPLOAD) {
        let resObj = {};
        kvData.forEach((item) => {
            resObj[item.key] = item.value;
        })
        return resObj;
    }
}

function multipleValueProcess(data = [], usingType) {
    let resArr = [];
    data.forEach((item) => {
        resArr.push(`${item.value}`);
    })
    if (usingType === DISPLAY) {
        return resArr.join('\n');
    } else if (usingType === UPLOAD) {
        return resArr;
    }
}

function reverseMultipleValueProcess(data = []) {
    let resArr = [];
    data && data.forEach((item) => {
        resArr.push({ value: item });
    })
    return resArr;
}

function numberProcess(data, usingType, unit = '') {
    if (usingType === DISPLAY) {
        return `${data}${unit}`;
    } else if (usingType === UPLOAD) {
        return data;
    }
}

function normalProcess(data, usingType) {
    if (usingType === DISPLAY) {
        return kvMap[data] || data;
    } else if (usingType === UPLOAD) {
        return data;
    }
}

const stanzaList = [
    {
        name: TASKGROUPS_COUNT,
        title: '实例数',
        dataProcess: processWrap(numberProcess),
        component: NumberInput,
        rules: {
            required: true,
            step: 1,
            maxValue: 100,
            minValue: 1
        }
    },
    {
        name: JOB_DATACENTERS,
        title: '数据中心',
        // options: drives,
        dataProcess: processWrap(multipleValueProcess),
        component: MultipleInput,
        rules: {
            required: true
        }
    }
]

class ScheduleStrategy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAllValid: false,
            [JOB_DATACENTERS]: {
                isValid: false,
                data: reverseMultipleValueProcess(props.data.Datacenters)
            },
            [TASKGROUPS_COUNT]: {
                isValid: false,
                data: props.data.TaskGroups[0].Count
            }
        };
        this.dataSet = props.data
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.stepPosition === 0 && this.props.stepPosition !== 0) {
            // let newDataSet = Object.assign({}, this.state);
            // delete newDataSet.isAllValid;
            if (this.props.updateData && this.props.dataName) {
                // this.props.updateData(this.props.dataName, newDataSet, this.state.isAllValid);
                this.props.updateData(this.props.dataName, undefined, this.state.isAllValid);
            }
        }
    }

    saveData = (name, result) => {
        if (this.dataSet) {
            switch (name) {
                case JOB_DATACENTERS:
                    this.dataSet.Datacenters = multipleValueProcess(result.data, UPLOAD);
                    break;
                case TASKGROUPS_COUNT:
                    this.dataSet.TaskGroups[0].Count = numberProcess(result.data, UPLOAD);
                    break;
                default: ;
            }
        }

        this.setState((state, props) => {
            let newOriginalData = Object.assign({}, state, { [name]: result });
            delete newOriginalData.isAllValid;

            let newIsAllValid = true;
            for (let key in newOriginalData) {
                if (newOriginalData[key].isValid === false) {
                    newIsAllValid = false;
                }
            }
            if (props.updateData && props.dataName) {
                props.updateData(props.dataName, undefined, newIsAllValid);
            }

            return {
                isAllValid: newIsAllValid,
                [name]: result
            }
        })
    }

    render() {
        console.log('schedule render');
        const { classes, className, stepPosition } = this.props;

        let rootWrap = classes.root;
        if (stepPosition === 1) {
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
                    <FadeWrap isHidden={stepPosition !== -1} from={'right'} to={'left'}>
                        {
                            stanzaList.map((item, index) => {
                                let value = item.dataProcess(dataSet[item.name].data, DISPLAY);
                                if (value === '' || value === undefined) {
                                    return null
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
                    <FadeWrap isHidden={stepPosition !== 0} from={'right'} to={'left'}>
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
                    <FadeWrap isHidden={stepPosition !== 1} from={'right'} to={'left'}>
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
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(ScheduleStrategy);