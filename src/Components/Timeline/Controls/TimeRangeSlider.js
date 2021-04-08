import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { useSelector } from "react-redux";

const CustomSlider = withStyles({
  root: {
    color: "#3a8589",
    height: 8,
    padding: "13px 0",
  },
  thumb: {
    height: 27,
    width: 10,
    backgroundColor: "green",
    border: "1px solid black",
    marginTop: -9,
    marginLeft: -5,
    //boxShadow: "#ebebeb 0 2px 2px",
    borderRadius: "0px",
    boxShadow: "none",

    "&:focus, &:hover, &$active": {
      //boxShadow: "#ccc 0 2px 3px 1px",
      outline: "none",
      boxShadow: "none",
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      //backgroundColor: 'red',
      marginLeft: 1,
      marginRight: 1,
    },
    "& span": {
      backgroundColor: "green",
    },
  },
  valueLabel: {
    left: "calc(-150%)",
    //backgroundColor:"red"
  },
  active: {},
  track: {
    height: 10,
    backgroundColor: "blue",
  },
  rail: {
    color: "white",
    opacity: 1,
    height: 8,
    border: "1px solid black",
    borderRadius: "4px",
  },
})(Slider);

const TimeRangeSlider = () => {
  const timeline = useSelector((state) => state.Timeline.timeline);
  const itemsDataSet = useSelector((state) => state.Timeline.itemsDataSet);
  //   const d = itemsDataSet
  //  .get({ filter: (e) => true })
  //  .map((e) => new Date(e.start).getFullYear());
  //console.log("heehaa", Math.min(...d), Math.max(...d));
  const [sliderValue, setSliderValue] = useState([1980, 2000]);
  const handleRange = (data) => {
    //console.log(data);
    const start = new Date(data.start).getFullYear();
    const end = new Date(data.end).getFullYear();
    setSliderValue([start, end]);
    //setTimeRange(data, setSliderValue);
  };

  const [first, setFirst] = useState(true);
  useEffect(() => {
    if (timeline.on) {
      timeline.on("rangechanged", handleRange);
    }
  }, [timeline]);
  const handleChange = (event, newValue) => {
    timeline.setWindow(
      new Date(newValue[0], 1, 31),
      new Date(newValue[1], 1, 31)
    );
    setSliderValue(newValue);
  };
  return (
    <CustomSlider
      valueLabelDisplay="auto"
      arial-label="custom slider"
      defaultValue={[1980, 2000]}
      step={1}
      min={1900}
      max={2100}
      value={sliderValue}
      onChange={handleChange}
    />
  );
};
export default TimeRangeSlider;
