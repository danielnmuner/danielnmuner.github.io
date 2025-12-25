import { useParams, Navigate } from 'react-router-dom'
import BlackBoxDocument from './BlackBoxDocument'

const DocumentView = () => {
  const { id } = useParams()

  if (id === 'black-box-intermediate-models') {
    return <BlackBoxDocument />
  }

  return <Navigate to="/" replace />
}

export default DocumentView
