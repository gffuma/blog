import './Home.scss'
import Markdown from '../../components/Markdown'
import { usePosts } from '../../hooks/posts'
import PostListItem from '../../components/PostListItem'

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
  return (
    <div>
      <div className="home-banner">
        <Markdown md={tagline} />
      </div>
      <div className='posts-list'>
        {posts.map((post) => (
          <PostListItem key={post.data.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
