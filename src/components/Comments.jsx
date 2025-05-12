import React, { useState } from 'react';
import { useComments } from '../hooks/useComments.jsx';

const Comments = ({ postId }) => {
  const { comments, loading, error, addComment } = useComments(postId);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(newComment);
    setNewComment('');  // Limpiar el campo después de agregar el comentario
  };

  return (
    <div className="comments-section mt-6">
      {loading && <p className="text-center text-gray-500">Cargando comentarios...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Formulario para agregar un comentario */}
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="border p-2 w-full"
          placeholder="Escribe tu comentario..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
          Agregar Comentario
        </button>
      </form>

      {/* Renderizar comentarios */}
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment p-4 border-b">
              <p className="text-gray-700">{comment.text}</p>
              <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;