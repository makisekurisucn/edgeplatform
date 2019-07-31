import React, { Component, useEffect } from 'react';
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
        backgroundColor: 'rgb(255, 255, 255)'
    },
    input: {
        boxSizing: 'border-box',
        borderWidth: '0px',
        borderBottom: '1px solid #EDEDED',
        backgroundColor: 'inherit',
        width: '100%',
        height: '35px',
        paddingLeft: '11px',
        fontSize: '16px',
        fontWeight: '400',
        color: 'rgb(75, 139, 175)',
        '&:focus': {
            borderWidth: '0px',
            outline: 'none'
        }
    }

});




function NormalInput(props) {
    const { classes, className, title, hint, defaultValue = '', required, rules, data, name, saveData } = props;
    let inputArea = null, input = null;

    const handleFocus = (event) => {
        inputArea.style.borderBottom = '1px solid #4B8BAF';
    }

    const handleBlur = (event) => {
        inputArea.style.borderBottom = '1px solid #EDEDED';
    }

    const handleChange = () => {
        //if数据验证有效
        if (saveData) {
            if (required) {
                if (input.value == '') {
                    saveData(name, { isValid: false, data: input.value })
                } else {
                    saveData(name, { isValid: true, data: input.value })
                }
            } else {
                saveData(name, { isValid: true, data: input.value })
            }
        }

        // saveData(name, { isValid: true, data: input.value })
    }

    useEffect(() => {
        handleChange()
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
            <div className={classes.inputArea} ref={ele => { inputArea = ele; }}>
                <input className={classes.input} ref={ele => { input = ele; }} placeholder={hint} defaultValue={defaultValue} onFocus={handleFocus} onBlur={handleBlur} onChange={handleChange} />
            </div>
        </div>
    );
}
export default withStyles(styles)(NormalInput);