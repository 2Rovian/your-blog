import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Profile(){
    return (
        <div className="flex flex-col lg:grid lg:grid-cols-8 ">
            <div className="flex gap-x-4 lg:flex-col lg:col-span-2  lg:items-center">
                <div className="bg-gray-900 dark:bg-white rounded-full size-36 lg:size-44 mt-5 mb-2 flex items-center justify-center">
                    <FontAwesomeIcon className='text-white dark:text-black text-6xl' icon={faUser}></FontAwesomeIcon>
                </div>

                <div className='flex flex-col my-10 lg:my-0 lg:items-center'>
                    <span className='text-5xl'>Name</span>
                    <span>Brief Description</span>
                    <span>Posts Made: 0</span>
                    <button className='bg-gray-900 dark:bg-white dark:text-black rounded-sm text-white py-1 my-2 px-6 self-center'><Link href='create-post'>Create Post</Link></button>
                </div>
            </div>

            <div className="lg:col-span-6 lg:my-5">
                <div>
                    <h2 className='font-semibold'>Título</h2>
                    <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo odio itaque eos harum fuga, voluptatem accusamus voluptatibus amet soluta dicta!</h3>
                </div>
            </div>

        </div>
    )
}