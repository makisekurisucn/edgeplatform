import React, { Component, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        width: '51%'
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
        backgroundColor: 'rgba(234, 234, 234, 0.3)'
    },
    oldItem: {
        lineHeight: '35px',
        height: '35px',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #EDEDED'
    },
    newItem: {
        lineHeight: '35px',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderBottom: '1px solid #EDEDED'
    },
    input: {
        boxSizing: 'border-box',
        borderWidth: '0px',
        backgroundColor: 'inherit',
        textAlign: 'center',
        width: '22%',
        height: '35px',
        fontSize: '16px',
        fontWeight: '400',
        color: 'rgb(75, 139, 175)',
        '&:focus': {
            borderWidth: '0px',
            outline: 'none'
        }
    },
    readonly: {
        backgroundColor: 'inherit',
        textAlign: 'center',
        width: '38%',
        height: '35px',
        fontSize: '16px',
        fontWeight: '400',
        color: 'rgb(75, 139, 175)',
    },
    minus: {
        width: '14px',
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 400,
        color: 'rgb(208, 2, 27)',
        cursor: 'pointer',
        margin: '0px 10px'
    },
    plus: {
        width: '14px',
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 400,
        color: 'rgb(96, 176, 4)',
        cursor: 'pointer',
        margin: '0px 10px'
    },
    arrow: {
        fontSize: '16px',
        height: '35px'
    },
    selectArea: {
        // padding: '0px 4px',
        // fontSize: 12,
        width: '79px',
        height: '20px',
        lineHeight: '20px',
        color: "rgb(255, 255, 255)",
        cursor: 'pointer',
        position: 'relative',
        outline: 'none',
        backgroundColor: 'rgba(97,139,162,0.8)'

    },
    displayArea: {
        height: '20px',
        display: 'flex',
        paddingLeft: '7px',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        fontWeight: 400
    },
    displayText: {
        whiteSpace: 'nowrap'
    },
    middleComponent: {
        display: 'flex',
        alignItems: 'center'
    },
    arrowWrap: {
        height: '20px',
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    textArrow: {
        height: '20px',
        fontSize: '16px',
        position: 'relative',
        // verticalAlign: 'middle',
        // transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    optionList: {
        // backgroundColor: 'rgba(97,139,162,0.8)',
        position: "absolute",
        zIndex: 10,
        padding: 0,
        margin: 0,
        height: 0,
        width: "100%",
        left: 0,
        top: 20,
        boxSizing: 'border-box',
        // padding: '0px 4px',
        transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        overflow: 'hidden',
        fontSize: '14px',
        fontWeight: 400,
        backgroundColor: 'inherit',
        '& li': {
            height: '20px'
        },
        '& li:hover': {
            backgroundColor: 'rgba(229, 229, 229, 0.3)'
        }
    },
    option: {
        borderBottom: '1px solid #EDEDED',
        paddingLeft: '7px',
        lineHeight: '20px'
    }

});


const options = [
    {
        value: 'staticMapping',
        display: '静态映射'
    },
    {
        value: 'randomMapping',
        display: '随机映射'
    }
]

