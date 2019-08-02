import React, { Component, useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        // width: '51%'
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
        backgroundColor: 'rgba(234, 234, 234, 0.3)'
    },
    oldKvItem: {
        lineHeight: '35px',
        height: '35px',
        paddingLeft: '11px',
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: '1px solid #EDEDED'
    },
    newKvItem: {
        lineHeight: '35px',
        height: '35px',
        paddingLeft: '11px',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderBottom: '1px solid #EDEDED'
    },
    input: {
        boxSizing: 'border-box',
        borderWidth: '0px',
        // borderBottom: '1px solid rgba(178, 178, 178, 0.3)',
        backgroundColor: 'inherit',
        textAlign: 'center',
        width: '38%',
        height: '35px',
        // paddingLeft: '11px',
        fontSize: '16px',
        fontWeight: '400',
        color: 'rgb(75, 139, 175)',
        '&:focus': {
            borderWidth: '0px',
            // borderBottom: '1px solid rgb(75, 139, 175)',
            outline: 'none'
        }
    },
    readonly: {
        backgroundColor: 'inherit',
        textAlign: 'center',
        width: '38%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        height: '35px',
        // paddingLeft: '11px',
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
    equalSign: {
        margin: '0px 10px'
        // display: 'inline-block'
    }

});




function MultipleKvInput(props) {
    const { classes, className, title, hint = {}, defaultValue, rules = {}, data, name, saveData } = props;
    const { required } = rules;
    const { keyHint = 'Key', valueHint = 'Value' } = hint;

    const [kvlist, setKvlist] = useState(defaultValue || []);
    const [plusTimes, setPlusTimes] = useState(0);

    let keyInput = null, valueInput = null;
    let newKvItem = null;

    const addKvItem = () => {
        // if (keyInput.value !== '' && valueInput.value !== '') {
        let newKvlist = [];
        kvlist.forEach((kvItem, index) => {
            newKvlist.push(kvItem);
        })
        newKvlist.push({ key: keyInput.value, value: valueInput.value });

        setKvlist(newKvlist);
        setPlusTimes(plusTimes + 1);
        if (saveData) {
            saveData(name, { isValid: true, data: newKvlist })
        }
        keyInput.value = '';
        valueInput.value = '';
        // }
        // else {
        //     alert('invalid');
        // }
    }

    const removeKvItem = (removeIndex) => (event) => {
        let newKvlist = [];
        kvlist.forEach((kvItem, index) => {
            if (index === removeIndex) {
            } else {
                newKvlist.push(kvItem);
            }
        })

        if (saveData) {
            saveData(name, { isValid: true, data: newKvlist })
        }

        setKvlist(newKvlist);
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            addKvItem();
        }
    }

    const handleFocus = (event) => {
        newKvItem.style.borderBottom = '1px solid #4B8BAF';
    }

    const handleBlur = (event) => {
        newKvItem.style.borderBottom = '1px solid #EDEDED';
    }

    useEffect(() => {
        if (saveData) {
            if (required) {
                saveData(name, { isValid: kvlist.length < 1 ? false : true, data: kvlist })
            } else {
                saveData(name, { isValid: true, data: kvlist })
            }
        }
    }, [])

    useEffect(() => {
        if (plusTimes == 0) {

        } else {
            keyInput.focus();
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
                    kvlist.map((kvItem, index) => {
                        return (
                            <div className={classes.oldKvItem} key={`${kvItem.key}=${kvItem.value},${index}`}>
                                <div className={classes.readonly} title={kvItem.key}>{kvItem.key}</div>
                                <div className={classes.equalSign}>=</div>
                                <div className={classes.readonly} title={kvItem.value}>{kvItem.value}</div>
                                <div className={classes.minus} onClick={removeKvItem(index)}>-</div>
                            </div>
                        );
                    })
                }
                <div className={classes.newKvItem} ref={(ele) => { newKvItem = ele; }} >
                    <input
                        className={classes.input}
                        ref={(ele) => { keyInput = ele; }}
                        placeholder={keyHint}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        onBlur={handleBlur} />
                    <div className={classes.equalSign}>=</div>
                    <input
                        className={classes.input}
                        ref={(ele) => { valueInput = ele; }}
                        placeholder={valueHint}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        onBlur={handleBlur} />
                    <div className={classes.plus} onClick={addKvItem}>+</div>
                </div>
            </div>
        </div>
    );
}
export default withStyles(styles)(MultipleKvInput);