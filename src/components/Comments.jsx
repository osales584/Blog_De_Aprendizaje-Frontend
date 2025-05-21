import React, { useState } from 'react';
import { useComments } from '../hooks/useComments.jsx';

const Comments = ({ postId }) => {
  const { comments, loading, error, addComment } = useComments(postId);
  const [username, setNewUsername] = useState('');
  const [content, setNewContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ post: postId, username, content });
    setNewUsername('');
    setNewContent('');
  };

  return (
    <div className="comments-section mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Comentarios</h2>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Formulario */}
        <div className="w-full lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Agrega un comentario</h3>
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-sm font-medium text-gray-700">Tu nombre</label>
            <input
              className="border text-black border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Escribe tu nombre..."
              value={username}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />

            <label className="block mb-2 text-sm font-medium text-gray-700">Tu comentario</label>
            <textarea
              className="border text-black border-gray-300 p-3 rounded w-full h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Escribe tu comentario..."
              value={content}
              onChange={(e) => setNewContent(e.target.value)}
              required
            />

            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow"
            >
              Agregar comentario
            </button>
          </form>
        </div>

        {/* Listado de comentarios */}
        <div className="w-full lg:w-1/2 bg-gray-50 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Listado de Comentarios</h3>

          {loading && <p className="text-gray-500">Cargando comentarios...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <ul className="divide-y divide-gray-200">
            {comments.map((comment) => (
              <li key={comment._id} className="py-4">
                <p className="font-semibold text-gray-800">{comment.username}</p>
                <p className="text-gray-600">{comment.content}</p>
                <p className="text-sm text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Comments;
