import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./TimeSlider/components"; // example render components - source below
import { subDays, startOfToday, format, addHours, subHours } from "date-fns";
import { scaleTime } from "d3-scale";
import { getTimeline, getGroups } from "./Options";


const sliderStyle = {
    position: "relative",
    width: "85%",
    float: 'right'
};

function formatTick(ms) {
    return format(new Date(ms), "MMM dd, hh a");
}

const halfHour = 1000 * 60 * 30;
let midpoint 
export var sliderTime = new Date();
const YearSlider = ({ timeline, groups }) => {
    const today = startOfToday();
    const [selected, setSelected] = React.useState(new Date())
    const [updated, setUpdated] = React.useState(sliderTime)
    const [min, setMin] = React.useState(subDays(today, 7))
    const [max, setMax] = React.useState(startOfToday())
    // const dateTicks = scaleTime().domain([min, max]).ticks(8).map(d => +d);

    React.useEffect(() => {
        // console.log("TIMELINE: ", timeline)
        if (timeline) {
            var range = timeline.getItemRange()
            setMin(subHours(new Date(range.min), 12))
            setMax(addHours(new Date(range.max), 12))
            setSelected(addHours(new Date(range.min), 5))
            timeline.redraw()
            timeline.on('rangechanged', function (properties) {
                if (properties.byUser) {
                    midpoint = new Date((properties.start.getTime() + properties.end.getTime()) / 2);
                    setSelected(midpoint)
                }
            });
        }
    }, [timeline])


    const onChange = ([ms]) => {
        // console.log("CHNAGE")
        // setUpdated(new Date(ms))
        if (timeline) {
            timeline.moveTo(new Date(ms))
        }
    };

    const onUpdate = ([ms]) => {
        if (timeline && midpoint !== new Date(ms)) {
            timeline.moveTo(new Date(ms))
        }
    };

    return (
        <div style={{ paddingBottom: '0.4%', width: "99%" }}>
            <Slider
                mode={1}
                step={halfHour}
                domain={[+min, +max]}
                rootStyle={sliderStyle}
                onUpdate={onUpdate}
                // onChange={onChange}
                values={[+selected]}
            >
                <Rail>
                    {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
                </Rail>
                <Handles>
                    {({ handles, getHandleProps }) => (
                        <div>
                            {handles.map(handle => (
                                <Handle
                                    key={handle.id}
                                    handle={handle}
                                    domain={[+min, +max]}
                                    getHandleProps={getHandleProps}
                                />
                            ))}
                        </div>
                    )}
                </Handles>
                <Tracks right={false}>
                    {({ tracks, getTrackProps }) => (
                        <div>
                            {tracks.map(({ id, source, target }) => (
                                <Track
                                    key={id}
                                    source={source}
                                    target={target}
                                    getTrackProps={getTrackProps}
                                />
                            ))}
                        </div>
                    )}
                </Tracks>
                {/* <Ticks values={dateTicks}>
                    {({ ticks }) => (
                        <div>
                            {ticks.map(tick => (
                                <Tick
                                    key={tick.id}
                                    tick={tick}
                                    count={ticks.length}
                                    format={formatTick}
                                />
                            ))}
                        </div>
                    )}
                </Ticks> */}
            </Slider>
        </div>
    );
}

export default YearSlider
