import React from "react";

const PostCard = ({ post }) => {
  if (!post) return null;

  const { title = "", description = "", course = "", createdAt } = post;

  return (
    <div className="rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between min-h-[280px]">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
          {description}
        </p>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500 border-t pt-3 mt-auto">
        <span className="font-medium">
          Curso: <span className="text-indigo-600">{course || "Sin curso"}</span>
        </span>
        <span>{createdAt ? new Date(createdAt).toLocaleDateString() : "Fecha desconocida"}</span>
      </div>
    </div>
  );
};

export default PostCard;