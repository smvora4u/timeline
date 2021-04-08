import React, { useState, useEffect } from "react";

export default () => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    let k = setInterval(() => {
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
    return () => window.clearInterval(k);
  });
  return <>{time}</>;
};

