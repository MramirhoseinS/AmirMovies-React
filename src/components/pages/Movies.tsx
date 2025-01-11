import MovieTab from "../movieData/MovieTab";
import ForwardButton from "../button/ForwardButton";
import MovieCard from "../movieData/MovieCard";
import Pagination from "../pagination/Pagination";
import { useMovieDB } from "../hooks/useMovieDB";
import { useParams } from "react-router-dom";
import MetaData from "../MetaData";

const movieForPage = [
  { name: "Now Playing", path: "now_playing" },
  { name: "Popular", path: "popular" },
  { name: "Top Rated", path: "top_rated" },
  { name: "Upcoming", path: "upcoming" },
];

interface IDataMovie {
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
const moviesNowPlaying = [{ name: "", path: "now_playing" }];
const moviesPopular = [{ name: "", path: "popular" }];
const moviesTopRated = [{ name: "", path: "top_rated" }];
const moviesUpcoming = [{ name: "", path: "upcoming" }];

const Movies = () => {
  const { id, page } = useParams<{ id: string; page: string }>();

  if (id) {
    const [data, loading] = useMovieDB<IDataMovie>(
      {
        endpoint: `/movie/${id}`,
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
              {movieForPage.find((item) => item.path === id)?.name} Movies
            </h1>
            <div className="mb-5 text-4xl text-slate-200">Loading ...</div>
            <Pagination
              total={data.total_results}
              page={Number(page)}
              path={`/movies/${id}`}
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
          title={`${movieForPage.find((item) => item.path === id)?.name} Movies`}
          description={`Discover the ${
            movieForPage.find((item) => item.path === id)?.name
          } Movies on AmirMovies`}
          url={`/movies/${id}/${page}`}
          images={[`${data.results[0].backdrop_path}`]}
        />
        <div className="container mx-auto">
          <h1 className="text-slate-200 text-4xl mb-5">
            {movieForPage.find((item) => item.path === id)?.name} Movies
          </h1>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
            {data.results.map((movie) => (
              <li key={movie.id}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
          <Pagination
            total={data.total_results}
            page={Number(page)}
            path={`/movies/${id}`}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <MetaData
        title="Movies"
        description="Explore a wide collection of Movies on AmirMovies."
        url="/movies"
      />
      <div className="container mx-auto">
        <div>
          <MovieTab basePath="/trending/movie" list={trend} name="Trending" />
        </div>
        <div className="mt-10">
          <MovieTab
            basePath="/movie"
            list={moviesNowPlaying}
            name="Now Playing"
          />
          <div className="flex justify-end mt-2">
            <ForwardButton name="More" link="/movies/now_playing/1" />
          </div>
        </div>
        <div className="mt-5">
          <MovieTab basePath="/movie" list={moviesPopular} name="Popular" />
          <div className="flex justify-end mt-2">
            <ForwardButton name="More" link="/movies/popular/1" />
          </div>
        </div>
        <div className="mt-5">
          <MovieTab basePath="/movie" list={moviesTopRated} name="Top Rated" />
          <div className="flex justify-end mt-2">
            <ForwardButton name="More" link="/movies/top_rated/1" />
          </div>
        </div>
        <div className="mt-5">
          <MovieTab basePath="/movie" list={moviesUpcoming} name="Upcoming" />
          <div className="flex justify-end mt-2">
            <ForwardButton name="More" link="/movies/upcoming/1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
