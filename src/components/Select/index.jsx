import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
const styles = theme => ({
    root: {
        height: 60,
        width: 200,
        boxSizing: 'border-box',
        lineHeight: '60px',
        textAlign: 'center',
        padding: '0px 4px',
        fontSize: 18,
        color: "#EEF9FF",
        '&:hover': {
            backgroundColor: "#262E2F",
            '& $title': {
                color: "#EAEAEA"
            },
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
    title: {
        fontSize: 12,
        color: '#858585',
        position: 'absolute',
        top: 4,
        left: 10,
        lineHeight: '12px',
        display: 'block',
        height: 12
    },
    display: {
        margin: 0,
    },
    displayText: {
        marginRight: '-25px'
    },
    textArrow: {
        position: 'relative',
        left: '27px',
        verticalAlign: 'middle',
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    selectListWrap: {
        backgroundColor: 'rgba(38,46,47,0.82)',
        position: "absolute",
        padding: 0,
        margin: 0,
        height: 0,
        width: "100%",
        left: 0,
        top: 60,
        transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        overflow: 'hidden',
        //   height: 100,
        '& li:hover': {
            backgroundColor: 'rgba(38,46,47,0.82)'
        }
    },
    selected: {
        backgroundColor: 'rgba(38,46,47,0.82)',
        position: 'relative',
        '&:before': {
            height: 52,
            display: 'block',
            width: 4,
            backgroundColor: '#4B8BAF',
            position: 'absolute',
            top: 4,
            left: 0,
            content: "''"
        }
    }

});

class Button extends Component {
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
        const { classes, title, list, valueKey, displayKey, value } = this.props;
        const internalList = this.list;
        let display;
        internalList.forEach(item => {
            if (item.value === value) {
                display = item.display;
            }
        });
        return (
            <div className={classes.root}>
                <span className={classes.title}>{title}</span>
                <p className={classes.display}>
                    <span className={classes.displayText}>{display}</span>
                    <ExpandMore className={classes.textArrow} />
                </p>
                <ul className={classes.selectListWrap}>
                    {internalList && internalList.map((item, index) => {
                        if (value === item.value) {
                            return <li key={item.value} className={classes.selected}>{item.display}</li>;
                        }
                        else {
                            return <li key={item.value} onClick={this.clickHandler(list[index])} >{item.display}</li>;
                        }
                    })

                    }

                </ul>
            </div>
        );
    }
}
export default withStyles(styles)(Button);