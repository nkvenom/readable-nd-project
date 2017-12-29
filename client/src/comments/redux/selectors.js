export const getCommentListByPostId = (state, postId) => {
  const comments = state.comments[postId]
  if (!comments) return []
  const commentList = Object.values(comments)
  console.log('|||',commentList)
  return commentList
}
