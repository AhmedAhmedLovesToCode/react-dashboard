import React, {useState} from "react";
import Header from "./components/Header";
import Crypto from "./pages/Crypto";
import Sports from "./pages/Sports";
import Stocks from "./pages/Stocks";

export default function App()   // Stores the current tab/page
{
  const[tab, setTab] = useState("crypto");


  return(
    
    <div className="container">
      <Header current={tab} onChange={setTab}/>
      {tab == "crypto" && <Crypto/>}
      {tab == "stocks" && <Stocks/>}
      {tab == "sports" && <Sports/>}
    </div>
  );
}
