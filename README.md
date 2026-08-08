# DLS Ultra Showdown - Sports League Management Website

A comprehensive web application for managing a sports league with fixtures, results, players, and live standings.

## Features
- 🏆 Live League Table
- ⚽ Match Fixtures & Results
- 👥 Player Statistics & Profiles
- 📊 Team Management
- 🎪 Admin Dashboard

## Database Schema
- **Admins**: Admin user management
- **Teams**: Team information and badges
- **Players**: Player profiles and team assignments
- **Fixtures**: Match schedules with dates and venues
- **Results**: Match scores and outcomes
- **Goals**: Goal records with player and assist tracking
- **PlayerStats**: Aggregated player statistics
- **LeagueTable**: Automatically calculated standings

## Tech Stack
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Node.js/Express (recommended)
- Database: MySQL

## Getting Started
1. Clone the repository
2. Open `index.html` in your browser
3. Configure database connection in backend

## File Structure
```
├── index.html           # Homepage
├── fixtures.html        # Fixtures & Results
├── standings.html       # League Table
├── players.html         # Player Directory
├── admin.html           # Admin Panel
├── css/
│   └── style.css        # Main styles
├── js/
│   ├── main.js          # Main application logic
│   └── api.js           # API communication
└── db/
    └── schema.sql       # Database schema
```