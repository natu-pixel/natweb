import { useEffect, useState } from 'react'
import { getTMDB } from '../lib/tmdb'

export default function useTMDB(endpoint, params = {}) {
  const serialized = JSON.stringify(params)
  const requestKey = `${endpoint}:${serialized}`
  const [version, setVersion] = useState(0)
  const [state, setState] = useState({ key: '', data: null, loading: true, error: '' })

  useEffect(() => {
    if (!endpoint) return
    const controller = new AbortController()
    setState({ key: requestKey, data: null, loading: true, error: '' })
    getTMDB(endpoint, JSON.parse(serialized), controller.signal)
      .then(data => {
        if (!controller.signal.aborted) setState({ key: requestKey, data, loading: false, error: '' })
      })
      .catch(error => {
        if (!controller.signal.aborted) setState({ key: requestKey, data: null, loading: false, error: error.message })
      })
    return () => controller.abort()
  }, [endpoint, serialized, requestKey, version])

  return {
    ...(state.key === requestKey ? state : { data: null, loading: Boolean(endpoint), error: '' }),
    retry: () => setVersion(value => value + 1),
  }
}
