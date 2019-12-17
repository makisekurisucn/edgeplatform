import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';


const styles = theme => ({
    root: {
        height: '100%',
        width: '87px',
        boxSizing: 'border-box',
        // justifyContent: 'center',
        backgroundColor: '#4BAF7E',
        // padding: '0px 17px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: "#3c9268",
        },
        display: 'flex'
    },
    expandMore: {
        // display:'inline',
        '&:hover': {
            '& $expandMoreArrow': {
                transform: 'rotate(180deg)'
            },
            '& $selectList': {
                height: 'auto'
            }
        }
    },
    expandMoreArrow: {
        // height: 24,
        // verticalAlign: 'text-bottom',
        width: '20px',
        fontSize: '19px',
        position: 'relative',
        left: '19px',
        top: '0px',
        height: '100%',
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    selectList: {
        position: "absolute",
        padding: 0,
        margin: 0,
        height: 0,
        minWidth: "100%",
        maxWidth: "100%",
        right: 0,
        top: '100%',
        transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        overflow: 'hidden',
        '& li:hover': {
            backgroundColor: '#3c9268'
        },
        backgroundColor: '#4BAF7E',
        textAlign: 'center',
        zIndex: 200
    },
    displayText: {
        // marginRight: '-20px',
        marginRight: '-42px',
        width: '100%',
        maxWidth: '100%',
        padding: '0px 18px',
        boxSizing: 'border-box',
        textAlign: 'center',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    option: {
        padding: '0px 10px',
        maxWidth: '100%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    }
});


class CommandSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes, className, defaultCommand, commandList, extendedClasses = {} } = this.props;
        let classNameWrap = classes.root,
            displayTextWrap = classes.displayText,
            expandMoreWrap = classes.expandMore,
            expandMoreArrowWrap = classes.expandMoreArrow,
            selectListWrap = classes.selectList,
            optionWrap = classes.option;

        if (className) {
            classNameWrap += ' ' + className;
        }
        if (extendedClasses.displayText) {
            displayTextWrap += ' ' + extendedClasses.displayText;
        }
        if (extendedClasses.expandMore) {
            expandMoreWrap += ' ' + extendedClasses.expandMore;
        }
        if (extendedClasses.expandMoreArrow) {
            expandMoreArrowWrap += ' ' + extendedClasses.expandMoreArrow;
        }
        if (extendedClasses.selectList) {
            selectListWrap += ' ' + extendedClasses.selectList;
        }
        if (extendedClasses.option) {
            optionWrap += ' ' + extendedClasses.option;
        }

        return (
            <div className={classNameWrap}>
                <div className={displayTextWrap} onClick={defaultCommand.handleClick} title={defaultCommand.name}>
                    {
                        defaultCommand.component || defaultCommand.name
                    }
                </div>
                <div className={expandMoreWrap}>
                    <ExpandMore className={expandMoreArrowWrap} ></ExpandMore>
                    <ul className={selectListWrap}>
                        {
                            commandList.map((item, index) => {
                                return <li className={optionWrap} onClick={item.handleClick} key={item.name} title={item.name}>
                                    {
                                        item.component || item.name
                                    }
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(CommandSet);