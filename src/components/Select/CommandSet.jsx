import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';


const styles = theme => ({
    root: {
        height: '100%',
        width: '85px',
        boxSizing: 'border-box',
        justifyContent: 'center',
        backgroundColor: '#4BAF7E',
        padding: '0px 17px',
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
        fontSize: '19px',
        position: 'relative',
        left: '20px',
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
        zIndex: 100
    },
    displayText: {
        marginRight: '-20px',
        maxWidth: '100%',
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
        const { classes, className, defaultCommand, commandList } = this.props;
        let classNameWrap = '';

        return (
            <div className={classes.root}>
                <div className={classes.displayText} onClick={defaultCommand.handleClick} title={defaultCommand.name}>{defaultCommand.name}</div>
                <div className={classes.expandMore}>
                    <ExpandMore className={classes.expandMoreArrow} ></ExpandMore>
                    <ul className={classes.selectList}>
                        {
                            commandList.map((item, index) => {
                                return <li className={classes.option} onClick={item.handleClick} key={item.name} title={item.name}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(CommandSet);