function PortMapInput(props) {
    const { classes, className, title, LHint = '', RHint = '', required, rules } = props;

    const [numList, setNumList] = useState([{ LValue: '', RValue: '', mapping: options[0] }]);
    const [plusTimes, setPlusTimes] = useState(0);
    const [optIndex, setOptIndex] = useState(0);

    let isOptionListDisplay = false;
    let LInput = null, RInput = null, newItem = null, arrow = null, optionList = null;

    const addItem = () => {
        // if (LInput.value !== '' && RInput.value !== '') {
        let newNumList = [];
        numList.forEach((item, index) => {
            if (index === (numList.length - 1)) {
                newNumList.push({ LValue: LInput.value, RValue: RInput.value, mapping: options[optIndex] });
            } else {
                newNumList.push(item);
            }
        })
        newNumList.push({ LValue: '', RValue: '' });
        setNumList(newNumList);
        setPlusTimes(plusTimes + 1);
        // }
        // else {
        //     alert('invalid');
        // }
    }

    const removeItem = (removeIndex) => (event) => {
        let newNumList = [];
        numList.forEach((item, index) => {
            if (index === removeIndex) {

            } else if (index === (numList.length - 1)) {
                newNumList.push({ LValue: LInput.value, RValue: RInput.value, mapping: options[optIndex] })
            } else {
                newNumList.push(item);
            }
        })
        setNumList(newNumList);
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            addItem();
        }
    }

    const showOptions = () => {
        if (isOptionListDisplay == false) {
            arrow.style.transform = 'rotate(180deg)';
            optionList.style.height = 'auto';
            isOptionListDisplay = true;
        } else {
            arrow.style.transform = 'rotate(0deg)';
            optionList.style.height = '0';
            isOptionListDisplay = false;
        }
    }

    const handleSelectFocus = () => {

    }

    const handleSelectBlur = () => {
        arrow.style.transform = 'rotate(0deg)';
        optionList.style.height = '0';
        isOptionListDisplay = false;
    }

    const handleInputFocus = (event) => {
        newItem.style.borderBottom = '1px solid #4B8BAF';
    }

    const handleInputBlur = (event) => {
        newItem.style.borderBottom = '1px solid #EDEDED';
    }

    useEffect(() => {
        if (plusTimes == 0) {

        } else {
            LInput.focus();
        }
    }, [plusTimes])

    useEffect(() => {
        if (options[optIndex].value === 'randomMapping') {
            RInput.value = '';
            RInput.disabled = true;
        } else {
            RInput.disabled = false;
        }
    })

    let classNameWrap = classes.root;
    if (className) {
        classNameWrap += ' ' + className;
    }

    return (
        <div className={classNameWrap}>
            <div className={classes.label}>
                {required ? `*${title}` : title}
            </div>
            <div className={classes.inputArea}>
                {
                    numList.map((item, index) => {
                        if (index !== (numList.length - 1)) {
                            return (
                                <div className={classes.oldItem} key={`${item.LValue}=${item.RValue},${index}`}>
                                    <div className={classes.readonly}>{item.LValue}</div>
                                    <div className={classes.middleComponent}>
                                        <ArrowForward className={classes.arrow} />
                                        <div className={classes.selectArea}>
                                            <div className={classes.displayArea} >
                                                <div className={classes.displayText}>{item.mapping.display}</div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.readonly}>{item.RValue}</div>
                                    <div className={classes.minus} onClick={removeItem(index)}>-</div>
                                </div>
                            );
                        } else {
                            return (
                                <div className={classes.newItem} ref={(ele) => { newItem = ele; }} key={`${item.LValue}=${item.RValue},${index}`}>
                                    <input
                                        className={classes.input}
                                        type={'number'}
                                        ref={(ele) => { LInput = ele; }}
                                        defaultValue={item.LValue}
                                        placeholder={LHint}
                                        onKeyDown={handleKeyDown}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur} />
                                    <div className={classes.middleComponent}>
                                        <ArrowForward className={classes.arrow} />
                                        <div className={classes.selectArea} onFocus={handleSelectFocus} onBlur={handleSelectBlur} tabIndex={0} onClick={showOptions}>
                                            <div className={classes.displayArea} >
                                                <div className={classes.displayText}>{options[optIndex].display}</div>
                                                <div className={classes.arrowWrap} ref={(ele) => { arrow = ele; }}>
                                                    <ExpandMore className={classes.textArrow} />
                                                </div>
                                            </div>
                                            <ul className={classes.optionList} ref={ele => { optionList = ele; }}>
                                                {
                                                    options.map((option, index) => {
                                                        if (index === optIndex) {
                                                            // return <li className={classes.selectedOption} key={option.value} >{option.display}</li>
                                                        } else {
                                                            return <li className={classes.option} key={option.value} onClick={() => { setOptIndex(index) }} >{option.display}</li>
                                                        }
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </div>

                                    <input
                                        className={classes.input}
                                        type={'number'}
                                        ref={(ele) => { RInput = ele; }}
                                        defaultValue={item.RValue}
                                        placeholder={RHint}
                                        onKeyDown={handleKeyDown}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur} />
                                    <div className={classes.plus} onClick={addItem}>+</div>
                                </div>
                            );

                        }
                    })
                }
            </div>
        </div>
    );
}
export default withStyles(styles)(PortMapInput);