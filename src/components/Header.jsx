import React from "react";
/*

Props: 
    - current -> which tab page is active ("crypto", "stocks", or "sports")
    - onChange -> function passed from App.js that updates the active tab

    This component displays the page title and tab buttons
    Clicking a button causes onChange to alternate between the pages  

*/


export default function Header({current, onChange})
{
    const tabs = ["crypto", "stocks", "sports"]; // Our tabs

    return (  
        <header className="header"> 
            <h1>Interactive Data Visualization Dashboard</h1>
            <nav className="tabs"> {/* Navigation Bar that holds all of our buttons */} 
                {tabs.map((t) => ( // (map) loops through all the tabs (t is our iterable)
                    <button 
                        key = {t} // Required for lists so React can track each button 
                        className = {`tab ${current === t ? "active" : ""} `} // Highlights our current tab
                        onClick = {() => onChange(t)} // When clicked, switches tab
                    >
                        {t.toUpperCase()} 
                    </button>
                ))}
            </nav>
        </header>
    ) 
}