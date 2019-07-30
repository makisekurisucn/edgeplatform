import React, { Component, useState } from 'react';
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
    arrowUp: {
        fontSize: '12px',
        cursor: 'pointer',
        height: '9px',
        lineHeight: '9px',
        textAlign: 'center',
        margin: '5px 0px',
        padding: '0px 3px',
        backgroundColor: 'rgb(75, 139, 175)',
        color: 'rgb(255, 255, 255)',
        fontFamily: 'arrow-up-sm'
    },
    arrowDown: {
        fontSize: '12px',
        cursor: 'pointer',
        height: '9px',
        lineHeight: '9px',
        textAlign: 'center',
        margin: '5px 0px',
        padding: '0px 3px',
        backgroundColor: 'rgb(75, 139, 175)',
        color: 'rgb(255, 255, 255)',
        fontFamily: 'arrow-down-sm'
    },
    unit: {
        fontSize: '14px',
        fontWeight: 300,
        margin: '0px 10px'
    }
});




function NumberInput(props) {
    const { classes, className, title, unit, required, rules = {} } = props;
    const { defaultValue, step = 1, maxValue, minValue } = rules;
    console.log('-------------------')
    console.log('re render')

    const [displayNum, setDisplayNum] = useState(defaultValue);

    const handleClick = (stepValue) => (event) => {
        const newNum = displayNum + stepValue;
        if (typeof maxValue == 'number' && typeof minValue == 'number') {
            if (displayNum > maxValue) {
                setDisplayNum(maxValue);
            } else if (displayNum < minValue) {
                setDisplayNum(minValue);
            } else if (newNum > maxValue || newNum < minValue) {

            } else {
                setDisplayNum(newNum);
            }
        }
        // if (typeof maxValue == 'number' && newNum > maxValue) {
        //     if (displayNum > maxValue) {
        //         setDisplayNum(maxValue);
        //     }
        // } else if (typeof minValue == 'number' && newNum < minValue) {
        //     if (displayNum < minValue) {
        //         setDisplayNum(minValue);
        //     }
        // } else {
        //     setDisplayNum(displayNum + stepValue)
        // }
        // setDisplayNum(displayNum + stepValue)
    }

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
                    <div className={'icon-arrow-up-sm' + ' ' + classes.arrowUp} onClick={handleClick(step)}></div>
                    <div className={'icon-arrow-down-sm' + ' ' + classes.arrowDown} onClick={handleClick(-1 * step)}></div>
                </div>
                <div className={classes.unit}>
                    {unit}
                </div>
            </div>
        </div>
    );
}
export default withStyles(styles)(NumberInput);