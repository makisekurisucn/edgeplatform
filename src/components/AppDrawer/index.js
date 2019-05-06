import React from 'react';
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



const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },

  toolbar: theme.mixins.toolbar,
});

function AppDrawer(props) {
  const { classes } = props;
  const menuList = [
    {
    text: "纵览",
    link: "/dashboard",
    type: "link"
  },
  {
    type: "divider"
  },{
    text: "应用",
    link: "/console/jobs",
    type: "link"
  },{
    type: "divider"
  },{
    type: "link",
    text: "管理节点",
    link: "/console/node/server",
  },{
    type: "link",
    text: "工作节点",
    link: "/console/node/worker",
  }];
  // const origin = ['集群', '应用', '服务', '节点'];
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
            if(item.type === "link"){
              return  <NavLink to={item.link} key={item.text}>
              <ListItem button>
              
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </NavLink>
            }
            if(item.type === "divider"){
              return <Divider />;
            }
            else{
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

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppDrawer);