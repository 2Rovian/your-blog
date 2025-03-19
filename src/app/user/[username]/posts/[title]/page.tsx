'use client';
import Link from 'next/link';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoadingComponent from '../../LoadingComponent';

export default function PostDetail() {
  const { username, title } = useParams<{ username: string; title: string }>();
  const [post, setPost] = useState<{ title: string; content: string } | null>(null);
  const [error, setError] = useState(false);

  const [Loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/posts/${username}/${title}`);
        if (!response.ok) throw new Error('Post não encontrado');

        const data = await response.json();
        setPost(data);
      } catch (error) {
        setError(true);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };

    fetchPost();
  }, [username, title]);

  if (Loading) return <LoadingComponent />;
  if (error || !post) return <div className="flex justify-center">
    <div className="mt-32 text-center">
      <h1 className="font-bold text-3xl">Post não encontrado :/</h1>
      <Link href={`/user/${username}`}>
        <button className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 mt-3 rounded-full">
          Ver perfil do usuário
        </button>
      </Link>

    </div>
  </div>;

  return (
    <div className="mt-5 max-w-5xl mx-auto
    rounded-sm px-3 py-2 mb-2 bg-gray-100 duration-200 ease-in-out  dark:bg-gray-900 dark:outline-gray-700 shadow-md outline outline-1 outline-gray-500">
      <h1 className="text-xl font-bold">{post.title}</h1>
      <p className="text-base">{post.content}</p>
    </div>
  );
}
