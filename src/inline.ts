import { Theme, DEFAULT_THEME } from './theme'

let __theme: Theme = DEFAULT_THEME

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

class ThemeSwitcher extends HTMLElement {
  root: ShadowRoot
  button: HTMLButtonElement

  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
    this.button = document.createElement('button')
    this.button.classList.add('theme-switcher')
    this.button.part.add('button')
    this.root.append(this.button)
    this.setButtonTheme(__theme)
  }

  setButtonTheme(theme: Theme) {
    let emoji: string
    if (theme === 'dark') {
      emoji = '🌝'
    } else {
      emoji = '🌞'
    }
    this.button.textContent = emoji
  }

  switchTheme = () => {
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
    this.setButtonTheme(nextTheme)
    try {
      window.localStorage.setItem('theme', nextTheme)
    } catch (_) {}
  }

  connectedCallback() {
    this.button.addEventListener('click', this.switchTheme)
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.switchTheme)
  }
}

customElements.define('theme-switcher', ThemeSwitcher)

// RUNNING AT VERY START OF THE DOCUMENT
let __preferredTheme: Theme | null = null
try {
  __preferredTheme = window.localStorage.getItem('theme') as Theme
} catch (_) {}
if (__preferredTheme) {
  __theme = __preferredTheme
  setPageTheme(__theme)
}
