// LocalStorage Management for DLS Ultra Showdown
// This serves as the data layer until a backend is implemented

const STORAGE_KEYS = {
    SEASONS: 'dls_seasons',
    TEAMS: 'dls_teams',
    PLAYERS: 'dls_players',
    FIXTURES: 'dls_fixtures',
    RESULTS: 'dls_results',
    MATCH_EVENTS: 'dls_match_events',
    NEWS: 'dls_news',
    ADMIN: 'dls_admin',
    SETTINGS: 'dls_settings',
    CURRENT_SEASON: 'dls_current_season'
};

// Initialize storage with default data
function initializeStorage() {
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
            leagueId: 1,
            leagueName: 'DLS Ultra Showdown',
            seasonId: 1,
            promotionPlaces: 2,
            relegationPlaces: 2,
            primaryColor: '#667eea',
            secondaryColor: '#764ba2',
            heroBg: null,
            heroTitle: 'Welcome to DLS Ultra Showdown',
            heroSubtitle: 'The Premier Sports League',
            createdAt: new Date().toISOString()
        }));
    }

    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_SEASON)) {
        const defaultSeason = {
            id: 1,
            name: '2024/25',
            startDate: new Date().toISOString().split('T')[0],
            endDate: null,
            status: 'active',
            createdAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.SEASONS, JSON.stringify([defaultSeason]));
        localStorage.setItem(STORAGE_KEYS.CURRENT_SEASON, JSON.stringify(defaultSeason));
    }

    if (!localStorage.getItem(STORAGE_KEYS.TEAMS)) {
        localStorage.setItem(STORAGE_KEYS.TEAMS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.PLAYERS)) {
        localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FIXTURES)) {
        localStorage.setItem(STORAGE_KEYS.FIXTURES, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.RESULTS)) {
        localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MATCH_EVENTS)) {
        localStorage.setItem(STORAGE_KEYS.MATCH_EVENTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NEWS)) {
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ADMIN)) {
        const adminCred = {
            username: 'admin',
            password: 'admin123',
            createdAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify([adminCred]));
    }
}

// Generic storage functions
function getStorageData(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error(`Error reading from storage (${key}):`, error);
        return null;
    }
}

function setStorageData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error(`Error writing to storage (${key}):`, error);
        return false;
    }
}

// Settings Management
function getSettings() {
    return getStorageData(STORAGE_KEYS.SETTINGS);
}

function updateSettings(updates) {
    const settings = getSettings();
    const updated = { ...settings, ...updates };
    return setStorageData(STORAGE_KEYS.SETTINGS, updated);
}

// Season Management
function getCurrentSeason() {
    return getStorageData(STORAGE_KEYS.CURRENT_SEASON);
}

function getAllSeasons() {
    return getStorageData(STORAGE_KEYS.SEASONS) || [];
}

function createSeason(seasonData) {
    const seasons = getAllSeasons();
    const newSeason = {
        id: Math.max(...seasons.map(s => s.id || 0), 0) + 1,
        ...seasonData,
        createdAt: new Date().toISOString()
    };
    seasons.push(newSeason);
    setStorageData(STORAGE_KEYS.SEASONS, seasons);
    return newSeason;
}

function switchSeason(seasonId) {
    const seasons = getAllSeasons();
    const season = seasons.find(s => s.id === seasonId);
    if (season) {
        setStorageData(STORAGE_KEYS.CURRENT_SEASON, season);
        return true;
    }
    return false;
}

// Teams Management
function getTeams() {
    return getStorageData(STORAGE_KEYS.TEAMS) || [];
}

function addTeam(teamData) {
    const teams = getTeams();
    const newTeam = {
        id: Math.max(...teams.map(t => t.id || 0), 0) + 1,
        seasonId: getCurrentSeason().id,
        ...teamData,
        createdAt: new Date().toISOString()
    };
    teams.push(newTeam);
    setStorageData(STORAGE_KEYS.TEAMS, teams);
    return newTeam;
}

function updateTeam(teamId, updates) {
    const teams = getTeams();
    const index = teams.findIndex(t => t.id === teamId);
    if (index >= 0) {
        teams[index] = { ...teams[index], ...updates, updatedAt: new Date().toISOString() };
        setStorageData(STORAGE_KEYS.TEAMS, teams);
        return teams[index];
    }
    return null;
}

function deleteTeam(teamId) {
    const teams = getTeams();
    const filtered = teams.filter(t => t.id !== teamId);
    setStorageData(STORAGE_KEYS.TEAMS, filtered);
    return true;
}

// Players Management
function getPlayers() {
    return getStorageData(STORAGE_KEYS.PLAYERS) || [];
}

