

export function getPostList(state, categoryId) {
  if (!state.posts || !state.posts.data) return []

  if (!categoryId) return Object.values(state.posts.data)

  return Object.values(state.posts.data).filter(p => p.category === categoryId)
}

export function getPost(state, postId) {
  if (!state.posts || !state.posts.data) return null

  return state.posts.data[postId]
}
