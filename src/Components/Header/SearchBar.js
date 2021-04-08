import React from "react";
//import {makeStyles} from "@material-ui/core/styles"
import { useSelector } from "react-redux";
//import { colourOptions } from "./docs/data";
import Select from "react-select";

const selectStyles = {
  control: (styles) => ({
    //...styles,
    display: "flex",
    backgroundColor: "white",
    borderRadius: "20px",
    border: "none",
    ":active": {
      ...styles[":active"],
      border: "none !important",
      borderWidth: "0px",
    },
    ":hover": {
      ...styles[":hover"],
      border: "none",
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      color: "black",
      ":active": {
        ...styles[":active"],
      },
    };
  },
  input: (styles) => ({ ...styles, fontFamiy: "K2D" }),
  placeholder: (styles) => ({ ...styles }),
  container: (styles) => ({
    ...styles,
    width: "300px",
    borderRadius: "20px",
  }),
};

export default () => {
  const timeline = useSelector((state) => state.Timeline.timeline);
  const itemsData = useSelector((state) => state.Items);
  console.log(itemsData);
  const items = Object.keys(itemsData)
    .reduce((acc, curr) => {
      return acc.concat(itemsData[curr]);
    }, [])
    .map((item) => {
      let temp = [
        ...item.start_date
          .split(" ")
          .map((e) => (typeof e === "string" ? e.toLowerCase() : e)),
        ...item["tags"].map((e) =>
          typeof e === "string" ? e.toLowerCase() : e
        ),
        ...item.title.split(" ").map((e) => e.toLowerCase()),
      ];
      return {
        label: item["title"],
        value: temp.join(" "),
        id: item["id"],
      };
    });
  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    timeline.focus(selectedOption.id, {
      animation: {
        duration: 500,
        easingFunction: "easeInCubic",
      },
      zoom: false,
    });
  };
  return (
    <div>
      <Select
        label="event-select"
        options={items}
        styles={selectStyles}
        onChange={handleChange}
        placeholder="Search..."
      />
    </div>
  );
};
