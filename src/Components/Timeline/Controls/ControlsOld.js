import React, { useState, useEffect, useRef } from "react";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import _ from "lodash";
import {
  IconButton,
  Slider,
  InputBase,
  ClickAwayListener,
} from "@material-ui/core";
import {
  Add,
  Remove,
  Fullscreen,
  FullscreenExit,
  Search,
  Bookmarks,
} from "@material-ui/icons";
import BookMarkManager from "./BookMarkManager.js";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    right: "20px",
    top: "100px",
    display: "flex",
    //flexDirection: "column",
    zIndex: 10000,
  },
  bookmarks: {
    width: "300px",
    height: "70vh",
    marginLeft: 10,
  },
  search: {
    marginRight: 10,
  },
  controls: {
    display: "flex",
    flexDirection: "column",
  },
  iconButton: {
    backgroundColor: "rgba(20, 22, 23, 0.66)",
    marginBottom: "5px",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: "rgba(20, 22, 23, 1)",
      transform: "scale(1.1)",
    },
  },
  icon: {
    color: "white",
  },
  slider: {
    marginTop: "10px",
    minHeight: 100,
    maxHeight: 100,
  },
  sliderBox: {
    marginTop: 10,
    paddingRight: 8,
  },
}));
const SearchBar = withStyles((theme) => ({
  root: {},
  input: {
    borderRadius: 4,
    //position: 'relative',
    backgroundColor: "#fff",
    border: "1px solid #ced4da",
    fontSize: 16,
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

const ZoomSlider = withStyles({
  root: {
    color: "black",
    height: "100px !important",
    width: "100%",
    marginTop: 10,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: 0,
    marginLeft: "-6px !important",
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {},
  track: {
    height: 100,
    width: "10px !important",
    borderRadius: 4,
  },
  rail: {
    height: 100,
    width: "10px !important",
    borderRadius: 4,
  },
})(Slider);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Controls({ timeline, itemsData, itemsDataSet }) {
  const [sliderValue, setSliderValue] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const prevSliderValue = usePrevious(sliderValue);
  const classes = useStyles();

  const handleZoomIn = () => {
    if (timeline) {
      timeline.zoomIn(0.8);
    }
  };
  const handleZoomOut = () => {
    if (timeline) {
      timeline.zoomOut(0.7);
    }
  };
  const requestFullScreen = () => {
    const d = document.getElementById("root");
    if (document.fullscreen) {
      document
        .exitFullscreen()
        .then((res) => {
          setFullscreen(false);
        })
        .catch((err) => console.log("fullscreen not deactivated"));
    } else {
      d.requestFullscreen()
        .then((res) => {
          setFullscreen(true);
        })
        .catch((err) => console.log("fullscreen not activated"));
    }
  };
  const handleSearchOpen = () => {
    setSearchOpen(!searchOpen);
  };
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
    console.log("hi", event.target.value);
    setSearch(event.target.value);
    searchItems(event.target.value)();
    //_.throttle(searchFunc, 200);
  };
  const handleBookmarksOpen = () => {
    console.log(bookmarksOpen);
    setBookmarksOpen(!bookmarksOpen);
  };
  useEffect(() => {
    if (timeline) {
      if (prevSliderValue <= sliderValue) {
        timeline.zoomIn((0.5 * sliderValue) / 100);
      } else {
        timeline.zoomOut(0.1 + 0.5 * 1.1 * (sliderValue / 100));
      }
    }
  }, [prevSliderValue, sliderValue, timeline]);

  return (
    <div className={classes.root}>
      <div className={classes.bookmarks}>
        {bookmarksOpen ? <BookMarkManager timeline={timeline} /> : null}
      </div>
      {searchOpen && (
        <div className={classes.search}>
          <SearchBar value={search} onChange={handleSearch} />
        </div>
      )}
      <div className={classes.controls}>
        <IconButton
          size="small"
          className={classes.iconButton}
          onClick={handleZoomIn}
        >
          <Add fontSize="large" className={classes.icon} />
        </IconButton>
        <IconButton
          size="small"
          className={classes.iconButton}
          onClick={handleZoomOut}
        >
          <Remove fontSize="large" className={classes.icon} />
        </IconButton>
        <IconButton
          size="small"
          className={classes.iconButton}
          onClick={requestFullScreen}
        >
          {fullscreen ? (
            <FullscreenExit fontSize="large" className={classes.icon} />
          ) : (
            <Fullscreen fontSize="large" className={classes.icon} />
          )}
        </IconButton>
        <IconButton
          size="small"
          className={classes.iconButton}
          onClick={handleSearchOpen}
        >
          <Search fontSize="large" className={classes.icon} />
        </IconButton>
        <IconButton
          size="small"
          className={classes.iconButton}
          onClick={handleBookmarksOpen}
        >
          <Bookmarks fontSize="large" className={classes.icon} />
        </IconButton>
        <div className={classes.sliderBox}>
          <ZoomSlider
            className={classes.slider}
            orientation="vertical"
            getAriaValueText={(value) => value}
            defaultValue={0}
            value={sliderValue}
            step={20}
            onChange={(event, newValue) => setSliderValue(newValue)}
            aria-labelledby="vertical-slider-zoom"
          />
        </div>
      </div>
    </div>
  );
}

export default Controls;
