import { Helmet } from 'react-helmet'
import './NotFound.scss'

export default function NotFound() {
  return (
    <div className="not-found">
      <Helmet>
        <title>404 ~ Gio Va</title>
        <meta name="description" content="404 Page Not Found" />
      </Helmet>
      <h1>
        404
        <br />
        Nothing To See Here
        <br />
        <br />
        🥷🥷🥷
      </h1>
    </div>
  )
}
