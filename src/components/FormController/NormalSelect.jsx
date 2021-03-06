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
    selectArea: {
        fontSize: 12,
        color: "rgb(75, 139, 175)",
        cursor: 'pointer',
        position: 'relative',
        outline: 'none',
        backgroundColor: 'rgb(255, 255, 255)'

    },
    displayArea: {
        display: 'flex',
        paddingLeft: '11px',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '35px',
        fontSize: '16px',
        fontWeight: 400,
        borderBottom: '1px solid #4B8BAF'
    },
    arrowWrap: {
        height: '35px',
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    textArrow: {
        height: '35px',
        fontSize: '29px',
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
        top: 36,
        boxSizing: 'border-box',
        transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        overflow: 'hidden',
        fontSize: '16px',
        fontWeight: 400,
        backgroundColor: 'inherit',
        '& li': {
            height: '35px'
        },
        '& li:hover': {
            backgroundColor: 'rgba(229, 229, 229, 0.3)'
        }
    },
    option: {
        borderBottom: '1px solid #EDEDED',
        paddingLeft: '11px',
        lineHeight: '35px'
    },
    noWrap: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    }

});




function NormalSelect(props) {
    const { classes, className, title, defaultValue, rules = {}, options = [], name, saveData } = props;
    const { required } = rules;

    let defaultIndex = 0;
    options.forEach((option, index) => {
        if (option.value === defaultValue) {
            defaultIndex = index;
        }
    })

    let isOptionListDisplay = false;
    const [optIndex, setOptIndex] = useState(defaultIndex);

    let arrow = null, optionList = null;

    const showOptions = () => {
        if (isOptionListDisplay === false) {
            arrow.style.transform = 'rotate(180deg)';
            optionList.style.height = 'auto';
            isOptionListDisplay = true;
        } else {
            arrow.style.transform = 'rotate(0deg)';
            optionList.style.height = '0';
            isOptionListDisplay = false;
        }

    }

    const handleClick = (index) => (event) => {
        //if数据验证有效
        setOptIndex(index);
        if (saveData) {
            saveData(name, { isValid: true, data: options[index].value })
        }
    }

    const handleFocus = () => {
        // arrow.style.transform = 'rotate(180deg)';
        // optionList.style.height = 'auto';
    }

    const handleBlur = () => {
        arrow.style.transform = 'rotate(0deg)';
        optionList.style.height = '0';
        isOptionListDisplay = false;
    }

    useEffect(() => {
        if (saveData) {
            saveData(name, { isValid: true, data: options[optIndex].value })
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
            <div className={classes.selectArea} onFocus={handleFocus} onBlur={handleBlur} tabIndex={0} onClick={showOptions}>
                <div className={classes.displayArea} >
                    <div className={classes.displayText + ' ' + classes.noWrap} title={options[optIndex].display}>{options[optIndex].display}</div>
                    <div className={classes.arrowWrap} ref={(ele) => { arrow = ele; }}>
                        <ExpandMore className={classes.textArrow} />
                    </div>
                </div>
                <ul className={classes.optionList} ref={ele => { optionList = ele; }}>
                    {
                        options.map((option, index) => {
                            if (index === optIndex) {
                                return null
                                // return <li className={classes.selectedOption} key={option.value} >{option.display}</li>
                            } else {
                                return <li className={classes.option + ' ' + classes.noWrap} title={option.display} key={option.value} onClick={handleClick(index)} >{option.display}</li>
                            }
                        })
                    }
                </ul>
            </div>
        </div>
    );
}
export default withStyles(styles)(NormalSelect);