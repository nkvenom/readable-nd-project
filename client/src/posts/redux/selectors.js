

export function getPostList(state, categoryId) {
  if (!state.posts || !state.posts.data) return []

  if (!categoryId) return Object.values(state.posts.data)

  return Object.values(state.posts.data).filter(p => p.category === categoryId)
}
