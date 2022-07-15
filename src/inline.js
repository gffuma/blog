function setPageTheme(theme) {
  const myHtml = document.querySelector('html')
  const metaTheme = document.querySelector('meta[name="theme-color"]')
  if (theme === 'dark') {
    metaTheme.setAttribute('content', '#333842')
  } else {
    metaTheme.setAttribute('content', 'white')
  }
  myHtml.setAttribute('data-theme', theme)
}

function setButtonTheme(theme) {
  let emoji
  const themeCtrl = document.querySelector('.theme-switcher')
  if (theme === 'dark') {
    emoji = '🌝'
  } else {
    emoji = '🌞'
  }
  themeCtrl.textContent = emoji
}

function switchTheme() {
  const myHtml = document.querySelector('html')
  myHtml.classList.add('animation')
  const currentTheme = myHtml.getAttribute('data-theme')
  let nextTheme
  if (currentTheme === 'dark') {
    nextTheme = 'light'
  } else {
    nextTheme = 'dark'
  }
  setPageTheme(nextTheme)
  setButtonTheme(nextTheme)
  window.__theme = nextTheme
  try {
    window.localStorage.setItem('theme', nextTheme)
  } catch (_) {}
}

function initThemeSwitcher() {
  const themeCtrl = document.querySelector('.theme-switcher')
  themeCtrl.classList.remove('theme-switcher-hidden')
  if (window.__theme) {
    setButtonTheme(window.__theme)
  }
}

;(function () {
  window.__theme = window.localStorage.getItem('theme')
  if (window.__theme) {
    setPageTheme(window.__theme)
  }
})()
