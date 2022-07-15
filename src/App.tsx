import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import NotFound from './pages/NotFound/NotFound'
import Post from './pages/Post'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='404.html' element={<NotFound />} />
        <Route path=":slug" element={<Post />} />
      </Route>
    </Routes>
  )
}
