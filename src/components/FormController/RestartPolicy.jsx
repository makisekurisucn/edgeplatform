import React, { useEffect } from 'react';
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
        // backgroundColor: 'rgb(255, 255, 255)'
    },
    row: {
        marginBottom: '8px'
    },
    inputTitle: {
        fontSize: '15px',
        marginRight: '10px'
    },
    input: {
        boxSizing: 'border-box',
        borderWidth: '0px',
        borderBottom: '1px solid #EDEDED',
        // backgroundColor: 'inherit',
        backgroundColor: 'rgb(255, 255, 255)',
        width: '65px',
        height: '35px',
        textAlign: 'center',
        // paddingLeft: '11px',
        fontSize: '16px',
        fontWeight: '400',
        color: 'rgb(75, 139, 175)',
        '&:focus': {
            borderWidth: '0px',
            outline: 'none'
        }
    },
    smWidth: {
        width: '40px'
    },

    container: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
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




function NormalInput(props) {
    const { classes, className, title, hint, defaultValue = '', rules = {}, data, name, saveData } = props;
    const { required, disabled } = rules;
    let inputArea = null, inputAttempts = null, inputInterval = null, inputDelay = null;

    const handleFocus = (event) => {
        // inputArea.style.borderBottom = '1px solid #4B8BAF';
        event.target.style.borderBottom = '1px solid #4B8BAF';
    }

    const handleBlur = (event) => {
        // inputArea.style.borderBottom = '1px solid #EDEDED';
        event.target.style.borderBottom = '1px solid #EDEDED';
    }

    const handleChange = () => {
        //if数据验证有效
        // if (saveData) {
        //     if (required) {
        //         if (input.value === '') {
        //             saveData(name, { isValid: false, data: input.value })
        //         } else {
        //             saveData(name, { isValid: true, data: input.value })
        //         }
        //     } else {
        //         saveData(name, { isValid: true, data: input.value })
        //     }
        // }

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
                <div className={classes.container}>
                    <div className={classes.inputItem}>
                        <input className={classes.input} placeholder={'重启次数'} />
                        <div className={classes.selectButton}>s</div>
                    </div>
                    <div className={classes.splitLine}>/</div>
                    <div className={classes.inputItem}>
                        <input className={classes.input} placeholder={'重启时限'} />
                        <div className={classes.selectButton}>s</div>
                    </div>
                    <div className={classes.splitLine}>/</div>
                    <div className={classes.inputItem + ' ' + classes.smWidth}>
                        <input className={classes.input} placeholder={'间隔'} />
                        <div className={classes.selectButton}>s</div>
                    </div>
                </div>
                {/* <div className={classes.row}>
                    <label className={classes.inputTitle} htmlFor={'attempts'}>重启次数: </label>
                    <input className={classes.input} onFocus={handleFocus}
                        onBlur={handleBlur} id={'attempts'} />
                </div>
                <div className={classes.row}>
                    <label className={classes.inputTitle} htmlFor={'interval'}>重启时限: </label>
                    <input className={classes.input} onFocus={handleFocus}
                        onBlur={handleBlur} id={'interval'} />
                </div>
                <div className={classes.row}>
                    <label className={classes.inputTitle} htmlFor={'delay'}>间隔时长: </label>
                    <input className={classes.input} onFocus={handleFocus}
                        onBlur={handleBlur} id={'delay'} />
                </div> */}
                {/* <input
                    className={classes.input}
                    ref={ele => { input = ele; }}
                    placeholder={hint}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={handleChange}
                /> */}
            </div>
        </div>
    );
}
export default withStyles(styles)(NormalInput);