function addPlayer(playerData) {
    const players = getPlayers();
    const newPlayer = {
        id: Math.max(...players.map(p => p.id || 0), 0) + 1,
        seasonId: getCurrentSeason().id,
        ...playerData,
        stats: {
            appearances: 0,
            goals: 0,
            assists: 0,
            yellowCards: 0,
            redCards: 0,
            ownGoals: 0,
            penaltyGoals: 0,
            penaltyMisses: 0,
            playerOfMatch: 0,
            minutesPlayed: 0,
            cleanSheets: 0,
            goalsConceded: 0,
            saves: 0,
            penaltySaves: 0
        },
        createdAt: new Date().toISOString()
    };
    players.push(newPlayer);
    setStorageData(STORAGE_KEYS.PLAYERS, players);
    return newPlayer;
}

function updatePlayer(playerId, updates) {
    const players = getPlayers();
    const index = players.findIndex(p => p.id === playerId);
    if (index >= 0) {
        players[index] = { ...players[index], ...updates, updatedAt: new Date().toISOString() };
        setStorageData(STORAGE_KEYS.PLAYERS, players);
        return players[index];
    }
    return null;
}

function deletePlayer(playerId) {
    const players = getPlayers();
    const filtered = players.filter(p => p.id !== playerId);
    setStorageData(STORAGE_KEYS.PLAYERS, filtered);
    return true;
}

// Fixtures Management
function getFixtures() {
    return getStorageData(STORAGE_KEYS.FIXTURES) || [];
}

function addFixture(fixtureData) {
    const fixtures = getFixtures();
    const newFixture = {
        id: Math.max(...fixtures.map(f => f.id || 0), 0) + 1,
        seasonId: getCurrentSeason().id,
        status: 'scheduled',
        ...fixtureData,
        createdAt: new Date().toISOString()
    };
    fixtures.push(newFixture);
    setStorageData(STORAGE_KEYS.FIXTURES, fixtures);
    return newFixture;
}

function updateFixture(fixtureId, updates) {
    const fixtures = getFixtures();
    const index = fixtures.findIndex(f => f.id === fixtureId);
    if (index >= 0) {
        fixtures[index] = { ...fixtures[index], ...updates, updatedAt: new Date().toISOString() };
        setStorageData(STORAGE_KEYS.FIXTURES, fixtures);
        return fixtures[index];
    }
    return null;
}

function deleteFixture(fixtureId) {
    const fixtures = getFixtures();
    const filtered = fixtures.filter(f => f.id !== fixtureId);
    setStorageData(STORAGE_KEYS.FIXTURES, filtered);
    return true;
}

// Results Management
function getResults() {
    return getStorageData(STORAGE_KEYS.RESULTS) || [];
}

function addResult(resultData) {
    const results = getResults();
    const newResult = {
        id: Math.max(...results.map(r => r.id || 0), 0) + 1,
        seasonId: getCurrentSeason().id,
        ...resultData,
        createdAt: new Date().toISOString()
    };
    results.push(newResult);
    setStorageData(STORAGE_KEYS.RESULTS, results);
    updateFixture(resultData.fixtureId, { status: 'completed' });
    return newResult;
}

function updateResult(resultId, updates) {
    const results = getResults();
    const index = results.findIndex(r => r.id === resultId);
    if (index >= 0) {
        results[index] = { ...results[index], ...updates, updatedAt: new Date().toISOString() };
        setStorageData(STORAGE_KEYS.RESULTS, results);
        return results[index];
    }
    return null;
}

function deleteResult(resultId) {
    const results = getResults();
    const result = results.find(r => r.id === resultId);
    if (result) {
        updateFixture(result.fixtureId, { status: 'scheduled' });
    }
    const filtered = results.filter(r => r.id !== resultId);
    setStorageData(STORAGE_KEYS.RESULTS, filtered);
    return true;
}

// Match Events Management
function getMatchEvents() {
    return getStorageData(STORAGE_KEYS.MATCH_EVENTS) || [];
}

function addMatchEvent(eventData) {
    const events = getMatchEvents();
    const newEvent = {
        id: Math.max(...events.map(e => e.id || 0), 0) + 1,
        ...eventData,
        createdAt: new Date().toISOString()
    };
    events.push(newEvent);
    setStorageData(STORAGE_KEYS.MATCH_EVENTS, events);
    recalculateStatistics();
    return newEvent;
}

function deleteMatchEvent(eventId) {
    const events = getMatchEvents();
    const filtered = events.filter(e => e.id !== eventId);
    setStorageData(STORAGE_KEYS.MATCH_EVENTS, filtered);
    recalculateStatistics();
    return true;
}

