import './Layout.scss'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import ThemeSwitcher from '../ThemeSwitcher'

export default function Layout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container">
        <header>
          <div className="sidebar">
            <h1>Gio Va</h1>
            <div className='sidebar-links'>
              <a href="https://github.com/gffuma">GitHub</a>
            </div>
          </div>
          <ThemeSwitcher />
        </header>
        <Outlet />
      </div>
    </Suspense>
  )
}
