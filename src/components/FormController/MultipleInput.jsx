import React, { Component, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

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
    oldInputItem: {
        lineHeight: '35px',
        height: '35px',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #EDEDED'
    },
    newInputItem: {
        lineHeight: '35px',
        height: '35px',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #EDEDED',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    input: {
        boxSizing: 'border-box',
        borderWidth: '0px',
        // borderBottom: '1px solid rgba(178, 178, 178, 0.3)',
        backgroundColor: 'inherit',
        width: '85%',
        height: '35px',
        paddingLeft: '11px',
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
        width: '85%',
        height: '35px',
        paddingLeft: '11px',
        fontSize: '16px',
        fontWeight: '400',
        color: 'rgb(75, 139, 175)',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
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
    }
});




function MultipleInput(props) {
    const { classes, className, title, hint = '请输入文本', required, rules, data, name, saveData } = props;

    const [inputList, setInputList] = useState([{ value: '' }]);
    const [plusTimes, setPlusTimes] = useState(0);

    let valueInput = null, newInputItem = null;

    const addInputItem = () => {
        console.log('done');
        console.log(valueInput.value)
        // if (valueInput.value !== '') {
        let newInputList = [];
        inputList.forEach((inputItem, index) => {
            if (index === (inputList.length - 1)) {
                newInputList.push({ value: valueInput.value });
            } else {
                newInputList.push(inputItem);
            }
        })
        newInputList.push({ value: '' });
        console.log(newInputList)
        setInputList(newInputList);
        setPlusTimes(plusTimes + 1);
        let newData = newInputList.slice(0, newInputList.length - 1);
        if (saveData) {
            saveData(name, { isValid: true, data: newData })
        }
        // } else {
        //     alert('invalid');
        // }
    }

    const removeInputItem = (removeIndex) => (event) => {
        let newInputList = [];
        inputList.forEach((inputItem, index) => {
            if (index === removeIndex) {

            } else if (index === (inputList.length - 1)) {
                newInputList.push({ value: valueInput.value })
            } else {
                newInputList.push(inputItem);
            }
        })
        let newData = newInputList.slice(0, newInputList.length - 1);
        if (saveData) {
            saveData(name, { isValid: true, data: newData })
        }
        setInputList(newInputList);
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            addInputItem();
        }
    }

    const handleFocus = (event) => {
        newInputItem.style.borderBottom = '1px solid #4B8BAF';
    }

    const handleBlur = (event) => {
        newInputItem.style.borderBottom = '1px solid #EDEDED';
    }

    useEffect(() => {
        let newData = inputList.slice(0, inputList.length - 1);
        if (saveData) {
            if (required) {
                saveData(name, { isValid: newData.length < 1 ? false : true, data: newData })
            } else {
                saveData(name, { isValid: true, data: newData })
            }
        }
    }, [])

    useEffect(() => {
        if (plusTimes == 0) {

        } else {
            valueInput.focus();
        }
    }, [plusTimes])

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
                    inputList.map((inputItem, index) => {
                        if (index !== (inputList.length - 1)) {
                            return (
                                <div className={classes.oldInputItem} key={`${inputItem.value},${index}`}>
                                    <div className={classes.readonly} title={inputItem.value}>{inputItem.value}</div>
                                    <div className={classes.minus} onClick={removeInputItem(index)}>-</div>
                                </div>
                            );
                        } else {
                            return (
                                <div className={classes.newInputItem} ref={ele => { newInputItem = ele; }} key={`${inputItem.value},${index}`}>
                                    <input
                                        className={classes.input}
                                        ref={(ele) => { valueInput = ele; }}
                                        defaultValue={inputItem.value}
                                        placeholder={hint}
                                        onKeyDown={handleKeyDown}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} />
                                    <div className={classes.plus} onClick={addInputItem}>+</div>
                                </div>
                            );

                        }
                    })
                }
            </div>
        </div>
    );
}
export default withStyles(styles)(MultipleInput);