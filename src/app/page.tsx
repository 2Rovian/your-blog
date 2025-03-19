import News_Selector from "@/components/News_Selector";

export default function Home() {
  const API_KEY = process.env.API_KEY;
  const BASE_URL = process.env.API_URL;

  return (
    <div className="py-5">
      <h1 className="text-start text-2xl font-bold">Ultimas Notícias</h1>

      <News_Selector API_KEY={API_KEY} BASE_URL={BASE_URL} />

    </div>
  );
}
