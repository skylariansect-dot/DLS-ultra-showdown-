// Authentication Management

const AUTH_KEY = 'dls_auth_token';
const CURRENT_USER = 'dls_current_user';

function isAuthenticated() {
    return localStorage.getItem(AUTH_KEY) !== null;
}

function getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER);
    return user ? JSON.parse(user) : null;
}

function login(username, password) {
    const admins = getStorageData(STORAGE_KEYS.ADMIN) || [];
    const admin = admins.find(a => a.username === username && a.password === password);
    
    if (admin) {
        const token = btoa(`${username}:${Date.now()}`);
        localStorage.setItem(AUTH_KEY, token);
        localStorage.setItem(CURRENT_USER, JSON.stringify({ username, id: admin.id || 1 }));
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(CURRENT_USER);
}

function checkAdminAccess() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.location.pathname.includes('admin')) {
            if (!isAuthenticated()) {
                window.location.href = 'login.html';
            }
        }
    });
}
