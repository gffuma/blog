import './Home.scss'
import Markdown from '../../components/Markdown'
import { usePosts } from '../../hooks/posts'

const tagline = `
\`\`\`js
// My name is Gio Va and i am a programmer.

while (daysLeft) {
  // TODO: Can be implemented better
  tryToImproveTheWorld()
  daysLeft--
}
\`\`\`
`

export default function App() {
  const posts = usePosts()
  console.log(posts)
  return (
    <div>
      <div className="home-banner">
        <Markdown md={tagline} />
      </div>
    </div>
  )
}
