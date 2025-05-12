import { useState, useEffect } from "react";
import { getPosts } from "../services/api.jsx";

export const usePosts = ({ course, title, sortBy = "createdAt", order = "desc" }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (course) queryParams.append("course", course);
      if (title) queryParams.append("title", title);
      queryParams.append("sortBy", sortBy);
      queryParams.append("order", order);

      const { data, error: fetchError, message } = await getPosts(queryParams.toString());

      if (fetchError || !data || !Array.isArray(data.posts)) {
        setError(message || "No se pudieron cargar las publicaciones.");
        setPosts([]);
      } else {
        setPosts(Array.isArray(data?.posts) ? data.posts : []);
        setError(null);
      }

      setLoading(false);
    };

    fetchPosts();
  }, [course, title, sortBy, order]);

  return { posts, loading, error };
};