import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
const styles = theme => ({
    root: {
        height: 22,
        width: 85,
        boxSizing: 'border-box',
        textAlign: 'center',
        padding: '0px 6px',
        fontSize: 12,
        color: "#EEF9FF",
        '&:hover': {
            backgroundColor: 'rgb(97, 139, 162)',
            '& $textArrow': {
                transform: 'rotate(180deg)'
            },
            '& $selectList': {
                height: 'auto'
            },
            '& $title': {
                color: '#EEF9FF'
            }
        },
        cursor: 'pointer',
        position: 'relative',

    },
    title: {
        position: 'absolute',
        left: '0px',
        fontSize: '12px',
        fontWeight: '300',
        transform: 'scale(0.9)',
        color: 'rgba(194, 197, 199, 0.8)',
        paddingLeft: '3px'
    },
    display: {
        height: '100%',
        margin: 0
    },
    displayText: {
        display: 'inline-block',
        maxWidth: 'calc(100% - 15px)',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        verticalAlign: 'middle',
        marginRight: '-10px'
    },
    textArrow: {
        height: '100%',
        top: '0px',
        left: '12px',
        fontSize: '12px',
        position: 'relative',
        verticalAlign: 'middle',
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    selectList: {
        backgroundColor: 'rgb(129, 162, 181)',
        position: "absolute",
        zIndex: 10,
        padding: 0,
        margin: 0,
        height: 0,
        width: "100%",
        left: 0,
        top: 22,
        transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        overflow: 'hidden',
        '& li:hover': {
            backgroundColor: 'rgb(97, 139, 162)'
        }
    },
    selected: {
        backgroundColor: 'rgb(97, 139, 162)',
        position: 'relative',
    },
    option: {
        padding: '0px 6px',
        maxWidth: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textAlign: 'center'
    }
});

class SelectButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
        this.list = [];
    }
    UNSAFE_componentWillReceiveProps(nextProp) {
        const { list, valueKey, displayKey } = nextProp;
        this.list = [];

        if (list && list.length) {
            if (!valueKey || !displayKey) {
                list.forEach(item => {
                    this.list.push({
                        display: item,
                        value: item
                    });
                });
            }
            else {
                list.forEach(item => {
                    this.list.push({
                        display: item[displayKey],
                        value: item[valueKey]
                    });
                });
            }
        }

    }
    clickHandler = item => event => {
        const { onSelected } = this.props;
        onSelected(item);
    }

    render() {
        const { classes, className, value, extendedClasses = {}, title } = this.props;

        const internalList = this.list;
        let display;
        let classNameWrap = classes.root,
            displayWrap = classes.display,
            displayTextWrap = classes.displayText,
            textArrowWrap = classes.textArrow,
            selectListWrap = classes.selectList,
            selectedWrap = classes.selected,
            optionWrap = classes.option;
        if (className) {
            classNameWrap += ' ' + className;
        }
        if (extendedClasses.display) {
            displayWrap += ' ' + extendedClasses.display;
        }
        if (extendedClasses.displayText) {
            displayTextWrap += ' ' + extendedClasses.displayText;
        }
        if (extendedClasses.textArrow) {
            textArrowWrap += ' ' + extendedClasses.textArrow;
        }
        if (extendedClasses.selectList) {
            selectListWrap += ' ' + extendedClasses.selectList;
        }
        if (extendedClasses.selected) {
            selectedWrap += ' ' + extendedClasses.selected;
        }
        if (extendedClasses.option) {
            optionWrap += ' ' + extendedClasses.option;
        }

        internalList.forEach(item => {
            if (item.value === value) {
                display = item.display;
            }
        });
        return (
            <div className={classNameWrap}>
                {
                    title ? <div className={classes.title}>{title}</div> : null
                }
                <div className={displayWrap}>
                    <div className={displayTextWrap} title={display}>{display}</div>
                    <ExpandMore className={textArrowWrap} />
                </div>
                <ul className={selectListWrap}>
                    {internalList && internalList.map((item, index) => {
                        if (value === item.value) {
                            return <li key={item.value} className={optionWrap + ' ' + selectedWrap} title={item.display}>{item.display}</li>;
                        }
                        else {
                            return <li key={item.value} className={optionWrap} title={item.display} onClick={this.clickHandler(index)} >{item.display}</li>;
                        }
                    })

                    }

                </ul>
            </div>
        );
    }
}
export default withStyles(styles)(SelectButton);