'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import LoadingComponent from './LoadingComponent'
import NotFoundUser from './NotFoundComponent'
import NotPostedYet from './NotPostedYet'

interface User {
  username: string
  bio?: string
  postCount?: number
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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${ username }`) // Requisição à API
        if (!response.ok) {
          setError(true)
          return
        }
        const data = await response.json() // Converte para JSON
        setUser(data.user) // Atualiza o estado com os dados do user
      } catch (error) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [username])

  if (loading) {
    return <LoadingComponent /> 
  }

  if (error || !user) {
    return (
      <NotFoundUser />
    )
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-8">
      <div className="flex gap-x-4 lg:flex-col lg:col-span-2 lg:items-center">
        <div className="bg-gray-900 dark:bg-white rounded-full size-36 lg:size-44 mt-5 mb-2 flex items-center justify-center">
          <FontAwesomeIcon className='text-white dark:text-black text-6xl' icon={faUser} />
        </div>

        <div className='flex flex-col my-10 lg:my-0 lg:items-center'>
          <span className='text-5xl'>{user.username}</span>
          <span>{user.bio || 'Brief Description'}</span>
          <span>Posts Made: {user.postCount || 0}</span>
          <button className='bg-gray-900 dark:bg-white dark:text-black rounded-sm text-white py-1 self-start lg:self-center my-2 px-8'>
            <Link href='create-post'>Create Post</Link>
          </button>
        </div>
      </div>

      <div className="lg:col-span-6 lg:my-5">
        {user.posts?.length == 0 ?
          <NotPostedYet username={user.username}/>
          :
          user.posts?.map((post, index) => (
            <div key={index}>
              <h2 className='font-semibold'>{post.title}</h2>
              <h3>{post.content}</h3>
            </div>
          ))
        }
      </div>

    </div>
  )
}