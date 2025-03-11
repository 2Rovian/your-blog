'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import LoadingComponent from './LoadingComponent'
import NotFoundUser from './NotFoundComponent'
import NotPostedYet from './NotPostedYet'

import { useAuthStore } from '@/store/authStore'

interface User {
  username: string
  bio?: string
  posts?: Array<{
    title: string
    content: string
  }>
}

export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>() // Recebe username da URL
  const [user, setUser] = useState<User | null>(null) // Estado para armazenar dados do user
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const [ShowEditBio, setShowEditBio] = useState(false)
  const [TextAreaValue, setTextAreaValue] = useState<string>('')

  const token = useAuthStore((state) => state.token)
  const loggedInUser = useAuthStore((state) => state.user)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${username}`) // Requisição à API
        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json() // Converte para JSON
        setUser(data.user) // Atualiza o estado com os dados do user
        setTextAreaValue(data.user.briefDescription || '') // Preenche a bio atual
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [username])

  const updateBio = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/bio/post-bio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bio: TextAreaValue }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Erro ao atualizar a bio')

      // Atualiza o estado do usuário com a nova bio
      setUser((prevUser) => (prevUser ? { ...prevUser, bio: TextAreaValue } : null))

      setShowEditBio(false) // Fecha o formulário de edição
    } catch (error) {
      console.error('Erro ao atualizar a bio:', error)
    }
  }

  if (loading) {
    return <LoadingComponent />
  }

  if (error || !user) {
    return <NotFoundUser />
  }

  // Verifica se o usuário logado é o mesmo que está visualizando o perfil
  const isOwnProfile = loggedInUser?.username === username

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-8">
      <div className="flex gap-x-4 lg:flex-col lg:col-span-2 items-center">
        <div className="bg-gray-900 dark:bg-white rounded-full size-36 lg:size-44 mt-5 mb-2 flex items-center justify-center shrink-0">
          <FontAwesomeIcon className="text-white dark:text-black text-6xl" icon={faUser} />
        </div>

        <div className="flex flex-col my-10 lg:my-0 lg:items-center">
          <span className="text-5xl">{user.username}</span>

          {!ShowEditBio &&
            <span className="lg:text-center lg:px-2">{user.bio || TextAreaValue}</span>
          }

          {ShowEditBio && (
            <div className="flex-col w-full hidden lg:flex mt-2">
              <textarea
                className="resize-none h-[150px] outline outline-1 dark:bg-black dark:outline-white outline-black pl-2 pt-1 rounded-md"
                value={TextAreaValue}
                onChange={(e) => setTextAreaValue(e.target.value)}
                maxLength={140}
              />

              <div className="flex justify-center gap-x-1 mt-2">
                <button
                  className="bg-green-500 hover:bg-green-400 text-white px-2 py-1 rounded-sm font-semibold outline outline-2 outline-green-400 dark:outline-white dark:bg-white dark:text-black grow"
                  onClick={updateBio} // Chama a função updateBio
                >
                  Save
                </button>
                <button
                  className="outline outline-1 dark:bg-black dark:outline-white outline-black grow py-1 rounded-sm"
                  onClick={() => setShowEditBio(!ShowEditBio)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-x-2 items-center">
            {isOwnProfile && (
              <>
                <button className="bg-gray-900 dark:bg-white dark:text-black rounded-sm text-white py-1 w-[130px] my-2">
                  <Link href={`/user/${user.username}/submit`}>Criar Post</Link>
                </button>

                {!ShowEditBio && (
                  <button
                    className="text-black dark:text-white outline outline-1 outline-black dark:outline-white rounded-sm py-1 px-3"
                    onClick={() => setShowEditBio(!ShowEditBio)}
                  >
                    Add Bio
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 lg:my-5">
        {ShowEditBio && (
          <div className="flex flex-col w-full lg:hidden">
            <textarea
              className="grow resize-none h-[75px] outline outline-1 dark:bg-black dark:outline-white outline-black pl-2 pt-1 rounded-md"
              value={TextAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)}
              maxLength={140}
            />

            <div className="flex gap-x-1 my-2">
              <button
                className="bg-green-500 hover:bg-green-400 text-white px-2 py-1 rounded-sm font-semibold outline outline-2 outline-green-400 dark:outline-white dark:bg-white dark:text-black"
                onClick={updateBio} // Chama a função updateBio
              >
                Save
              </button>
              <button
                className="outline outline-1 dark:bg-black dark:outline-white outline-black px-2 py-1 rounded-sm"
                onClick={() => setShowEditBio(!ShowEditBio)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {user.posts?.length == 0 ? (
          <NotPostedYet username={user.username} />
        ) : (
          user.posts?.map((post, index) => (
            <Link key={index}
              href={`/user/${user.username}/posts/${encodeURIComponent(post.title)}`}
              passHref
            >
              <div className='rounded-sm px-2 py-1 mb-2
              bg-gray-100 hover:bg-gray-200 duration-200 ease-in-out dark:hover:bg-gray-800 dark:bg-gray-900 dark:outline dark:outline-1 dark:outline-gray-700 shadow
              '>
                <h2 className="font-semibold text-lg py-1 dark:text-white">{post.title}</h2>
                <h3 className='dark:text-gray-300 '>
                  {post.content.length > 450 ? `${post.content.slice(0, 450)}...` : post.content}
                </h3>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
