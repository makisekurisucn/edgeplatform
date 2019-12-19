import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        width: '300px'
    },
    label: {
        fontSize: '16px',
        fontWeight: '300',
        color: 'rgb(75, 139, 175)',
        whiteSpace: 'nowrap',
        marginBottom: '10px',
        paddingLeft: '4px'
    },
    inputArea: {
        borderBottom: '1px solid #EDEDED'
    },
    input: {
        boxSizing: 'border-box',
        borderWidth: '0px',
        backgroundColor: 'rgb(255, 255, 255)',
        width: '70px',
        height: '35px',
        textAlign: 'center',
        // paddingLeft: '11px',
        fontSize: '15px',
        fontWeight: '400',
        color: 'rgb(75, 139, 175)',
        '&:focus': {
            borderWidth: '0px',
            outline: 'none'
        }
    },
    smWidth: {
        width: '45px'
    },
    selectArea: {
        width: '29px',
        height: '20px',
        lineHeight: '20px',
        color: "rgb(255, 255, 255)",
        cursor: 'pointer',
        position: 'relative',
        outline: 'none',
        backgroundColor: 'rgb(129, 162, 181)'
    },
    displayArea: {
        height: '20px',
        display: 'flex',
        paddingLeft: '5px',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        fontWeight: 400
    },
    displayText: {
        whiteSpace: 'nowrap'
    },
    arrowWrap: {
        height: '20px',
        marginLeft: '-2px',
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    textArrow: {
        height: '20px',
        fontSize: '14px',
        position: 'relative'
    },
    optionList: {
        position: "absolute",
        zIndex: 10,
        padding: 0,
        margin: 0,
        height: 0,
        width: "100%",
        left: 0,
        top: 20,
        boxSizing: 'border-box',
        transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        overflow: 'hidden',
        fontSize: '14px',
        fontWeight: 400,
        backgroundColor: 'inherit',
        '& li': {
            height: '20px'
        },
        '& li:hover': {
            backgroundColor: 'rgb(129, 162, 181)'
        }
    },
    option: {
        paddingLeft: '7px',
        lineHeight: '20px',
        backgroundColor: 'rgb(159, 182, 195)'
    },
    container: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        fontSize: '15px',
        color: 'rgb(75, 139, 175)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    splitLine: {
        margin: '0px 3px'
    }
});

const timeOptions = [
    {
        value: 'h',
        display: '时'
    }, {
        value: 'm',
        display: '分'
    }, {
        value: 's',
        display: '秒'
    }
];

function matchUnitIndex(unit) {
    let matchIndex = 0;
    timeOptions.forEach((item, index) => {
        if (item.value === unit) {
            matchIndex = index;
        }
    })
    return matchIndex;
}

