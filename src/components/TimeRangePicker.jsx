import React from "react";
/*
    TimeRangePicker Component

    Props received:
        value -> the currently selected time range(7, 30, 365)
        onChange -> function passed from the parent (Crypto.js) which updates the time range

    Buttons like these are shown:
    - [1D]     [1W]     [1M]      1[Y]
      (day)   (week)   (month)    (year)

      When a button is clicked (onChange) is called which updates the graph range
*/

// Available time range filtering options
const ranges = 
[
    {label: "1D", days: 1},
    {label: "1W", days: 7},
    {label: "1M", days: 30},
    {label: "1Y", days: 365}
];

export default function TimeRangePicker({value, onChange})
{
    return(
        // Div container that holds our time range buttons
        <div className="row">
        {ranges.map((range) => (
            <button
                key = {range.label}                         // Unique key for React list rendering
                className =                                 // Toggles based on what's currently being selected (highlights)
                {
                    `chip ${value === range.days ? "chip-active" : ""}`
                }
                onClick = {() => onChange(range.days)} // Notifies parent which range was selected (updates the graph in Crypto.jsx)
            >
                {range.label} {/* Text on the button (1D, 1W, 1M, 1Y) */}
            </button>
        ))}
    </div>
    );
}