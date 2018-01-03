export const getCommentListByPostId = (state, postId) => {
  const comments = state.comments[postId]

  if (!comments) return []

  return Object.values(comments)
}
