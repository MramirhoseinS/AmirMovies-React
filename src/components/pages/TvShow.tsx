import MovieTab from "../movieData/MovieTab";
import ForwardButton from "../button/ForwardButton";
import MovieCard from "../movieData/MovieCard";
import Pagination from "../pagination/Pagination";
import { useMovieDB } from "../hooks/useMovieDB";
import { useParams } from "react-router-dom";
import MetaData from "../MetaData";

const tvForPage = [
  { name: "Airing Today", path: "airing_today" },
  { name: "On The Air", path: "on_the_air" },
  { name: "Popular", path: "popular" },
  { name: "Top Rated", path: "top_rated" },
];

interface IDataTv {
  results: {
    id: number;
    name: string;
    title: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
  }[];
  total_results: number;
}

const trend = [
  { name: "Day", path: "day" },
  { name: "Week", path: "week" },
];

const tvAiringToday = [{ name: "", path: "airing_today" }];
const tvOnTheAir = [{ name: "", path: "on_the_air" }];
const tvPopular = [{ name: "", path: "popular" }];
const tvTopRated = [{ name: "", path: "top_rated" }];

const TvShow = () => {
  const { id, page } = useParams<{ id: string; page: string }>();

  if (id) {
    const [data, loading] = useMovieDB<IDataTv>(
      {
        endpoint: `/tv/${id}`,
        params: {
          page: Number(page),
        },
      },
      { results: [], total_results: 0 }
    );
    if (loading) {
      return (
        <>
          <MetaData title="Loading" description="" />
          <div className="container mx-auto">
            <h1 className="text-slate-200 text-4xl mb-5">
              {tvForPage.find((item) => item.path === id)?.name} Tv Shows
            </h1>
            <div className="mb-5 text-4xl text-slate-200">Loading ...</div>
            <Pagination
              total={data.total_results}
              page={Number(page)}
              path={`/tvshow/${id}`}
            />
          </div>
        </>
      );
    }
    if (!data.results.length) {
      return (
        <>
          <MetaData title="Not Found" description="The page does not exist" />
          <div className="container mx-auto">
            <div className="mb-5 text-4xl text-slate-200">Title Invalid!</div>
          </div>
        </>
      );
    }
    return (
      <>
        <MetaData
          title={`${tvForPage.find((item) => item.path === id)?.name} Tv Shows`}
          description={`Discover the ${
            tvForPage.find((item) => item.path === id)?.name
          } Tv Shows on AmirMovies`}
          url={`/tvshow/${id}/${page}`}
          images={[`${data.results[0].backdrop_path}`]}
        />
        <div className="container mx-auto">
          <h1 className="text-slate-200 text-4xl mb-5">
            {tvForPage.find((item) => item.path === id)?.name} Tv Shows
          </h1>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
            {data.results.map((tv) => (
              <li key={tv.id}>
                <MovieCard movie={tv} />
              </li>
            ))}
          </ul>
          <Pagination
            total={data.total_results}
            page={Number(page)}
            path={`/tvshow/${id}`}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container mx-auto">
        <div>
          <MovieTab basePath="/trending/tv" list={trend} name="Trending" />
        </div>
        <div className="mt-10">
          <MovieTab basePath="/tv" list={tvAiringToday} name="Airing Today" />
          <div className="flex justify-end mt-2">
            <ForwardButton name="More" link="/tvshow/airing_today/1" />
          </div>
        </div>
        <div className="mt-5">
          <MovieTab basePath="/tv" list={tvOnTheAir} name="On The Air" />
          <div className="flex justify-end mt-2">
            <ForwardButton name="More" link="/tvshow/on_the_air/1" />
          </div>
        </div>
        <div className="mt-5">
          <MovieTab basePath="/tv" list={tvPopular} name="Popular" />
          <div className="flex justify-end mt-2">
            <ForwardButton name="More" link="/tvshow/popular/1" />
          </div>
        </div>
        <div className="mt-5">
          <MovieTab basePath="/tv" list={tvTopRated} name="Top Rated" />
          <div className="flex justify-end mt-2">
            <ForwardButton name="More" link="/tvshow/top_rated/1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TvShow;
