import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons'

export default function NotFound() {
    return (
        <div className='mt-14 flex justify-center text-blue-400 first-letter:'>
            <div className='flex flex-col justify-center w-[300px] text-center bg-slate-950 py-6 rounded-md gap-y-2'>
                <FontAwesomeIcon icon={faGhost}
                    className='text-6xl'
                />
                <p className='text-xl font-semibold'>Esta página não existe</p>
                <Link href='/' className="flex justify-center">
                    <button className="border-2 border-blue-400 px-4 py-2 mt-2 rounded-full hover:bg-blue-400 hover:text-white font-semibold duration-300 ease-in-out">
                        Voltar para a Home
                    </button>
                </Link>
            </div>

        </div>
    )
}
