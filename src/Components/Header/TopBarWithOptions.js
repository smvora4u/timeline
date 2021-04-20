import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { withStyles, fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import InputBase from "@material-ui/core/InputBase";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar.js";
import Time from "./Time.js";
import Background from '../../Assets/TL_Lines_Top.svg';
import BookMarkTitle from '../Timeline/Controls/BookMarkTitle';
//import MenuIcon from "@material-ui/icons/Menu";
//import AccountCircle from "@material-ui/icons/AccountCircle";

import { logoutUser } from "../../Firebase/FirebaseRegistration";
import BookMarkTitleContext from "../Timeline/Controls/BookMarkTitle";

import profileIcon from "../../Assets/tlProfileIcon.svg";
import mailIcon from "../../Assets/tlMailIcon.svg";
import mailPIcon from "../../Assets/tlMailPIcon.svg";
import notificationIcon from "../../Assets/tlNotificationIcon.svg";
import notificationPIcon from "../../Assets/tlNotificationPIcon.svg";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    position: "relative",
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

const SearchBar1 = withStyles((theme) => ({
  root: {
    position: "absolute",
    top: "-15px",
    left: "20px",
  },
  input: {
    borderRadius: "20px",
    //position: 'relative',
    backgroundColor: "#fff",
    border: "1px solid #ced4da",
    fontFamily: "K2D",
    fontSize: 16,
    fontWeight: "bold",
    width: "auto",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      boxShadow: `${fade("#000000", 0.25)} 0 0 0 0.2rem`,
      borderColor: "#000000",
    },
  },
}))(InputBase);
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
  const [date, setDate] = React.useState(`${arrayOfWeekdays[d.getDay()]} ${d.getDate()}TH ${monthNames[d.getMonth()]} ${d.getFullYear()}`);
  //const [time, setTime] = React.useState(new Date().toLocaleTimeString());
  const [search, setSearch] = React.useState("");

  const itemsDataSet = useSelector((state) => state.Timeline.itemsDataSet);
  const bookMarkTitleData = useSelector((state) => state.BookMarkTitle);
  const timeline = useSelector((state) => state.Timeline.timeline);
  const searchItems = (value) => () => {
    let results = itemsDataSet
      .get({ filter: (item) => true })
      .filter(
        (item) =>
          item.title.toLowerCase().slice(0, value.length) === value &&
          value !== ""
      );
    if (results.length !== 0) {
      console.log(results[0].title);
      timeline.focus(results[0].id, {
        animation: {
          duration: 500,
          easingFunction: "easeInCubic",
        },
        zoom: false,
      });
    }
  };
  const handleSearch = (event) => {
    //console.log("hi", event.target.value);
    setSearch(event.target.value);
    searchItems(event.target.value)();
  };
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
        style={{
          position: "relative",
          marginLeft: "5px",
          marginRight: "5px",
          marginBottom: "0px",
        }}
      >
        <div style={{ border: "2px solid red", borderRadius: 2 }}></div>
        <div
          style={{ border: "2px solid red", marginTop: "4px", borderRadius: 2 }}
        ></div>
      </div>
    );
  };
  //React.useEffect(() => {
  //  let k = window.setInterval(() => {
  //    setTime(new Date().toLocaleTimeString());
  //  }, 1000);
  //  return () => window.clearInterval(k);
  //});
  return (
    <div className={classes.grow}>
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar>
          <div>
            <IconButton
              aria-controls={menuId}
              onClick={handleProfileMenuOpen}
              color="primary"
              style={{ fontSize: 75, marginLeft: -22,outline:'none' }}
            >
              {/* <AccountCircle fontSize="inherit" /> */}
              <img
                src={require("../../Assets/menu.png").default}
                style={{ height: 70, width: "auto" }}
                alt="menu"
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
              style={{
                height: 80, width: "auto", position: "relative",
                marginLeft: "5px",
                marginRight: "5px",
                marginBottom: "0px",
              }}
              alt="rightHeader"
            /> */}
            {/*
            <SearchBar value={search} onChange={handleSearch} />
		  */}
            <div
              style={{
                marginTop: "36px",
                marginLeft: "60px",
                display: "flex"
              }}
            >
              <SearchBar />
              <IconButton onClick={''} style={{ padding: "0px", marginTop: "-2px", marginLeft: "30px" }}>
                <img src={profileIcon} style={{ height: "45px" }} alt="color" />
              </IconButton>
              <IconButton onClick={''} style={{ padding: "0px", marginTop: "-2px", marginLeft: "15px" }}>
                <img src={mailIcon} style={{ height: "45px" }} alt="color" />
              </IconButton>
              <IconButton onClick={''} style={{ padding: "0px", marginTop: "-2px", marginLeft: "15px" }}>
                <img src={notificationIcon} style={{ height: "45px" }} alt="color" />
              </IconButton>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              src={require("../../Assets/version1/Timeline_Logo_01.svg").default}
              style={{ height: 80, width: "auto" }}
              alt="rightHeader"
            />
          </div>

          <div style={{ position: "absolute", right: 40, top: 90, width: 508 }}>
            <div style={{ display: "flex", flex: 0.95, flexDirection: "row" }}>
              <div
                style={{
                  flex: 1,
                  borderRight: "1px solid",
                  borderRightColor: "rgb(89,116,148)",
                  display: 'flex',

                  flexDirection: "column"
                }}
              >
                <Typography
                  variant="caption"
                  style={{
                    fontSize: 12,
                    paddingRight: 9,
                    color: "#4478C2",
                    fontFamily: "K2D",
                    fontWeight: 600,
                    whiteSpace:'nowrap'
                  }}
                >
                  <i>THE TIMELINE OF RS JAMES DAGENZHAW</i>{" "}
                </Typography>
                <Typography
                  variant="caption"
                  style={{
                    fontSize: 12,
                    color: '#D2232A',
                    fontFamily: "K2D",
                    fontWeight: 600,
                    textAlign: 'end',

                    paddingRight: 17
                  }}
                >
                  <i>{ bookMarkTitleData.bookMarkChapter ? bookMarkTitleData.bookMarkChapter : "Chapter" }</i>{" "}
                </Typography>

              </div>
              <div style={{ flex: 0.88, flexDirection: "row", justifyContent: "space-between" }}>
                <div style={{ width: "100%" }}>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: 0.2, paddingLeft: 13 }}>
                      <Typography
                        variant="caption"
                        style={{
                          fontWeight: 600,
                          fontSize: 12,
                          color: "#259379",
                          fontFamily: "Quantico",
                        }}
                      >
                        <Time />
                        {/* <BookMarkTitleContext.Consumer>
                          {
                            (context) => {
                              alert('consumer updated');
                              return (
                                <div>{context}</div>
                              )
                            }
                          }
                        </BookMarkTitleContext.Consumer> */}
                      </Typography>
                      
                    </div>
                    <div style={{ flex: 0.8, textAlign: 'end' }}>
                      <Typography
                        variant="caption"
                        style={{
                          fontWeight: 600,
                          fontSize: 10,
                          color: "yellow",
                          whiteSpace: 'nowrap',
                          fontFamily: "Quantico",
                        }}
                      >
                        {date.toLocaleUpperCase()}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div 
                  style={{
                    paddingLeft: 13, 
                    fontFamily: "K2D",
                    height: 20,
                    width: 200,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    cursor: "default"
                    }}
                  title={bookMarkTitleData.bookMarkTitle}>{ bookMarkTitleData.bookMarkTitle ? bookMarkTitleData.bookMarkTitle : "BM Title"}</div>

              </div>

            </div>
          </div>
        </Toolbar>
      </AppBar>
      { renderMenu}
    </div >
  );
}
