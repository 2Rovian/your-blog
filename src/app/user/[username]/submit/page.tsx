export default function newPost(){
    return(
        <div className="flex justify-center">
            <div className="mt-5 flex flex-col gap-y-5 w-full max-w-[800px] ">
                <input type="text" placeholder="Title" className="outline-gray-300 outline outline-1 py-1 pl-2 rounded-sm focus:outline-gray-600 dark:outline-gray-600 dark:focus:outline-gray-300 ease-in-out duration-300"/>
                <textarea name="" placeholder="Body" className="outline-gray-300 outline outline-1 py-1 pl-2 rounded-sm resize-none h-[200px] dark:outline-gray-600 dark:focus:outline-gray-300 focus:outline-gray-600 ease-in-out duration-300"></textarea>
                <button className="py-2 bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 hover:bg-gray-950 dark:hover:bg-gray-100 ease-in-out rounded-sm font-semibold">Create New Post</button>
            </div>
        </div>
    )
}