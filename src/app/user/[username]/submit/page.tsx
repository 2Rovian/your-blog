'use client'
import { useState, useRef } from "react"
import { useAuthStore } from "../../../../store/authStore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import toast from "react-hot-toast";

export default function NewPost() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const token = useAuthStore((state) => state.token);

  const [ShowDiscardPost, setShowDiscardPost] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = "auto"; // Reseta a altura para recalcular
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; // Define a nova altura baseada no conteúdo
    }
  };

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
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col w-full max-w-[700px] border-2 border-gray-300 dark:border-gray-600 rounded-xl py-2 px-3 shadow-md dark:shadow-gray-900">
        <h2 className="text-center text-xl font-bold pt-1 pb-2">Criar Novo Post</h2>

        {title &&
          <div className="flex justify-between mb-1">
            <span>Título</span>
            <span>{title.length}/100</span>
          </div>}

        <textarea
          ref={inputRef}
          placeholder="Título"
          value={title}
          onChange={handleChange}
          maxLength={100}
          className="py-1 w-full px-2 dark:bg-black resize-none outline-gray-300 focus:outline-gray-500 dark:outline-gray-600 dark:focus:outline-gray-400 ease-in-out duration-300 outline outline-1 mb-2 rounded-sm"
          rows={1} // Define uma linha mínima
        />

        <textarea
          placeholder="Escreva seu post aqui..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='outline-gray-300 w-full outline outline-1 py-1 px-2 rounded-sm resize-none h-[200px] sm:h-[250px] md:h-[300px] dark:outline-gray-600 dark:focus:outline-gray-400 focus:outline-gray-500 ease-in-out duration-300 dark:bg-black'
        />

        <div className="flex gap-x-2 justify-end items-center mt-2">
          <button type="button" className="py-2 px-3 transition-colors duration-300 ease-in-out rounded-sm font-medium outline outline-1 "
            onClick={() => setShowDiscardPost(true)}
          >Descartar</button>
          <button
            type="submit"
            className="py-2 bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 hover:bg-gray-950 dark:hover:bg-gray-100 ease-in-out rounded-sm font-semibold px-3"
          >
            Publicar Post
          </button>
        </div>


      </form>

      {ShowDiscardPost && <div className="fixed inset-0 flex justify-center bg-black/50">
        <div className="mt-[100px] h-fit bg-black text-white font-sans flex flex-col justify-center py-4 w-[350px] rounded-md">
          <div className="flex justify-center mb-2">
            <div className="rounded-full size-24 flex items-center justify-center border-2 border-blue-500">
              <FontAwesomeIcon className="text-blue-500 text-4xl" icon={faTrash} />
            </div>
          </div>
          <p className="text-center text-3xl font-semibold">Descartar Post?</p>
          <p className="text-center text-sm px-10 text-gray-400 mt-1 mb-3 leading-relaxed">Tenha em mente que você não poderá recuperá-lo.</p>
          <div className="flex gap-x-2 justify-center mt-0 px-7">
            <button className="bg-white duration-150 ease-in-out hover:bg-gray-100 py-2 text-black font-semibold grow rounded-md "
              onClick={() => setShowDiscardPost(false)}
            >Cancelar</button>
            <button className="bg-blue-500 hover:bg-blue-400 duration-150 ease-in-out py-2 font-semibold grow rounded-md "
              onClick={() => {
                setTitle('');
                setContent('');
                setShowDiscardPost(false);
                toast.success('Post descartado.', {
                  iconTheme: {
                    primary: '#60a5fa', // Azul (tailwind: blue-400)
                    secondary: 'white' // Cor do ícone dentro do círculo
                  }
                });
              }}

            >Descartar</button>
          </div>
        </div>
      </div>}
    </div>
  )
}