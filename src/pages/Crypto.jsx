import React, {useEffect, useMemo, useState} from "react";

// Importing our child components
import TimeRangePicker from "../components/TimeRangePicker";
import PriceChart from "../components/PriceChart";
import MetricCards from "../components/MetricCards";

// Default crypto that shows when the dashboard loads
const DEFAULT_SYMBOL = "bitcoin"; // CoinGecko API IDs (bitcoin, ethereum, solana, etc.)

/*
    Crypto Page:

    Responsibilities
        - Fetch market data (prices & metrics) from CoinGecko API
        - Pass price data to <PriceChart /> for visualization
        - Pass data to <MetricCards /> for the metrics UI
        - Let user switch between crypto & time ranges
*/

export default function Crypto()
{
    const [symbol, setSymbol] = useState(DEFAULT_SYMBOL); // Whatever crypto us currently selected (dropdown)
    const [days, setDays] = useState(30); // Time range for charts courtesy of TimeRangePicker (days)
    const[loading, setLoading] = useState(false); // Loading state, shows loading UI instead of chart
    const[series, setSeries] = useState([]); // Stores the historical price series used by the chart
    const[market, setMarket] = useState(null); // Store market metrics (current, percent-change, high, low)

    /*
        Fetch crypto price history & market metrics when:
            - user selects a new coin (symbol changes)
            - user selects a new time range (days changes)

        useEffect runs whenever its dependency arrays changes.
    */

    useEffect(() => 
    {
        let cancelled = false;

        async function load()
        {
            setLoading(true); // shows "Loading..."

            try
            {
                // Fetch price history (timestamp + price pairs)
                const chartRes = await fetch(`https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=${days}`);
                const chart = await chartRes.json() // Converts our API information into json format {prices: [[ts, price], ...]}

                // Fetches current stats (price, 24h change, high, low)
                const infoRes = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${symbol}`);
                const info = await infoRes.json() // json format [{current_price, high, low, percentage-change}]

                if(!cancelled) // Updates if the components are mounted
                {
                    setSeries(chart?.prices || []); // Pass data to chart
                    setMarket(info && info.length? info[0] : null); // Takes first object from API array
                }
            }
            catch(e)
            {
                console.error("Error fetching price data: ", e);

                // Prevents app from crashing if API fails
                if(!cancelled)
                {
                    setSeries([]);
                    setMarket(null); 
                }
            }
            finally
            {
                if(!cancelled) setLoading(false); // Stops showing the Loading...
            }
        }

        load();

        // Cleanup function - prevents memory leak warnings
        return() => 
        {
            cancelled = true;
        };

    }, [symbol, days]);

    // useMemo recalls the dropdown options so they aren't recalculated unnecessarily
    
    const options = useMemo(() => 
    ([
        {id: "bitcoin", label: "Bitcoin"},
        {id: "ethereum", label: "Ethereum"},
        {id: "solana", label: "Solana"},
        {id: "dogecoin", label: "Dogecoin"},
    ]), []);

    return(
        <div className="section">
            <div className="row space-between">
                <h2>Crypto</h2> {/* Section title + crypto dropdown */}

                {/* Select crypto (BTC / ETH / SOL/ DOGE) */}
                <select value={symbol} onChange={(e) => setSymbol(e.target.value)} // Updated selected crypto
                    className="select"
                >
                    {options.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
                </select>
            </div>

            <TimeRangePicker value={days} onChange={setDays}/> {/* Time Range Buttons (1D, 1W, 1M, 1Y)*/}

            {/* Statistic cards (Current Price, 24hr change, High, Low) */}
            <MetricCards
                current={market?.current_price}
                change24h={market?.price_change_percentage_24h}
                high={market?.high_24h}
                low={market?.low_24h}
            />

            {/* Render chart or loading*/}
            {loading
            ?<div className="card">Loading...</div>
            : <PriceChart series={series}/>}
        </div>
    );
} 