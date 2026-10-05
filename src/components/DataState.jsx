export default function DataState({ loading, error, retry, empty = false, compact = false }) {
  if (loading) return <div className={`data-state ${compact ? 'data-state--compact' : ''}`} role="status"><span className="loading-line" />Finding your next great watch...</div>
  if (error) return <div className="data-state" role="alert"><p>{error}</p><button className="btn btn-outline btn-sm" onClick={retry}>Try again</button></div>
  if (empty) return <div className="data-state" role="status">No titles found. Try another search or filter.</div>
  return null
}