// News Management
function getNews() {
    return getStorageData(STORAGE_KEYS.NEWS) || [];
}

function addNews(newsData) {
    const news = getNews();
    const newArticle = {
        id: Math.max(...news.map(n => n.id || 0), 0) + 1,
        seasonId: getCurrentSeason().id,
        status: 'draft',
        featured: false,
        breaking: false,
        views: 0,
        ...newsData,
        createdAt: new Date().toISOString()
    };
    news.push(newArticle);
    setStorageData(STORAGE_KEYS.NEWS, news);
    return newArticle;
}

function updateNews(newsId, updates) {
    const news = getNews();
    const index = news.findIndex(n => n.id === newsId);
    if (index >= 0) {
        news[index] = { ...news[index], ...updates, updatedAt: new Date().toISOString() };
        setStorageData(STORAGE_KEYS.NEWS, news);
        return news[index];
    }
    return null;
}

function deleteNews(newsId) {
    const news = getNews();
    const filtered = news.filter(n => n.id !== newsId);
    setStorageData(STORAGE_KEYS.NEWS, filtered);
    return true;
}

// Statistics Recalculation
function recalculateStatistics() {
    const players = getPlayers();
    const matchEvents = getMatchEvents();
    const results = getResults();
    const fixtures = getFixtures();

    players.forEach(player => {
        player.stats = {
            appearances: 0,
            goals: 0,
            assists: 0,
            yellowCards: 0,
            redCards: 0,
            ownGoals: 0,
            penaltyGoals: 0,
            penaltyMisses: 0,
            playerOfMatch: 0,
            minutesPlayed: 0,
            cleanSheets: 0,
            goalsConceded: 0,
            saves: 0,
            penaltySaves: 0
        };
    });

    matchEvents.forEach(event => {
        const player = players.find(p => p.id === event.playerId);
        if (player) {
            switch (event.type) {
                case 'goal':
                    player.stats.goals++;
                    break;
                case 'own-goal':
                    player.stats.ownGoals++;
                    player.stats.goals++;
                    break;
                case 'penalty-goal':
                    player.stats.penaltyGoals++;
                    player.stats.goals++;
                    break;
                case 'penalty-miss':
                    player.stats.penaltyMisses++;
                    break;
                case 'assist':
                    player.stats.assists++;
                    break;
                case 'yellow-card':
                    player.stats.yellowCards++;
                    break;
                case 'red-card':
                    player.stats.redCards++;
                    break;
                case 'player-of-match':
                    player.stats.playerOfMatch++;
                    break;
            }
        }
    });

    setStorageData(STORAGE_KEYS.PLAYERS, players);
}

// Standings Calculation
function calculateStandings() {
    const teams = getTeams();
    const results = getResults();
    const fixtures = getFixtures();
    const settings = getSettings();

    const standings = teams.map(team => {
        let played = 0, wins = 0, draws = 0, losses = 0;
        let goalsFor = 0, goalsAgainst = 0;

        results.forEach(result => {
            const fixture = fixtures.find(f => f.id === result.fixtureId);
            if (fixture && fixture.status === 'completed') {
                if (fixture.homeTeamId === team.id) {
                    played++;
                    goalsFor += result.homeGoals;
                    goalsAgainst += result.awayGoals;
                    if (result.homeGoals > result.awayGoals) wins++;
                    else if (result.homeGoals === result.awayGoals) draws++;
                    else losses++;
                } else if (fixture.awayTeamId === team.id) {
                    played++;
                    goalsFor += result.awayGoals;
                    goalsAgainst += result.homeGoals;
                    if (result.awayGoals > result.homeGoals) wins++;
                    else if (result.awayGoals === result.homeGoals) draws++;
                    else losses++;
                }
            }
        });

        const points = wins * 3 + draws;
        const goalDifference = goalsFor - goalsAgainst;

        return {
            ...team,
            played,
            wins,
            draws,
            losses,
            goalsFor,
            goalsAgainst,
            goalDifference,
            points,
            promotion: false,
            relegation: false
        };
    });

    standings.sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
    });

    if (settings.promotionPlaces > 0) {
        for (let i = 0; i < Math.min(settings.promotionPlaces, standings.length); i++) {
            standings[i].promotion = true;
        }
    }
    if (settings.relegationPlaces > 0) {
        for (let i = Math.max(0, standings.length - settings.relegationPlaces); i < standings.length; i++) {
            standings[i].relegation = true;
        }
    }

    return standings;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeStorage);
} else {
    initializeStorage();
}
