import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import './topBar.css'
import Background from '../../Assets/TL_Lines_Top.svg';
//import MenuIcon from '@material-ui/icons/Menu';
//import AccountCircle from '@material-ui/icons/AccountCircle';

import { logoutUser } from "../../Firebase/FirebaseRegistration";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    fontWeight: "500",
    color: "red",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  title2: {
    display: "none",
    fontWeight: "500",
    color: "yellow",
    marginLeft: 5,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const arrayOfWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const d = new Date();
export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const pageHistory = useHistory();
  const pageLocation = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [date, setDate] = React.useState(new Date().toDateString());
  const [time, setTime] = React.useState( `${arrayOfWeekdays[d.getDay()]} ${d.getDate()}TH ${monthNames[d.getMonth()]} ${d.getFullYear()}`);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const openMyTimelines = () => {
    handleMenuClose();
    pageHistory.push(`${process.env.PUBLIC_URL}`);
  };
  const signOut = () => {
    pageHistory.push(`${process.env.PUBLIC_URL}`);
    logoutUser();
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          marginRight:'20px'
        },
      }}
    >
      {pageLocation["pathname"] === "/timeline" && (
        <MenuItem onClick={() => openMyTimelines()}>My Timelines</MenuItem>
      )}
      <MenuItem
        onClick={() => {
          signOut();
        }}
      >
        Log out
      </MenuItem>
    </Menu>
  );
  const DualLines = () => {
    return (
      <div
        style={{ marginLeft: "5px", marginRight: "5px", marginBottom: "0px" }}
      >
        <div style={{ border: "2px solid red", borderRadius: 2 }}></div>
        <div
          style={{ border: "2px solid red", marginTop: "4px", borderRadius: 2 }}
        ></div>
      </div>
    );
  };
  React.useEffect(() => {
    window.setInterval(() => {
      let currentSeconds = new Date().getSeconds();
      if (currentSeconds.toString().length == 1) {
        currentSeconds = "0" + currentSeconds;
    }
      let currentMinutes = new Date().getMinutes();
      if (currentMinutes.toString().length == 1) {
        currentMinutes = "0" + currentMinutes;
    }
      let currentHours = new Date().getHours();
      if (currentHours.toString().length == 1) {
        currentHours = "0" + currentHours;
    }
      setTime(`${currentHours}:${currentMinutes}:${currentSeconds}`);
    }, 1000);
    return () => window.clearInterval();
  }, []);
  return (
    <div className={classes.grow}>
      <AppBar position="static" color="secondary" elevation="0">
        <Toolbar>
          <div>
            <IconButton
              aria-controls={menuId}
              onClick={handleProfileMenuOpen}
              color="primary"
              style={{ fontSize: 75, marginLeft: -22, outline:'none' }}
            >
              {/* <AccountCircle fontSize="inherit" /> */}
              <img
                src={require("../../Assets/menu.png")}
                style={{ height: 70, width: "auto" }}
              />
            </IconButton>
          </div>
          <div className={classes.grow} style={{
            background: `url(${Background})`, height: 80,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right',
            backgroundSize: 'cover',
            marginRight:12,
            minWidth:1650
          }}>
            {/* <DualLines /> */}
            {/* <img
              src={require("../../Assets/TL_Lines_Top.svg")}
              style={{marginTop:5}}
            /> */}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
          <img
              src={require("../../Assets/version1/Timeline_Logo_01.svg")}
              style={{ height: 80, width: "auto" }}
              alt="rightHeader"
            />
          </div>

          <div style={{ position: "fixed", right: 50, top: 90, width: 450 }}>
            <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
              <div
                style={{
                  flex: 1,
                  borderRight: "1px solid",
                  borderRightColor: "rgb(89,116,148)",
                }}
              >
                <Typography
                  variant="caption"
                  style={{
                    fontSize: 11,
                    color: "rgb(89,116,148)",
                    fontFamily: "K2D",
                    fontWeight: 200,
                    whiteSpace:'nowrap'
                  }}
                >
                  <i>THE TIMELINE OF RS JAMES DAGENZHAW</i>{" "}
                </Typography>
              </div>
              <div style={{ display: "flex", flex: 0.8, flexDirection: "row" }}>
                <div style={{ flex: 0.4, paddingLeft: 13 }}>
                  <Typography
                    variant="caption"
                    style={{
                      fontWeight: 300,
                      color: "green",
                      fontFamily: "Quantico",
                    }}
                  >
                    {time}
                  </Typography>
                </div>
                <div style={{ flex: 0.6 }}>
                  <Typography
                    variant="caption"
                    style={{
                      fontWeight: "bold",
                      color: "yellow",
                      fontFamily: "Quantico",
                    }}
                  >
                    {date.toLocaleUpperCase()}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}
