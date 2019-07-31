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
    numberArea: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '35px',
        color: 'rgb(75, 139, 175)',
        // lineHeight: '35px',
        borderBottom: '1px solid #4B8BAF',
        backgroundColor: 'rgba(255, 255, 255, 1)'
    },
    displayNum: {
        width: '60%',
        fontSize: '16px',
        fontWeight: 400,
        paddingLeft: '11px'
    },
    arrow: {
        fontSize: '12px',
        cursor: 'pointer',
        height: '9px',
        lineHeight: '9px',
        textAlign: 'center',
        margin: '5px 0px',
        padding: '0px 3px',
        backgroundColor: 'rgb(75, 139, 175)',
        color: 'rgb(255, 255, 255)',
        // fontFamily: 'arrow-down-sm'
    },
    unit: {
        fontSize: '14px',
        fontWeight: 300,
        margin: '0px 10px'
    }
});




function NumberInput(props) {
    const { classes, className, title, unit, required, rules = {}, data, name, saveData } = props;
    const { defaultValue, step = 1, maxValue, minValue } = rules;

    const [displayNum, setDisplayNum] = useState(defaultValue);

    const handleClick = (stepValue) => (event) => {
        let newNum = displayNum + stepValue;
        if (typeof maxValue == 'number' && typeof minValue == 'number') {
            if (displayNum > maxValue) {
                newNum = maxValue;
                setDisplayNum(newNum);
            } else if (displayNum < minValue) {
                newNum = minValue;
                setDisplayNum(newNum);
            } else if (newNum > maxValue || newNum < minValue) {
                newNum = displayNum;
            } else {
                setDisplayNum(newNum);
            }
        }
        if (saveData) {
            saveData(name, { isValid: true, data: newNum })
        }
    }

    useEffect(() => {
        if (saveData) {
            if (typeof maxValue == 'number' && typeof minValue == 'number') {
                if (displayNum > maxValue || displayNum < minValue) {
                    console.log('false: '+name)
                    saveData(name, { isValid: false, data: displayNum })
                } else {
                    console.log('true: '+name)
                    saveData(name, { isValid: true, data: displayNum })
                }
            } else {
                saveData(name, { isValid: true, data: displayNum })
            }
        }
    }, [])

    let classNameWrap = classes.root;
    if (className) {
        classNameWrap += ' ' + className;
    }

    return (
        <div className={classNameWrap}>
            <div className={classes.label}>
                {required ? `*${title}` : title}
            </div>
            <div className={classes.numberArea}>
                <div className={classes.displayNum}>
                    {displayNum}
                </div>

                <div className={classes.buttonGruop}>
                    <div className={'icon-arrow-up-sm' + ' ' + classes.arrow} onClick={handleClick(step)}></div>
                    <div className={'icon-arrow-down-sm' + ' ' + classes.arrow} onClick={handleClick(-1 * step)}></div>
                </div>
                <div className={classes.unit}>
                    {unit}
                </div>
            </div>
        </div>
    );
}
export default withStyles(styles)(NumberInput);