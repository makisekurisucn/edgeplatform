import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft'
const styles = theme => ({
    root: {
        width: 128,
        height: 128,
        backgroundColor: 'rgba(22, 22, 22, 0.9)',
        border: '1px solid #696969',
        position: 'relative',
        fontSize: 72,
        color: '#EEF9FF',
        fontWeight: 200,
        lineHeight: '128px',
        textAlign: 'center',
        cursor: 'pointer'
    },
    title: {
        fontSize: 14,
        color: '#858585',
        position: 'absolute',
        top: 4,
        left: 4,
        lineHeight: '14px'
    },
    chevronLeft: {
        position: 'absolute',
        left: 4,
        top: 0,
        bottom: 0,
        margin: 'auto',
        color: '#858585'
    }
});

class NumberBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }
    componentWillReceiveProps(nextProp) {
       
    }
    render() {
        const { classes, className, title, number } = this.props;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        return (
            <div className={classNameWrap}>
                <span className={classes.title}>{title}</span>
               <span>{number}</span>
               <ChevronLeft className={classes.chevronLeft} />
            </div>
        );
    }
}
export default withStyles(styles)(NumberBoard);