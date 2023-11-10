import React, { useEffect, useState } from 'react';
const MatchesComponent = () => {
    const [matches, setMatches] = useState([]);
    useEffect(() => {
        fetchMatches();
    }, []);
    
    async function fetchMatches() {
        try {
          const response = await fetch('https://api.football-data.org/v4/matches', {
            headers: {
              'X-Auth-Token': '11476ea25dc240e3896d3c993c233c5f'
            }
          });
          // Check if the response is ok (status in the range 200-299)
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          // Check the content type of the response
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Oops, we haven\'t got JSON!');
          }
          const data = await response.json();
          console.log("Fetched data:", data);
          setMatches(data.matches);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      }
return (
    <div>
      <h1>Football Matches</h1>
      <ul>
        {matches.map(match => (
          <li key={match.id}>
            <h2>{match.competition.name} - Matchday {match.matchday}</h2>
            <p>Date: {new Date(match.utcDate).toLocaleString()}</p>
            <div>
              <h3>{match.homeTeam.name} vs {match.awayTeam.name}</h3>
              <img src={match.homeTeam.crest} alt={match.homeTeam.name} style={{ width: '50px' }} />
              <span> VS </span>
              <img src={match.awayTeam.crest} alt={match.awayTeam.name} style={{ width: '50px' }} />
            </div>
            <p>Status: {match.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
        }
export default MatchesComponent