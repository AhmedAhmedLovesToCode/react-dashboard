import React from "react";


/*
    MetricCards Component

    Props received from Crypto:
        current -> current price of the selected crypto (69, 250, 172)
        change24th -> percentage change over the last 24hrs
        high -> Highest price in the last 24hrs
        low -> Lowest price in the last 24hrs

    This component displays 4 small stats cards which displays the props above
*/

export default function MetricCards({current, change24h, high, low})
{
    
    // Renders a item card
    const Item = ({label, value}) => 
    (
        <div className="metric">
            <div className="metric-label">{label}</div>
            <div className="metric-value">{value}</div>
        </div>
    );

    return(
        // Grid container that holds all 4 boxes side-by-side 
        <div className="grid">

            {/* Current crypto price (with commas formatted) */}
            <Item
                label = "Current"
                value = 
                {
                    current != null ? `$${current.toLocaleString()}` : "-" // If card is null then return dash (-)
                }
            />

            {/* 24 hour percent change (add + sign for positive number) */}
            <Item
                label = "24h Change"
                value = 
                {
                    change24h != null ? `${change24h > 0 ? "+" : ""}${change24h.toFixed(2)}%` : "-"
                }
            />

            {/* 24 hour highest price*/}
            <Item
                label = "24h High"
                value = {high != null ? `$${high.toLocaleString()}`: "-"}
            />

            {/* 24 hour lowest price */}
            <Item
                label = "24h Low"
                value = {low != null ? `$${low.toLocaleString()}` : "-"} 
            />

    {/* (.toLocaleString) used to convert various data types (like Numbers, Dates, Arrays, and BigInts) into a string representation */}
        </div>
    );
}