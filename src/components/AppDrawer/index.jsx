import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { NavLink } from 'react-router-dom';
import SideButton from '../NavButton';


const drawerWidth = 260;

const styles = theme => ({
    buttonRoot: {
        height: 50,
        width: 260,
        boxSizing: 'border-box',
        lineHeight: '50px',
        textAlign: 'center',
        fontSize: 18,
        color:'rgb(68, 105, 128)',
        '&:hover': {
            backgroundColor: "#CDCDCD"
        },
        //
        backgroundColor: 'rgb(230,230,230)'
    },
    placeholder :{
        height:'49px', //临时占位符
    },

    selectedWrap: {
        backgroundColor: '#CDCDCD'
    },

    selected1: {
        height: '80%',
        backgroundColor: '#4B8BAF',
        width: 4,
        display: 'inline',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        margin: 'auto'
    },
    selected2: {
        height: '80%',
        backgroundColor: '#4B8BAF',
        width: 4,
        display: 'inline',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        margin: 'auto'
    },
    link: {
        'text-decoration': 'none'
    },
    divider: {
        //backgroundColor: 'rgb(96,104,109)'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "rgb(241, 241, 241)"
    },
    toolbar: theme.mixins.toolbar
});

const menuList = [
    {
        type: "divider"
    }, {
        text: "应用",
        link: "/console/jobs",
        type: "link"
    }, {
        type: "divider"
    }, {
        type: "link",
        text: "工作节点",
        link: "/console/node/worker",
    }, {
        type: "divider"
    }, {
        type: "link",
        text: "控制节点",
        link: "/console/node/server",
    }, {
        type: "divider"
    }];

class AppDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    // const origin = ['集群', '应用', '服务', '节点'];
    render() {
        const { classes } = this.props;
        return (
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                {/* <div className={classes.toolbar }/> */}
                <div className={classes.placeholder}> </div>
                <List>
                    {menuList.map((item, index) => {
                        if (item.type === "link") {
                            if (index === 1) {
                                return <SideButton content={item.text} link={item.link} className={{ buttonRoot: classes.buttonRoot, selected: classes.selected1 ,selectedBgc:classes.selectedWrap}} key={item.text}></SideButton>
                            } else {
                                return <SideButton content={item.text} link={item.link} className={{ buttonRoot: classes.buttonRoot, selected: classes.selected2 ,selectedBgc:classes.selectedWrap}} key={item.text}></SideButton>
                            }
                        }
                        if (item.type === "divider") {
                            return <Divider classes={{ root: classes.divider }} key={index} />;
                        }
                        else {
                            return <NavLink to={item.link} key={item.text}>
                                <ListItem button>

                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            </NavLink>
                        }

                    })}
                </List>

                {/* <Divider />
            <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List> */}
            </Drawer>

        );
    }

}

AppDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppDrawer);