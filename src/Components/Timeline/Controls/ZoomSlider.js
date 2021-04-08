import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { useSelector } from "react-redux";

const CustomSlider = withStyles({
  root: {
    //color: '#52af77',
    //color:"#ffffff",
    height: 8,
    width:70
  },
  thumb: {
    height: 15,
    width: 15,
    backgroundColor: "#fff",
    border: "1px solid black",
    marginTop: -2,
    marginLeft: -10,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
    border: "1px solid black",
    color: "#fff",
  },
  rail: {
    height: 5,
    marginTop:2,
    borderRadius: 4,
    border: "1px solid black",
    color: "#fff",
  },
})(Slider);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const ZoomSlider = () => {
  const timeline = useSelector((state) => state.Timeline.timeline);
  const [sliderValue, setSliderValue] = useState(0);
  const prevSliderValue = usePrevious(sliderValue);
  useEffect(() => {
    if (timeline.zoomIn && timeline.zoomOut) {
      if (prevSliderValue <= sliderValue) {
        timeline.zoomIn((0.5 * sliderValue) / 100);
      } else {
        timeline.zoomOut(0.1 + 0.5 * 1.1 * (sliderValue / 100));
      }
    }
  }, [prevSliderValue, sliderValue, timeline]);
  return (
    <div style={{ width: "70px", marginRight: "8px", marginLeft: "8px" }}>
      <CustomSlider
        aria-label="zoom slider"
        value={sliderValue}
        step={25}
        min={0}
        max={100}
        onChange={(event, newValue) => setSliderValue(newValue)}
      />
    </div>
  );
};

export default ZoomSlider;
