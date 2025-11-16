import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

/**
 * Sports Page – NBA Games
 *
 * This page pulls NBA game data from the BallDontLie API.
 * It displays:
 *   - Home vs away teams
 *   - Game status (Final, Scheduled, etc.)
 *   - Tipoff time (formatted with dayjs)
 *   - Scores for each team
 *
 * The UI uses custom CSS classes (game-card, game-meta, game-row)
 * to create a polished, dashboard-style look.
 */
export default function Sports() 
{
  const [games, setGames] = useState([]); // Array of NBA games returned by the API
  const [error, setError] = useState(null); // Stores error message if API fails
  const [loading, setLoading] = useState(true); // Controls loading state (initially true)

  const[date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  // Read API key from .env file
  const API_KEY = process.env.REACT_APP_BALLDONTLIE_KEY;

  /** 
   * Fetch NBA games when the component loads OR
   * when API_KEY becomes available.
   */
  useEffect(() => {
    async function loadGames() 
    {
      try 
      {
        setError(null);   // reset error
        setLoading(true); // show loading indicator

        // Hard-coded example date — you can replace with today's date.

        // BallDontLie NBA endpoint (v1)
        const url = `https://api.balldontlie.io/nba/v1/games?dates[]=${date}&per_page=20`;

        // Send GET request with your API key in Authorization header
        const res = await fetch(url, 
        {
          headers: 
          {
            Authorization: API_KEY || "",
          },
        });

        // If the request failed (ex: 401 unauthorized)
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        // Parse JSON body
        const json = await res.json();

        // Store game list (json.data)
        setGames(json.data || []);
      } 
      catch (err) 
      {
        console.error("Failed to fetch NBA games:", err);
        setError("Failed to load sports data"); // show error message
      } 
      finally 
      {
        setLoading(false); // hide loading message
      }
    }

    loadGames();
  }, [API_KEY, date]); // Re-run if API key changes



  

  return (
    <div className="section">
      {/* Title for the Sports tab */}
      <h2>NBA Games</h2>

       {/* 👇 Date picker row */}
       <div className="row date-row">
        <label className="muted" style={{ fontSize: 13 }}>
          Select date:
        </label>
        <input
          type="date"
          className="date-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {/* Error message if API fails */}
      {error && <p className="muted">{error}</p>}

      {/* Loading message while fetch runs */}
      {loading && !error && <p className="muted">Loading…</p>}

      {/* Render games list once loaded and no error */}
      {!loading && !error && 
      (
        <div className="games-list">
          {games.map((game) => 
          {
            /**
             * Tipoff time comes from "date" or "status"
             * Format it using dayjs → "Nov 15, 2025 7:00 PM"
             */
            const tipoffRaw = game.date || game.status;
            const tipoff = tipoffRaw ? dayjs(tipoffRaw).format("MMM D, YYYY h:mm A") : "TBD";

            // Combine team scores into a single string
            const scoreText = `${game.home_team_score} - ${game.visitor_team_score}`;

            return (
              <div key={game.id} className="card game-card">
                
                {/* Top row: Teams (left) + Status pill (right) */}
                <div className="game-row">
                  <div className="game-teams">
                    <span className="team-name">{game.home_team.full_name}</span>
                    <span className="vs">vs</span>
                    <span className="team-name">{game.visitor_team.full_name}</span>
                  </div>

                  {/* Game status – "Final", "Scheduled", etc. */}
                  <span className="status-pill">
                    {game.status || "Scheduled"}
                  </span>
                </div>

                {/* Bottom row: Tipoff time + Score */}
                <div className="game-meta">
                  <span className="game-time">Tipoff: {tipoff}</span>
                  <span className="game-score">Score: {scoreText}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
