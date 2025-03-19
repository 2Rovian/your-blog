"use client";

import { useState, useEffect } from "react";

interface News_SelectorProps {
    API_KEY: string | undefined;
    BASE_URL: string | undefined;
}

export default function News_Selector({ API_KEY, BASE_URL }: News_SelectorProps) {
    const [categoria, setCategoria] = useState<string>('tech');
    const [articles, setArticles] = useState<any[]>([]);

    const fetchNews = async (category: string) => {
        let query = '';
        switch (category) {
            case 'tech':
                query = 'tecnologia OR inovação OR IA';
                break;
            case 'health':
                query = 'saúde OR medicina OR bem-estar';
                break;
            case 'bussines':
                query = 'economia OR mercado OR finanças';
                break;
            case 'sports':
                query = 'futebol OR basquete OR olimpíadas';
                break;
            case 'entertainment':
                query = 'filmes OR música OR celebridades';
                break;
            default:
                query = 'tecnologia OR inovação OR IA';
                break;
        }

        const response = await fetch(`${BASE_URL}everything?q=${query}&apiKey=${API_KEY}&language=pt&pageSize=20`);
        const data = await response.json();
        setArticles(data.articles || []);
    };

    useEffect(() => {
        fetchNews(categoria);
    }, [categoria]);

    return (
        <div className="mt-1">
            <ul className="flex items-center gap-x-2 ">
                <li className={`px-2 py-1 ${categoria == 'tech' ? "outline-2 bg-black text-white dark:bg-white dark:text-black" : "outline-1"} hover:outline-2 duration-100 ease-in-out cursor-pointer outline rounded-sm`}
                    onClick={() => setCategoria('tech')}
                >Tecnologia</li>
                <li className={`px-2 py-1 ${categoria == 'health' ? "outline-2 bg-black text-white dark:bg-white dark:text-black" : "outline-1"} hover:outline-2 duration-100 ease-in-out cursor-pointer outline rounded-sm`}
                    onClick={() => setCategoria('health')}
                >Saúde</li>
                <li className={`px-2 py-1 ${categoria == 'bussines' ? "outline-2 bg-black text-white dark:bg-white dark:text-black" : "outline-1"} hover:outline-2 duration-100 ease-in-out cursor-pointer outline rounded-sm`}
                    onClick={() => setCategoria('bussines')}
                >Negócios</li>
                <li className={`px-2 py-1 ${categoria == 'entertainment' ? "outline-2 bg-black text-white dark:bg-white dark:text-black" : "outline-1"} hover:outline-2 duration-100 ease-in-out cursor-pointer outline rounded-sm`}
                    onClick={() => setCategoria('entertainment')}
                >Entretenimento</li>
                <li className={`px-2 py-1 ${categoria == 'sports' ? "outline-2 bg-black text-white dark:bg-white dark:text-black" : "outline-1"} hover:outline-2 duration-100 ease-in-out cursor-pointer outline rounded-sm hidden sm:block`}
                    onClick={() => setCategoria('sports')}
                >Esportes</li>
            </ul>

            <main className="flex flex-col md:grid grid-cols-2 md:gap-x-3 gap-y-3 mt-5">
                {articles.map((news, index) => (
                    <article key={index} className="bg-gray-100 dark:bg-gray-900 dark:outline dark:outline-1 dark:outline-gray-700 rounded-lg shadow max-h-[400px] hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer ease-in-out duration-100
                    ">
                        <a href={news.url} target="_blank"
                            className="flex justify-between px-2 overflow-hidden"
                        >
                            <div className="p-2 flex flex-col justify-between">
                                <p className="font-bold">
                                    {news.title ?
                                        (news.title.length > 90 ? news.title.slice(0, 100) + "..." : news.title)
                                        : "Título indisponível"}
                                </p>
                                <div className="flex justify-start gap-x-2">
                                    <span>{news.author || "Autor desconhecido"}</span>
                                    <span>·</span>
                                    <span>{news.publishedAt?.split("T")[0]}</span>
                                </div>
                            </div>
                            <div className="py-2 flex">
                                <img src={news.urlToImage ?? '/img_404.png'} alt=""
                                    className="object-cover rounded-md max-h-[100px] max-w-[120px]"
                                />
                            </div>
                        </a>
                    </article>
                ))}
            </main>
        </div>
    );
}