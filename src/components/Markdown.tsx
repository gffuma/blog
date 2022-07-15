import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'

export default function Markdown({ md }: { md: string }) {
  return <ReactMarkdown children={md} rehypePlugins={[rehypeHighlight]} />
}
