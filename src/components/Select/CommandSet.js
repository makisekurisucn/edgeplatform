import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';


const styles = theme => ({
    root: {
        height: '100%',
        backgroundColor: '#4BAF7E',
        paddingLeft: '20px',
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
        margin: '0px 3px',
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        verticalAlign: 'text-bottom'
    },
    selectList: {
        position: "absolute",
        padding: 0,
        margin: 0,
        height: 0,
        minWidth: "100%",
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
                <div onClick={defaultCommand.handleClick}>{defaultCommand.name}</div>
                <div className={classes.expandMore}>
                    <ExpandMore className={classes.expandMoreArrow} ></ExpandMore>
                    <ul className={classes.selectList}>
                        {
                            commandList.map((item, index) => {
                                return <li onClick={item.handleClick} key={item.name}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
export default withStyles(styles)(CommandSet);