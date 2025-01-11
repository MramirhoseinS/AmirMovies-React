import { imgURL } from "../../api/apiConfig";
import MovieTab from "../movieData/MovieTab";
import SocailMovie from "../socialMovie/SocialMovie";
import { useMovieDB } from "../hooks/useMovieDB";
import { useParams } from "react-router-dom";
import MetaData from "../MetaData";

interface IDataPerson {
  name: string;
  biography: string;
  birthday: string;
  deathday?: string;
  profile_path: string;
}

const moviePerson = [
  { name: "Movie", path: "movie_credits" },
  { name: "Tv Shows", path: "tv_credits" },
];

const Person = () => {
  const { id } = useParams();
  const [data, loading, error] = useMovieDB<IDataPerson>(
    { endpoint: `/person/${id}` },
    {
      name: "",
      biography: "",
      birthday: "",
      deathday: "",
      profile_path: "",
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
          <div className="mb-5 text-4xl text-slate-200">Person id Invalid!</div>
        </div>
      </>
    );
  }
  return (
    <>
      <MetaData
        title={`${data.name}`}
        description={`${data.biography.slice(0, 150)} ...`}
        Odescription={`${data.biography}`}
        url={`/person/${id}`}
        images={[`${data.profile_path}`]}
      />
      <div className="container mx-auto">
        <div className="md:flex gap-10">
          <img
            className="rounded-xl mx-auto w-auto h-[450px] md:h-[370px] lg:h-[450px]"
            src={imgURL(data.profile_path, "w500")}
            alt={data.name}
          />
          <div className="mt-5">
            <div>
              <div className="flex justify-center gap-3 md:justify-normal md:gap-5 items-baseline">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {data.name}
                </h1>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-300">
                  {data.birthday.slice(0, 4)} {data.deathday && "-"}{" "}
                  {data.deathday?.slice(0, 4)}
                </h3>
              </div>
            </div>
            <div className="md:flex justify-center md:justify-normal gap-1 items-center mt-5">
              <div className="flex gap-1 justify-center text-slate-300">
                <span>Birthday:</span>
                {data.birthday.split("-").reverse().join("/")}
                {data.deathday && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span>Deathday:</span>
                    {data.deathday.split("-").reverse().join("/")}
                  </>
                )}
              </div>
              <div className="flex justify-center mt-5 md:mt-auto">
                <SocailMovie />
              </div>
            </div>
            <div>
              <div className="flex gap-3 justify-center md:justify-normal items-baseline mt-5">
                <ul className="flex gap-2"></ul>
              </div>
            </div>
            <div className="mt-5 text-center md:text-left">
              <h4 className="text-2xl font-bold mb-2">Biography</h4>
              <p className="overflow-auto w-full h-60">{data.biography}</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div>
            <MovieTab list={moviePerson} name="Known For" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Person;
