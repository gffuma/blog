type Theme = 'dark' | 'light'

function setPageTheme(theme: Theme) {
  const myHtml = document.querySelector('html')!
  const metaTheme = document.querySelector('meta[name="theme-color"]')!
  if (theme === 'dark') {
    metaTheme.setAttribute('content', '#333842')
  } else {
    metaTheme.setAttribute('content', 'white')
  }
  myHtml.setAttribute('data-theme', theme)
}

function setButtonTheme(theme: Theme) {
  let emoji: string
  const themeCtrl = document.querySelector('.theme-switcher')!
  if (theme === 'dark') {
    emoji = '🌝'
  } else {
    emoji = '🌞'
  }
  themeCtrl.textContent = emoji
}

window.switchTheme = () => {
  const myHtml = document.querySelector('html')!
  myHtml.classList.add('animation')
  const currentTheme = myHtml.getAttribute('data-theme')
  let nextTheme: Theme
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

window.initThemeSwitcher = () => {
  const themeCtrl = document.querySelector('.theme-switcher')!
  themeCtrl.classList.remove('theme-switcher-hidden')
  if (window.__theme) {
    setButtonTheme(window.__theme)
  }
}

try {
  window.__theme = window.localStorage.getItem('theme') as Theme
} catch (_) {}
if (window.__theme) {
  setPageTheme(window.__theme)
}
