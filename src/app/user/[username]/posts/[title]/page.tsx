'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostDetail() {
  const { username, title } = useParams<{ username: string; title: string }>();
  const [post, setPost] = useState<{ title: string; content: string } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${username}/${title}`);
        if (!response.ok) throw new Error('Post não encontrado');

        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(true);
      }
    };

    fetchPost();
  }, [username, title]);

  if (error || !post) return <div>Post não encontrado</div>;

  return (
    <div className="mt-5 max-w-2xl mx-auto
    rounded-sm px-3 py-2 mb-2 bg-gray-100 duration-200 ease-in-out  dark:bg-gray-900 dark:outline dark:outline-1 dark:outline-gray-700 shadow-md">
      <h1 className="text-xl font-bold">{post.title}</h1>
      <p className="text-base">{post.content}</p>
    </div>
  );
}
