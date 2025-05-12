import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/learningBlog/v1",
  timeout: 5000,
  httpsAgent: false,  
});

// ==================== POSTS ====================

// Crear un post
  
  // Obtener todos los posts
  export const getPosts = async (queryString) => {
    try {
      const response = await apiClient.get(`/post?${queryString}`);
      return { data: response.data, error: false };
    } catch (err) {
      return { error: true, message: err.response?.data?.message || err.message };
    }
  };
  
  // ==================== COMMENTS ====================
  
  // Crear un comentario
  export const createComment = async (commentData) => {
    try {
      const res = await apiClient.post("/comment/createComment", commentData);
      return { data: res.data };
    } catch (err) {
      return { error: true, message: err.response?.data?.message || err.message };
    }
  };
  
  // Obtener comentarios por ID de post
  export const getCommentsByPost = async (uid) => {
    try {
      const res = await apiClient.get(`/comment/findComment/${uid}`);
      return { data: res.data };
    } catch (err) {
      return { error: true, message: err.response?.data?.message || err.message };
    }
  };