// API Configuration
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API Endpoints
const ENDPOINTS = {
    standings: `${API_BASE}/standings`,
    fixtures: `${API_BASE}/fixtures`,
    players: `${API_BASE}/players`,
    teams: `${API_BASE}/teams`,
    results: `${API_BASE}/results`,
};

// Generic fetch helper
async function fetchAPI(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Standings API
async function fetchStandings() {
    try {
        const data = await fetchAPI(ENDPOINTS.standings);
        return data.map(team => ({
            id: team.id,
            name: team.name,
            badge: team.badge,
            played: team.played || 0,
            wins: team.wins || 0,
            draws: team.draws || 0,
            losses: team.losses || 0,
            goalsFor: team.goalsFor || 0,
            goalsAgainst: team.goalsAgainst || 0,
            goalDifference: (team.goalsFor || 0) - (team.goalsAgainst || 0),
            points: team.points || 0,
        }));
    } catch (error) {
        console.error('Error fetching standings:', error);
        return [];
    }
}

// Fixtures API
async function fetchFixtures() {
    try {
        const data = await fetchAPI(ENDPOINTS.fixtures);
        return data.map(fixture => ({
            id: fixture.id,
            homeTeamId: fixture.homeTeamId,
            homeTeamName: fixture.homeTeamName,
            homeTeamBadge: fixture.homeTeamBadge,
            awayTeamId: fixture.awayTeamId,
            awayTeamName: fixture.awayTeamName,
            awayTeamBadge: fixture.awayTeamBadge,
            date: fixture.date,
            venue: fixture.venue,
            status: fixture.status || 'scheduled',
            homeGoals: fixture.homeGoals || 0,
            awayGoals: fixture.awayGoals || 0,
        }));
    } catch (error) {
        console.error('Error fetching fixtures:', error);
        return [];
    }
}

// Players API
async function fetchPlayers() {
    try {
        const data = await fetchAPI(ENDPOINTS.players);
        return data.map(player => ({
            id: player.id,
            name: player.name,
            teamId: player.teamId,
            teamName: player.teamName,
            photo: player.photo,
            appearances: player.appearances || 0,
            goals: player.goals || 0,
            assists: player.assists || 0,
        }));
    } catch (error) {
        console.error('Error fetching players:', error);
        return [];
    }
}

// Teams API
async function fetchTeams() {
    try {
        const data = await fetchAPI(ENDPOINTS.teams);
        return data.map(team => ({
            id: team.id,
            name: team.name,
            badge: team.badge,
        }));
    } catch (error) {
        console.error('Error fetching teams:', error);
        return [];
    }
}