# ⭐ Interactive Data Visualization Dashboard

A React-based dashboard that visualizes **live Crypto, Stock, and NBA game data** using external APIs.  
Users can switch between data panels, adjust time ranges, and (for sports) pick a date to view scheduled or completed games.

---

## ✨ Features

- 📈 **Crypto Dashboard**
  - Pulls real-time crypto data from the **CoinGecko API**
  - Interactive line chart for price history (1D / 1W / 1M / 1Y)
  - Metric cards for current price, 24h change, high, and low

- 💹 **Stocks Panel**
  - Ready to integrate with **Alpha Vantage** or other stock APIs
  - Reuses shared chart + metric components
  - Example setup with `GLOBAL_QUOTE` endpoint

- 🏀 **NBA Sports Panel**
  - Fetches NBA games from the **BallDontLie API**
  - Date picker lets users choose which day’s games to view
  - Clean card layout: home vs away, status, tipoff time, and score

- 🎨 **UI / UX**
  - Dark theme with accent colors, responsive layout
  - Hover effects and card-based design for a modern, dashboard feel
  - Modular components for easy extension

---

## 🛠️ Tech Stack

- **Frontend:** React (Create React App), JavaScript
- **Charts:** Recharts
- **Date handling:** Day.js
- **APIs:**
  - [CoinGecko](https://www.coingecko.com/en/api/documentation) – crypto prices
  - [Alpha Vantage](https://www.alphavantage.co/documentation/) – stock data (configurable)
  - [BallDontLie](https://balldontlie.io/) – NBA games data
- **Tools:** Git, GitHub, VS Code, npm


