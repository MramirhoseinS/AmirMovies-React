import { imgURL } from "../../api/apiConfig";
import CastList from "../creditsCard/CastList";
import CrewList from "../creditsCard/CrewList";
import MovieTab from "../movieData/MovieTab";
import SocailMovie from "../socialMovie/SocialMovie";
import { useMovieDB } from "../hooks/useMovieDB";
import { Link, useParams } from "react-router-dom";
import MetaData from "../MetaData";

interface IDataMovie {
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
  overview: string;
  tagline: string;
}

const listOtherMovie = [
  { name: "Recommendations", path: "recommendations" },
  { name: "Similar", path: "similar" },
];

const Movie = () => {
  const { id } = useParams();

  const [data, loading, error] = useMovieDB<IDataMovie>(
    { endpoint: `/movie/${id}` },
    {
      title: "",
      poster_path: "",
      backdrop_path: "",
      release_date: "",
      genres: [],
      runtime: 0,
      vote_average: 0,
      overview: "",
      tagline: "",
    }
  );

  if (loading) {
    return (
      <>
        <MetaData title="Loading" description="" />
        <div className="container mx-auto">
          <div className="mb-5 text-4xl text-slate-200">Loading ...</div>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <MetaData title="Not Found" description="The page does not exist" />
        <div className="container mx-auto">
          <div className="mb-5 text-4xl text-slate-200">Movie id Invalid!</div>
        </div>
      </>
    );
  }
  return (
    <>
      <MetaData
        title={`${data.title}`}
        description={`${data.overview.slice(0, 150)} ...`}
        Odescription={`${data.overview}`}
        url={`/movie/${id}`}
        images={[`${data.backdrop_path}`]}
      />
      <div className="container mx-auto">
        <div className="md:flex gap-10">
          <img
            className="rounded-xl mx-auto w-auto h-[450px] md:h-[370px] lg:h-[450px]"
            src={imgURL(data.poster_path, "w500")}
            alt={data.title}
          />
          <div className="mt-5">
            <div>
              <div className="flex justify-center gap-3 md:justify-normal md:gap-5 items-baseline">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {data.title}
                </h1>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-300">
                  {data.release_date.slice(0, 4)}
                </h3>
              </div>
              <p className="text-slate-300 text-center md:text-left italic ml-2">
                {data.tagline}
              </p>
            </div>
            <div className="flex justify-center md:justify-normal gap-3 items-center mt-5">
              <div className="group flex items-center gap-2">
                <div>
                  <svg
                    className="text-yellow-400 group-hover:text-rose-600 transition-all duration-300"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold">
                    {data.vote_average.toString().slice(0, 3)}
                  </span>{" "}
                  / 10
                </div>
              </div>
              <SocailMovie />
            </div>
            <div>
              <div className="hidden lg:flex gap-3 items-baseline mt-5">
                <div className="text-slate-300">
                  {data.release_date.split("-").reverse().join("/")}
                </div>
                <span className="text-slate-300">•</span>
                <ul className="flex gap-2">
                  {data.genres.map((genre, index, { length }) => (
                    <li
                      key={genre.id}
                      className="text-slate-300 hover:text-rose-400 transition-all duration-300"
                    >
                      <Link to={`/genre/${genre.id}/movie/1`}>
                        {genre.name}
                        <span className={`${index === length - 1 && "hidden"}`}>
                          ,
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <span className="text-slate-300">•</span>
                <div className="text-slate-300">{data.runtime} m</div>
              </div>
              <div className="lg:hidden gap-3 items-baseline mt-5">
                <div className="flex justify-center md:justify-normal gap-7 text-slate-300">
                  {data.release_date.split("-").reverse().join("/")}
                  <div className="text-slate-300">{data.runtime} m</div>
                </div>
                <ul className="flex justify-center md:justify-normal gap-2">
                  {data.genres.map((genre, index, { length }) => (
                    <li
                      key={genre.id}
                      className="text-slate-300 hover:text-rose-400 transition-all duration-300"
                    >
                      <Link to={`/genre/${genre.id}/movie/1`}>
                        {genre.name}
                        <span className={`${index === length - 1 && "hidden"}`}>
                          ,
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-5 text-center md:text-left">
              <h4 className="text-2xl font-bold mb-2">Overview</h4>
              <p>{data.overview}</p>
            </div>
            <div className="mt-5 md:mt-10">
              <ul className="grid grid-cols-3 text-center md:text-left">
                <CrewList />
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <div>
            <CastList />
          </div>
          <div>
            <MovieTab list={listOtherMovie} name="More Like This" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;
