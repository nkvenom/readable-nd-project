export async function apiCall(url, options = {}) {
  const fullUrl = `http://localhost:3001${url}`
  const response = await fetch(fullUrl, {
    headers: {
      Authorization: 'auth.ABCDEFGH',
      'Content-Type': 'application/json'
    },
    ...options
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  const json = await response.json()
  return json
}
