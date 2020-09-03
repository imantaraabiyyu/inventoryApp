import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  AllInbox as ItemIcon,
  Home as HomeIcon,
  LocalAtm as TransactionIcon,
  LooksOne as UnitIcon,
  Money as StockIcon
} from "@material-ui/icons";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles(styles);

export default function Navigation() {
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const menus = [
    {
      path: "/",
      active: "",
      icon: HomeIcon,
      label: "Home"
    },
    {
      path: "/items",
      active: "items",
      icon: ItemIcon,
      label: "Item"
    },
    {
      path: "/units",
      active: "units",
      icon: UnitIcon,
      label: "Units"
    },
    {
      path: "/stocks",
      active: "stocks",
      icon: StockIcon,
      label: "Stocks"
    },
    {
      path: "/transactions",
      active: "transactions",
      icon: TransactionIcon,
      label: "Transaction"
    }
  ];

  const path = location.pathname.split("/");

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {menus.map((menu, index) => (
          <Link key={index} to={menu.path} className={classes.link}>
            <ListItem
              button
              className={path[1] === menu.active ? classes.isActive : ""}
            >
              <ListItemIcon>
                <menu.icon className={classes.primaryIcon} />
              </ListItemIcon>
              <ListItemText primary={menu.label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.appTitle} variant="h6" noWrap>
            Inventory App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        {drawer}
      </Drawer>
    </div>
  );
}
