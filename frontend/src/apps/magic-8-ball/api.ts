import axios from 'axios'
import type { FetchJson } from './reasons'

// The real network call, kept apart from reasons.ts so the reason handling can be tested without a network.
export const fetchJson: FetchJson = async (url, timeoutMs) => {
  const response = await axios.get<unknown>(url, { timeout: timeoutMs })
  return response.data
}
