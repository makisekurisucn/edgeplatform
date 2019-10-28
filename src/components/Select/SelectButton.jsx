import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
const styles = theme => ({
    root: {
        height: 22,
        width: 85,
        boxSizing: 'border-box',
        lineHeight: '22px',
        textAlign: 'center',
        padding: '0px 6px',
        fontSize: 12,
        color: "#EEF9FF",
        '&:hover': {
            backgroundColor: 'rgba(97,139,162,0.8)',
            '& $textArrow': {
                transform: 'rotate(180deg)'
            },
            '& $selectListWrap': {
                height: 'auto'
            }
        },
        cursor: 'pointer',
        position: 'relative',

    },
    display: {
        margin: 0
    },
    displayText: {
        display: 'inline-block',
        maxWidth: 'calc(100% - 15px)',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        verticalAlign: 'bottom',
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
    selectListWrap: {
        backgroundColor: 'rgba(97,139,162,0.8)',
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
        //   height: 100,
        '& li:hover': {
            backgroundColor: 'rgba(97,139,162,0.8)'
        }
    },
    selected: {
        backgroundColor: 'rgba(97,139,162,0.8)',
        position: 'relative',
        // '&:before': {
        //     height: 22,
        //     display: 'block',
        //     width: 4,
        //     backgroundColor: '#4B8BAF',
        //     position: 'absolute',
        //     top: 4,
        //     left: 0,
        //     content: "''"
        // }
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
        const { classes, className, value } = this.props;
        const internalList = this.list;
        let display;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        internalList.forEach(item => {
            if (item.value === value) {
                display = item.display;
            }
        });
        return (
            <div className={classNameWrap}>
                <p className={classes.display}>
                    <span className={classes.displayText} title={display}>{display}</span>
                    <ExpandMore className={classes.textArrow} />
                </p>
                <ul className={classes.selectListWrap}>
                    {internalList && internalList.map((item, index) => {
                        if (value === item.value) {
                            return <li key={item.value} className={classes.option + ' ' + classes.selected} title={item.display}>{item.display}</li>;
                        }
                        else {
                            return <li key={item.value} className={classes.option} title={item.display} onClick={this.clickHandler(index)} >{item.display}</li>;
                        }
                    })

                    }

                </ul>
            </div>
        );
    }
}
export default withStyles(styles)(SelectButton);