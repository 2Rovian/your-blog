import News_Selector from "@/components/News_Selector";

interface ArticlesProps {
  author: string,
  title?: string,
  description?: string,
  url?: string,
  urlToImage?: string,
  publishedAt?: string,
}

interface ResponseProps {
  articles: ArticlesProps[]
}

export default async function Home() {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = process.env.API_URL;

  const response = await fetch(`${BASE_URL}everything?q=tecnologia&apiKey=${API_KEY}&language=pt&pageSize=20`);

  // const response = await fetch(`${BASE_URL}everything?q=economia OR mercado OR finanças&apiKey=${API_KEY}&language=pt&pageSize=20`);

  // const data: ResponseProps = await response.json();

  return (
    <div className="py-5">
      <h1 className="text-start text-2xl font-bold">Ultimas Notícias</h1>

      <News_Selector API_KEY={API_KEY} BASE_URL={BASE_URL} />

    </div>
  );
}