function RestartPolicy(props) {
    const { classes, className, title, defaultValue = '', rules = {}, data, name, saveData } = props;
    const { Attempts: defaultAttempts, Interval: defaultInterval, IntervalUnit: defaultIntervalUnit, Delay: defaultDelay, DelayUnit: defaultDelayUnit } = defaultValue;
    const { required } = rules;
    let inputArea = null, inputAttempts = null, inputInterval = null, inputDelay = null;
    let selectArr = {
        interval: {
            arrow: null,
            optionList: null,
            isOptionListDisplay: false
        },
        delay: {
            arrow: null,
            optionList: null,
            isOptionListDisplay: false
        }
    }

    const [intervalOptIndex, setIntervalOptIndex] = useState(matchUnitIndex(defaultIntervalUnit));
    const [delayOptIndex, setDelayOptIndex] = useState(matchUnitIndex(defaultDelayUnit));

    const handleSelectFocus = (name) => () => {

    }

    const handleSelectBlur = (name) => () => {
        const target = selectArr[name];
        target.arrow.style.transform = 'rotate(0deg)';
        target.optionList.style.height = '0';
        target.isOptionListDisplay = false;
    }

    const showOptions = (name) => () => {
        const target = selectArr[name];
        if (target.isOptionListDisplay === false) {
            target.arrow.style.transform = 'rotate(180deg)';
            target.optionList.style.height = 'auto';
            target.isOptionListDisplay = true;
        } else {
            target.arrow.style.transform = 'rotate(0deg)';
            target.optionList.style.height = '0';
            target.isOptionListDisplay = false;
        }
    }

    const handleInputFocus = (event) => {
        inputArea.style.borderBottom = '1px solid #4B8BAF';
    }

    const handleInputBlur = (event) => {
        inputArea.style.borderBottom = '1px solid #EDEDED';
    }

    const handleChange = () => {
        //if数据验证有效
        const data = {
            Attempts: inputAttempts.value && Number(inputAttempts.value),
            Interval: inputInterval.value && Number(inputInterval.value),
            IntervalUnit: timeOptions[intervalOptIndex].value,
            Delay: inputDelay.value && Number(inputDelay.value),
            DelayUnit: timeOptions[delayOptIndex].value
        }
        if (saveData) {
            if (required) {
                if (inputAttempts.value === '' || inputInterval.value === '' || inputDelay.value === '') {
                    saveData(name, { isValid: false, data })
                } else {
                    saveData(name, { isValid: true, data })
                }
            } else {
                saveData(name, { isValid: true, data })
            }
        }
    }

    useEffect(() => {
        handleChange()
    }, [intervalOptIndex, delayOptIndex])

    let classNameWrap = classes.root;
    if (className) {
        classNameWrap += ' ' + className;
    }

    return (
        <div className={classNameWrap}>
            <div className={classes.label}>
                {required ? `*${title}` : title}
            </div>
            <div className={classes.inputArea} ref={ele => { inputArea = ele; }}>
                <div className={classes.container}>
                    <div className={classes.inputItem}>
                        <input
                            className={classes.input}
                            placeholder={'重启次数'}
                            defaultValue={defaultAttempts}
                            type={'number'}
                            ref={(ele) => { inputAttempts = ele; }}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            onChange={handleChange}
                        />
                        <div>次</div>
                    </div>
                    <div className={classes.splitLine}>/</div>
                    <div className={classes.inputItem}>
                        <input
                            className={classes.input}
                            placeholder={'重启时限'}
                            defaultValue={defaultInterval}
                            type={'number'}
                            ref={(ele) => { inputInterval = ele; }}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            onChange={handleChange}
                        />
                        <div className={classes.selectButton}>
                            <div className={classes.selectArea} onFocus={handleSelectFocus('interval')} onBlur={handleSelectBlur('interval')} tabIndex={0} onClick={showOptions('interval')}>
                                <div className={classes.displayArea} >
                                    <div className={classes.displayText}>{timeOptions[intervalOptIndex].display}</div>
                                    <div className={classes.arrowWrap} ref={(ele) => { selectArr.interval.arrow = ele; }}>
                                        <ExpandMore className={classes.textArrow} />
                                    </div>
                                </div>
                                <ul className={classes.optionList} ref={ele => { selectArr.interval.optionList = ele; }}>
                                    {
                                        timeOptions.map((option, index) => {
                                            if (index === intervalOptIndex) {
                                                return null
                                            } else {
                                                return <li className={classes.option} key={option.value} onClick={() => { setIntervalOptIndex(index) }} >{option.display}</li>
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={classes.splitLine}>/</div>
                    <div className={classes.inputItem}>
                        <input
                            className={classes.input + ' ' + classes.smWidth}
                            placeholder={'间隔'}
                            defaultValue={defaultDelay}
                            type={'number'}
                            ref={(ele) => { inputDelay = ele; }}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            onChange={handleChange}
                        />
                        <div className={classes.selectButton}>
                            <div className={classes.selectArea} onFocus={handleSelectFocus('delay')} onBlur={handleSelectBlur('delay')} tabIndex={0} onClick={showOptions('delay')}>
                                <div className={classes.displayArea} >
                                    <div className={classes.displayText}>{timeOptions[delayOptIndex].display}</div>
                                    <div className={classes.arrowWrap} ref={(ele) => { selectArr.delay.arrow = ele; }}>
                                        <ExpandMore className={classes.textArrow} />
                                    </div>
                                </div>
                                <ul className={classes.optionList} ref={ele => { selectArr.delay.optionList = ele; }}>
                                    {
                                        timeOptions.map((option, index) => {
                                            if (index === delayOptIndex) {
                                                return null
                                            } else {
                                                return <li className={classes.option} key={option.value} onClick={() => { setDelayOptIndex(index) }} >{option.display}</li>
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default withStyles(styles)(RestartPolicy);