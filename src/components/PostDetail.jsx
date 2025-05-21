import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { getPosts, getCommentsByPost } from '../services/api'; 
import Comments from './Comments'; 

const PostDetail = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener el post
    const fetchPostDetail = async () => {
      try {
        
        const response = await getPosts(`uid=${id}`); // Aquí usamos el id del post
        if (response.error) {
          setError(response.message);
        } else {
          setPost(response.data); 
        }
      } catch (err) {
        setError('Error al cargar el post.');
      }
    };

    const fetchComments = async () => {
      try {
        
        const response = await getCommentsByPost(id); // Obtenemos los comentarios usando el id
        if (response.error) {
          setError(response.message);
        } else {
          setComments(response.data); // Asignamos los comentarios
        }
      } catch (err) {
        setError('Error al cargar los comentarios.');
      }
    };
    if (id) {
      fetchPostDetail(); // Obtener el post
      fetchComments(); // Obtener los comentarios
    }
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      {post ? (
        <>
          <h1 className="text-4xl font-semibold">{post.title}</h1>
          <p className="mt-4">{post.description}</p>
          <p className="mt-2 text-gray-500">
            {post.createdAt && !isNaN(new Date(post.createdAt))
              ? new Date(post.createdAt).toLocaleDateString()
              : ''}
          </p>

          {/* Renderiza los comentarios */}
          <Comments postId={id} comments={comments} />
        </>
      ) : (
        <p>Cargando post...</p>
      )}
    </div>
  );
};

export default PostDetail;