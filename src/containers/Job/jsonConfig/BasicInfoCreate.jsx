import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NormalInput from '../../../components/FormController/NormalInput';
import NormalSelect from '../../../components/FormController/NormalSelect';
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

const jobTypes = [
    {
        value: 'service',
        display: '服务'
    },
    {
        value: 'batch',
        display: '任务'
    }
    // {
    //     value: 'system',
    //     display: '系统'
    // }
]

const DISPLAY = 'display', UPLOAD = 'upload';

const JOB_NAME = "Job-Name",
    JOB_TYPE = "Job-Type";

const kvMap = {
    service: '服务',
    batch: '任务'
    // system: '系统'
}

function processWrap(func, ...values) {
    return function (data, usingType) {
        return func(data, usingType, values);
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
        name: JOB_NAME,
        title: '应用名称',
        dataProcess: processWrap(normalProcess),
        component: NormalInput,
        rules: {
            required: true,
            isImmutable: true
        }
    },
    {
        name: JOB_TYPE,
        title: '应用类型',
        options: jobTypes,
        dataProcess: processWrap(normalProcess),
        component: NormalSelect,
        rules: {
            required: true
        }
    }
]


class BasicInfo extends Component {
    constructor(props) {
        console.log('basicinfo create constructor');
        super(props);
        this.state = {
            isAllValid: false,
            [JOB_NAME]: {
                isValid: false,
                data: props.data.json.Name
            },
            [JOB_TYPE]: {
                isValid: false,
                data: props.data.json.Type
            }
        };
        this.dataSet = props.data.json
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
        console.log(name);
        console.log(result);
        if (this.dataSet) {
            switch (name) {
                case JOB_NAME:
                    this.dataSet.Name = normalProcess(result.data, UPLOAD);
                    this.dataSet.ID = normalProcess(result.data, UPLOAD);
                    break;
                case JOB_TYPE:
                    this.dataSet.Type = normalProcess(result.data, UPLOAD);
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
                // props.updateData(props.dataName, Object.assign({}, this.dataSet), newIsAllValid);
                props.updateData(props.dataName, undefined, newIsAllValid);
            }

            return {
                isAllValid: newIsAllValid,
                [name]: result
            }
        })
    }


    render() {
        console.log('basicinfo render');
        const { classes, className, stepPosition, data } = this.props;

        let rootWrap = classes.root;
        if (stepPosition === 1) {
            rootWrap += ' ' + classes.hidden;
        }

        const style = {
            keyName: {
                fontSize: '16px',
                fontWeight: '400',
                marginBottom: '3px'
            },
            value: {
                fontSize: '14px',
                fontWeight: '300',
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
                            stanzaList.map((item) => {
                                let value = item.dataProcess(dataSet[item.name].data, DISPLAY);
                                if (value === '' || value === undefined) {
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
                                        rules={(data.type === 'edit' && item.rules.isImmutable) ? Object.assign({}, item.rules, { disabled: true }) : item.rules}
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
BasicInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(BasicInfo);