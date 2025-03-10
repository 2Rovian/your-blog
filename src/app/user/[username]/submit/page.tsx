'use client'
import { useState } from "react"
import { useAuthStore } from "../../../../store/authStore"; 

export default function NewPost() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const token = useAuthStore((state) => state.token); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      alert('Você precisa logar para fazer um post')
      return
    }

    try {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Erro ao criar post')
      alert('Post criado com sucesso!')
      setTitle('')
      setContent('')

    } catch (error) {
      console.error(error)
      alert('Erro ao criar post')
    }
  }

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-y-5 w-full max-w-[800px]">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="outline-gray-300 outline outline-1 py-1 pl-2 rounded-sm focus:outline-gray-600 dark:outline-gray-600 dark:focus:outline-gray-300 ease-in-out duration-300"
        />
        <textarea
          placeholder="Body"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="outline-gray-300 outline outline-1 py-1 pl-2 rounded-sm resize-none h-[200px] dark:outline-gray-600 dark:focus:outline-gray-300 focus:outline-gray-600 ease-in-out duration-300"
        />
        <button
          type="submit"
          className="py-2 bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 hover:bg-gray-950 dark:hover:bg-gray-100 ease-in-out rounded-sm font-semibold"
        >
          Create New Post
        </button>
      </form>
    </div>
  )
}