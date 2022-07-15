import './Layout.scss'
import { Suspense } from 'react'
import { Link, Outlet, useMatch } from 'react-router-dom'
import ThemeSwitcher from '../ThemeSwitcher'

export default function Layout() {
  const isHomePage = Boolean(useMatch('/'))
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container">
        <header>
          <div className="sidebar">
            <Link to="/" className="home-link">
              {isHomePage ? <h1>Gio Va</h1> : <h2>Gio Va</h2>}
            </Link>
            <div className="sidebar-links">
              <a href="https://github.com/gffuma">GitHub</a>
              <a href="https://twitter.com/gffuma">Twitter</a>
            </div>
          </div>
          <ThemeSwitcher />
        </header>
        <Outlet />
      </div>
    </Suspense>
  )
}
