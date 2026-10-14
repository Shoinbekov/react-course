import { Link } from 'react-router-dom'
import StatusMessage from '../components/StatusMessage'

export default function NotFoundPage() {
  return (
    <StatusMessage tone="empty" title="Page not found">
      This page does not exist. <Link to="/">Go to the catalog</Link>
    </StatusMessage>
  )
}
