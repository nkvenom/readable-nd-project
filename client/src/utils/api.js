export async function apiCall(url) {
  const fullUrl = `http://localhost:3001${url}`
  const response = await fetch(fullUrl, {
    headers: { Authorization: 'whatever-you-want' }
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const json = await response.json()
  return json
}
