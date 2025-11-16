import React from "react";
import
{
    LineChart,               // Main chart content
    Line,                    // Line that draws the chart
    XAxis,                   // Bottom axis (showcases the time)
    YAxis,                   // Left axis (showcases the price values)
    Tooltip,                 // Hover box (shows data values)
    ResponsiveContainer      // Dynamic chart resizing to fit it's parent container
} from "recharts";

import dayjs from "dayjs";   // Formats timestamps into reasonable dates (MM/DD or time)


/*
 PriceChart Component

 Props:
    series -> Arrays of data points from the API (CoinGecko sends data in format: [timestamp(ms), price])


Example of series:
    [
        [1731117600000, 69341.29],
        [1731121200000, 69402.55]
    ]

We convert each pair into an object so Recharts can read it:
    {
        ts: 1731117600000,
        price: 69341.29
    }
*/


export default function PriceChart({series})
{       // Convert CoinGecko format into Recharts-friendly format
    const data = (series || []).map(([timestamp, price]) => ({
        ts: timestamp,
        price: price
    }));
    
    
    return(
        // Card Container (styling only)
        <div className="card" style={{height: 380}}>
            <ResponsiveContainer width="100%" height="100%"> {/* Automatically adjusts the chart to the containers width & height */}
                <LineChart data={data}> {/* Create a chart that expects an array of objects */}

                {/* Bottom Axis {time} */}
                <XAxis 
                    dataKey = "ts" // which property to use from data
                    tickFormatter = {(t) => dayjs(t).format("MM/DD")} // Converts timestamp to date
                    type = "number" // makes x axis continious instead of categories
                    domain = {["dataMin", "dataMax"]} // auto scales from start to end
                />

                {/* Left Axis (price) */}
                <YAxis />

                {/* On hover, shows data tooltip */}
                <Tooltip
                    labelFormatter = {(t) => dayjs(t).format("MMM D, YYYY h:mm A")} // Formatted date
                    formatter = {(v) => [`$${Number(v).toLocaleString()}`, "Price"]} // shows the price with ($)
                />

                <Line
                    type = "monotone" // smooth curved line
                    dateKey = "price" // derived from our data to draw the price
                    dot = {false} // removes dots from each data point for a more suitable look
                    strokeWidth = {2.5} // makes the line a little more thicker.
                />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}