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
    const { classes, className, title, keyHint = 'Key', valueHint = 'Value', required, rules, data, name, saveData } = props;

    const [kvlist, setKvlist] = useState([{ key: '', value: '' }]);
    const [plusTimes, setPlusTimes] = useState(0);

    let keyInput = null, valueInput = null;
    let newKvItem = null;

    const addKvItem = () => {
        // if (keyInput.value !== '' && valueInput.value !== '') {
        let newKvlist = [];
        kvlist.forEach((kvItem, index) => {
            if (index === (kvlist.length - 1)) {
                newKvlist.push({ key: keyInput.value, value: valueInput.value });
            } else {
                newKvlist.push(kvItem);
            }
        })
        newKvlist.push({ key: '', value: '' });
        setKvlist(newKvlist);
        setPlusTimes(plusTimes + 1);
        let newData = newKvlist.slice(0, newKvlist.length - 1);
        if (saveData) {
            saveData(name, { isValid: true, data: newData })
        }
        // }
        // else {
        //     alert('invalid');
        // }
    }

    const removeKvItem = (removeIndex) => (event) => {
        let newKvlist = [];
        kvlist.forEach((kvItem, index) => {
            if (index === removeIndex) {

            } else if (index === (kvlist.length - 1)) {
                newKvlist.push({ key: keyInput.value, value: valueInput.value })
            } else {
                newKvlist.push(kvItem);
            }
        })

        let newData = newKvlist.slice(0, newKvlist.length - 1);
        if (saveData) {
            saveData(name, { isValid: true, data: newData })
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
        let newData = kvlist.slice(0, kvlist.length - 1);
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
                        if (index !== (kvlist.length - 1)) {
                            return (
                                <div className={classes.oldKvItem} key={`${kvItem.key}=${kvItem.value},${index}`}>
                                    <div className={classes.readonly} title={kvItem.key}>{kvItem.key}</div>
                                    <div className={classes.equalSign}>=</div>
                                    <div className={classes.readonly} title={kvItem.value}>{kvItem.value}</div>
                                    <div className={classes.minus} onClick={removeKvItem(index)}>-</div>
                                </div>
                            );
                        } else {
                            return (
                                <div className={classes.newKvItem} ref={(ele) => { newKvItem = ele; }} key={`${kvItem.key}=${kvItem.value},${index}`}>
                                    <input
                                        className={classes.input}
                                        ref={(ele) => { keyInput = ele; }}
                                        defaultValue={kvItem.key}
                                        placeholder={keyHint}
                                        onKeyDown={handleKeyDown}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} />
                                    <div className={classes.equalSign}>=</div>
                                    <input
                                        className={classes.input}
                                        ref={(ele) => { valueInput = ele; }}
                                        defaultValue={kvItem.value}
                                        placeholder={valueHint}
                                        onKeyDown={handleKeyDown}
                                        onFocus={handleFocus}
                                        onBlur={handleBlur} />
                                    <div className={classes.plus} onClick={addKvItem}>+</div>
                                </div>
                            );

                        }
                    })
                }
            </div>
        </div>
    );
}
export default withStyles(styles)(MultipleKvInput);