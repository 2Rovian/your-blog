'use client'
import { useState } from "react"
import { useAuthStore } from "../../../../store/authStore"; 

import toast from "react-hot-toast";

export default function NewPost() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const token = useAuthStore((state) => state.token); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!token) {
      toast.error('Você precisa logar para fazer um post')
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
      toast.success('Post criado com sucesso!')
      setTitle('')
      setContent('')

    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar post')
    }
  }

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col w-full max-w-[800px] border-2 border-gray-100 dark:border-gray-800 rounded-xl p-2 shadow-md dark:shadow-gray-900">
        <h2 className="text-center text-xl font-bold py-2">Criar Novo Post</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="outline-gray-300 outline outline-1 py-1 pl-2 rounded-sm focus:outline-gray-400 dark:outline-gray-600 dark:focus:outline-gray-400 ease-in-out duration-300 mb-2"
        />
        <textarea
          placeholder="Escreva seu post aqui..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='outline-gray-300 outline outline-1 py-1 pl-2 rounded-sm resize-none h-[200px] sm:h-[250px] md:h-[300px] dark:outline-gray-600 dark:focus:outline-gray-400 focus:outline-gray-400 ease-in-out duration-300'
        />
        {/* <ul className="flex gap-x-1 my-1">
          <li>
            <button type="button" className='px-2 py-1 border border-1 border-black font-bold'
            onClick={() => {setIsBold(!isBold)}}
            >Bold</button>
          </li>
          <li>
            <button type="button" className='px-2 py-1 border border-1 border-black italic'
            
            >Italic</button>
          </li>
        </ul> */}
        <button
          type="submit"
          className="py-2 bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 hover:bg-gray-950 dark:hover:bg-gray-100 ease-in-out rounded-sm font-semibold mt-4 mb-2"
        >
          Publicar Post
        </button>
        
      </form>
    </div>
  )
}