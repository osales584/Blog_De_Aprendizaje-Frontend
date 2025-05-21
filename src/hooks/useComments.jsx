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
        setError(null); 

        try {
            const response = await getCommentsByPost(postId);
            if (response.error) {
                setError(response.message);
            } else {
                setComments(response.data.comments || []); 
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
  const addComment = async (content) => {
    try {
      console.log({ postId, ...content }); 
      const response = await createComment({ post: postId, ...content });
      if (response.error) {
        setError(response.message);
      } else {
        setComments((prevComments) => Array.isArray(prevComments) ? [response.data.comment, ...prevComments] : [response.data.comment]);
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