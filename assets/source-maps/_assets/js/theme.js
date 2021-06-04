const STORAGE_KEY_THEME_MODE = "mode"
const THEME_MODE_DARK = "dark"
const THEME_MODE_LIGHT = "light"

function switchTheme() {
    const themeSwitcher = document.getElementById('themeSwitcher');
    sessionStorage.setItem(STORAGE_KEY_THEME_MODE, themeSwitcher.checked ? THEME_MODE_DARK : THEME_MODE_LIGHT);
    setTheme(themeSwitcher.checked ? THEME_MODE_DARK : THEME_MODE_LIGHT);
}

function setTheme(mode) {
    let newMode = mode;
    if (sessionStorage.getItem(STORAGE_KEY_THEME_MODE)) {
        newMode = sessionStorage.getItem(STORAGE_KEY_THEME_MODE);
    }

    if (newMode === THEME_MODE_DARK) {
        document.body.setAttribute('data-theme', 'dark')
    } else {
        document.body.removeAttribute('data-theme');
    }

    document.getElementById('themeSwitcher').checked = newMode === THEME_MODE_DARK;
}

window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {
    setTheme(e.matches ? THEME_MODE_DARK : THEME_MODE_LIGHT);
});

document.addEventListener('DOMContentLoaded', function() {
    const mode = window.matchMedia('(prefers-color-scheme: dark)').matches === true ? THEME_MODE_DARK : THEME_MODE_LIGHT
    setTheme(mode);
}, false);