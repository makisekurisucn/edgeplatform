import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
    }
});


const table = (header) => {
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
        render() {
            const { classes, list, className } = this.props;
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
                        {list.map((row, index) => (
                            <TableRow className={tableBodyWrap} key={index}>
                                {header.map((head) => {
                                    if (head.type && head.type === "component") {
                                        const thisComp = head.component;
                                        return <TableCell className={classes.tableCell} align="center" key={row[head.key]} onClick={this.clickHandler(row, head.key)} >
                                            <thisComp {...row[head.key]} />
                                        </TableCell>
                                    }
                                    else {
                                        const convert = head.convert || ((value) => value);
                                        return <TableCell className={classes.tableCell} align="center" key={row[head.key]} onClick={this.clickHandler(row, head.key)} > {
                                            convert(row[head.key])
                                        }</TableCell>
                                    }
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

    return withStyles(styles)(SimpleTable);
}



export default table;
