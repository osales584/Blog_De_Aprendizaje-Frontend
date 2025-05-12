import { useState, useEffect } from 'react';
import { getCommentsByPost, createComment } from '../services/api.jsx';
export const useComments = (postId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los comentarios del post por ID
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);  // Resetear errores en cada nueva carga

      try {
        const response = await getCommentsByPost(postId);
        if (response.error) {
          setError(response.message);
        } else {
          setComments(response.data);
        }
      } catch (err) {
        setError('Error al cargar los comentarios.');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // Función para agregar un comentario
  const addComment = async (text) => {
    try {
      const response = await createComment({ postId, text });
      if (response.error) {
        setError(response.message);
      } else {
        setComments((prevComments) => [...prevComments, response.data]);  
      }
    } catch (err) {
      setError('Error al agregar el comentario.');
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
  };
};