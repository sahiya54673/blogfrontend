import api from './api';

export const getCommentsByPost = async (postId) => {
  const { data } = await api.get(`/comments/post/${postId}`);
  return data;
};

export const createComment = async (text, postId) => {
  const { data } = await api.post('/comments', { text, postId });
  return data;
};

export const deleteComment = async (id) => {
  const { data } = await api.delete(`/comments/${id}`);
  return data;
};
