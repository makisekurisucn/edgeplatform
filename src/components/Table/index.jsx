import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import { formatTime } from '../../utils/formatTime';

// import AddIcon from '@material-ui/icons/Add';

import { isAbsolute } from 'path';

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto'
    },
    table: {
        minWidth: 700
    },
    tableHead: {
        height: 56
    },
    tableBody: {
        height: 48,
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: 'rgb(241,241,241)'
        }
    },
    tableRow: {
        backgroundColor: 'rgb(241,241,241)'

    },
    tableCell: {
        fontSize: '18px'
    },
    status: {
        display: 'inline-block',
        width: '82px',
        height: '29px',
        border: '2px solid #4BAF7E',
        color: '#4BAF7E',
        lineHeight: '29px',
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 400
    },
    green: {
        color: '#4BAF7E',
        border: '2px solid #4BAF7E',
    },
    yellow: {
        color: '#AF954B',
        border: '2px solid #AF954B',
    },
    gray: {
        color: '#ABABAB',
        border: '2px solid #ABABAB',
    }
});

const kvMap = {
    service: '服务',
    batch: '任务',
    system: '系统服务',
    pending: '启动中',
    running: '运行中',
    dead: '已停止',
    ready: '就绪',
    down: '已停止',
    alive: '运行中'
}

const colorMap = {
    service: '服务',
    batch: '任务',
    system: '系统服务',
    pending: 'yellow',
    running: 'green',
    dead: 'gray',
    ready: 'green',
    down: 'gray',
    alive: 'green'
}

class SimpleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    clickHandler = (item, key) => (event) => {
        const { onItemClick } = this.props;
        if (onItemClick) {
            onItemClick({
                item,
                key,
                event
            });
        }
    }
    processItem = (head, row) => {
        if (head.type === "time") {
            return formatTime(row[head.key]);
        }
        if (head.type === "bool") {
            return row[head.key] + ''
        }
        else {
            return row[head.key]
        }
    }
    render() {
        const { classes, header, list, className } = this.props;
        console.log(header)
        console.log(list);
        let tableBodyWrap = classes.tableBody;
        if (className) {
            tableBodyWrap = classes.tableBody + ' ' + className
        }
        return (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.tableRow + ' ' + classes.tableHead}>
                        {header.map((head) => (
                            <TableCell className={classes.tableCell} align="center" key={head.name}>{head.name}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((row) => (
                        <TableRow className={tableBodyWrap} key={row.ID ? row.ID : row.Name}>
                            {header.map((head) => {
                                if (head.key === 'Status') {
                                    return <TableCell align="center" key={row[head.key]} onClick={this.clickHandler(row, head.key)} >
                                        <span className={classes.status + ' ' + classes[colorMap[this.processItem(head, row)]]}>{kvMap[this.processItem(head, row)] || this.processItem(head, row)}</span>
                                    </TableCell>
                                } else {
                                    return <TableCell className={classes.tableCell} align="center" key={row[head.key]} onClick={this.clickHandler(row, head.key)} > {kvMap[this.processItem(head, row)] || this.processItem(head, row)}</TableCell>
                                }
                                // <TableCell className={classes.tableCell} align="center" key={row[head.key]} onClick={this.clickHandler(row, head.key)} > {kvMap[this.processItem(head, row)] || this.processItem(head, row)}</TableCell>
                            })}
                        </TableRow>
                    ))}
                    {
                        list.length ? null : <TableRow><TableCell>空</TableCell></TableRow>
                    }
                </TableBody>
            </Table>

        );
    }
}
SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
    header: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, key: PropTypes.string })).isRequired,
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
};
SimpleTable.defaultProps = {
    header: [],
    list: [],
};

export default withStyles(styles)(SimpleTable);
// export default SimpleTable;
