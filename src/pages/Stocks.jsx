import React, {useEffect, useState} from "react";

export default function Stocks()
{
    const [stock, setStock] = useState("AAPL"); // Default stock symbol
    const [price, setPrice] = useState(null);

    useEffect(() => {
        async function fetchStock()
        {
            const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=N50SVCTVDUQXHG3K`);
            const data = await res.json();
            setPrice(data["Global Quote"]?.["05. price"]);
        }
    
    fetchStock();
    }, [stock]);

    return(
        <div className="section">
            <h2>Stock Prices</h2>
            {/* Dropdown to choose a stock */}
            <select value={stock} onChange={(e) => setStock(e.target.value)} className="select">
                <option value="AAPL">Apple</option>
                <option value="TSLA">Tesla</option>
                <option value="AMZN">Amazon</option>
            </select>

            {/* Display fetched prices */}
            <div className="card" style={{ marginTop: 12 }}>
                {price ? (
                    <h3>{stock}: ${Number(price).toLocaleString()}</h3>
                ) : (
                  <p>Loading...</p>
                )}
            </div>
        </div>
    );
} 