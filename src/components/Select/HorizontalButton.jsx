import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        display: 'table',
        marginBottom: 10,
        backgroundColor: 'rgba(22,22,22,0.4)',
        fontSize: 12,
        fontWeight: 300,
        color: '#EEF9FF',
        height: 24,
        width: '100%'
    },
    selectItem: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'table-cell',
        verticalAlign: 'middle',
        textAlign: 'center',
        padding: '0px 10px',
        boxSizing: 'border-box',
        '&:hover': {
            backgroundColor: 'rgba(75,139,175,0.60)'
        },
        cursor: 'pointer'
    },
    selected: {
        backgroundColor: 'rgba(75,139,175,0.60)'
    }
});


class HorizontalButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleClick = (index) => (event) => {
        if (this.props.onClick) {
            this.props.onClick(index);
        }
    }

    render() {
        const { classes, className, selectList = [], selectedIndex, maxWidth } = this.props;
        let classNameWrap = classes.root;
        if (className) {
            classNameWrap += ' ' + className;
        }
        const widthPercent = (100 / (selectList.length)).toFixed(2) + '%';
        const selectedItem = classes.selectItem + ' ' + classes.selected;
        const style = {
            width: widthPercent,
            maxWidth
        }
        return (
            <div className={classNameWrap}>
                {
                    selectList.map((item, index) => {
                        if (index === selectedIndex) {
                            return <div className={selectedItem} title={item.text} style={style} key={item.text}>{item.text}</div>
                            // return <div className={selectedItem} title={item.text} style={style} onClick={this.handleClick(index)} key={item.text}>{item.text}</div>
                            // 当前逻辑为重复点击选中项不起作用
                        }
                        else {
                            return <div className={classes.selectItem} title={item.text} style={style} onClick={this.handleClick(index)} key={item.text}>{item.text}</div>
                        }
                    })
                }
            </div>
        );
    }
}
export default withStyles(styles)(HorizontalButton);