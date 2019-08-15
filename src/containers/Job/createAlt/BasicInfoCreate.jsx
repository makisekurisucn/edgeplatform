import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
        color: 'rgb(68, 105, 128)'
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
            required: true
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
        super(props);
        this.state = {
            isAllValid: false,
            [JOB_NAME]: {
                isValid: false,
                data: undefined
            },
            [JOB_TYPE]: {
                isValid: false,
                data: undefined
            }
        };
        this.dataSet = {
            ID: '',
            Name: '',
            Type: ''
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.stepPosition == 0 && this.props.stepPosition !== 0) {
            let newDataSet = Object.assign({}, this.state);
            delete newDataSet.isAllValid;

            if (this.props.updateData && this.props.dataName) {
                // console.log('will receive props, is valid: ' + this.state.isAllValid)
                this.props.updateData(this.props.dataName, newDataSet, this.state.isAllValid);
            }
            // this.props.updataStatus(this.state.isAllValid)
        }
    }

    saveData = (name, result) => {
        let newOriginalData = Object.assign({}, this.state, { [name]: result });
        delete newOriginalData.isAllValid;

        let newIsAllValid = true;
        for (let key in newOriginalData) {
            if (newOriginalData[key].isValid == false) {
                newIsAllValid = false;
            }
        }
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
        this.setState({
            isAllValid: newIsAllValid,
            [name]: result
        })
        if (newIsAllValid == true) {
            console.log(this.dataSet)
        }
        if (this.props.updateData && this.props.dataName) {
            // console.log('name: ' + name)
            // console.log('save data, is valid: ' + newIsAllValid)
            this.props.updateData(this.props.dataName, Object.assign({}, this.dataSet), newIsAllValid);
        }
    }


    render() {
        const { classes, className, stepPosition } = this.props;

        let rootWrap = classes.root;
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
                                let value = item.dataProcess(dataSet[item.name].data, DISPLAY);
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
BasicInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(BasicInfo);