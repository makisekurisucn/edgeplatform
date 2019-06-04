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
import { NavLink } from 'react-router-dom'



const drawerWidth = 260;

const styles = theme => ({
    selectedListItem:{
        // backgroundColor:'#262E2F',
        '&:before': {
            content: '""',
            position: 'absolute',
            height: '81%',
            width: 4,
            top: 0,
            bottom: 0,
            left: 0,
            margin: 'auto',
            backgroundColor: '#4B8BAF',
            cursor: 'default'
        }
    },
    listItem: {
        backgroundColor: 'rgb(51,66,69)'
    },
    link: {
        'text-decoration': 'none'
    },
    divider: {
        backgroundColor: 'rgb(96,104,109)'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: "rgba(33,54,66,0.82)"
    },
    listItemText: {
        'text-align': 'center',
        color: '#EEF9FF'
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
            selectedIndex:-1
        };
    }

    handleClick=(index)=>{
        this.setState({
            selectedIndex:index
        })
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
                <div className={classes.toolbar} />
                <List>
                    {menuList.map((item, index) => {
                        if (item.type === "link") {
                            return <NavLink className={classes.link} to={item.link} key={item.text} onClick={()=>{this.handleClick(index)}}>
                                <ListItem 
                                    selected={index===this.state.selectedIndex} 
                                    classes={{ button: classes.listItem,selected:classes.selectedListItem }} 
                                    style={index===this.state.selectedIndex?{backgroundColor:'#262E2F'}:{backgroundColor:'rgb(51,66,69)'}}
                                    button>

                                    <ListItemText classes={{ primary: classes.listItemText }} primary={item.text} />
                                </ListItem>
                            </NavLink>
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