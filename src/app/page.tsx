interface ArticlesProps {
  author: string,
  title?: string,
  name?: string,
  description?: string,
  url?: string,
  urlToImage?: string,
  publishedAt?: string,
  content?: string
}

interface ResponseProps {
  articles: ArticlesProps[]
}

export default async function Home() {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = process.env.API_URL;

  const response = await fetch(`${BASE_URL}everything?q=tecnologia&apiKey=${API_KEY}&language=pt&pageSize=20`);
  const data: ResponseProps = await response.json();

  return (
    <div className="py-5">
      <p className="mb-5 text-center text-xl font-bold">Principais notícias</p>
      <div className="flex flex-col md:grid grid-cols-2 md:gap-x-3 gap-y-3">
        {data.articles?.map((news, index) => (
          <div key={index} className="bg-gray-100 dark:bg-black dark:outline dark:outline-1 dark:outline-gray-700 rounded-lg shadow max-h-[400px] px-2 flex justify-between ">
            <div className="p-2 flex flex-col justify-between">
              <p className="font-bold">
                <a href={news.url} target="_blank">
                  {news.title ?
                    (news.title.length > 90 ? news.title.slice(0, 100) + "..." : news.title)
                    : "Título indisponível"}
                </a>
              </p>

              <div className="flex justify-start gap-x-2">
                <span className="">{news.author ?
                  (news.author.length > 20 ? news.author.slice(0, 20) + "..." : news.author)
                  : "Autor desconhecido"}</span>
                <span className="">·</span>
                <span>{news.publishedAt?.split("T")[0]}</span>
              </div>

            </div>
            <div className="py-2 flex ">
              <img src={news.urlToImage ?? '/img_404.png'} alt=""
                className="object-cover rounded-md max-h-[100px] max-w-[120px] "
              />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
