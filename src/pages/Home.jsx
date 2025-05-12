import React, { useState } from "react";
import { usePosts } from "../hooks/usePosts.jsx";
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import PostCard from "../components/Posts.jsx";

export const Home = () => {
  const [courseFilter, setCourseFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");

  const { posts, loading, error } = usePosts({
    course: courseFilter,
    title: titleFilter,
  });

  return (
    <div className="container mx-auto p-6 max-w-7xl ">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-700 mb-12 tracking-tight drop-shadow-md">
        <span className="block">📚 BLOG DE </span>
        <span className="block text-indigo-500">APRENDIZAJE</span>
      </h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-10">
        <div className="w-full md:w-64">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Filtrar por curso
          </label>
          <select
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
          >
            <option className="text-black" value="">Todos los cursos</option>
            <option className="text-black" value="TALLER">TALLER</option>
            <option className="text-black" value="PRACTICA SUPERVISADA">PRACTICA SUPERVISADA</option>
            <option className="text-black" value="TECNOLOGIA">TECNOLOGIA</option>
          </select>
        </div>

        <div className="w-full md:w-80">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Buscar por título
          </label>
          <input
            type="text"
            placeholder="Ej: Redes, Java, Base de datos..."
            className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Mensajes de estado */}
      {loading ? (
        <p className="text-center text-gray-600 text-lg">Cargando publicaciones...</p>
      ) : error ? (
        <p className="text-center text-red-600 text-lg">Error: {error}</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No se encontraron publicaciones.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <Link key={post._id} to={`/post/${post._id}`} className="block"> {/* Enlazar al post detalle */}
              <PostCard post={post} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
