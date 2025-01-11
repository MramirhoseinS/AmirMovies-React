import ForwardButton from "../button/ForwardButton";
import PersonTab from "../personData/PersonTab";
import Pagination from "../pagination/Pagination";
import PersonCard from "../personData/PersonCard";
import { useMovieDB } from "../hooks/useMovieDB";
import { useParams } from "react-router-dom";
import MetaData from "../MetaData";

const personForPage = [{ name: "Popular", path: "popular" }];

interface IDataPeople {
  results: {
    id: number;
    name: string;
    biography: string;
    known_for_department: string;
    profile_path: string;
  }[];
  total_results: number;
}

const trend = [
  { name: "Day", path: "day" },
  { name: "Week", path: "week" },
];

const personPopular = [{ name: "", path: "popular" }];

const People = () => {
  const { id, page } = useParams<{ id: string; page: string }>();

  if (id) {
    const [data, loading] = useMovieDB<IDataPeople>(
      {
        endpoint: `/person/${id}`,
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
              {personForPage.find((item) => item.path === id)?.name} People
            </h1>
            <div className="mb-5 text-4xl text-slate-200">Loading ...</div>
            <Pagination
              total={data.total_results}
              page={Number(page)}
              path={`/people/${id}`}
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
          title={`${personForPage.find((item) => item.path === id)?.name} People`}
          description={`Discover the ${
            personForPage.find((item) => item.path === id)?.name
          } People on AmirMovies`}
          url={`/people/${id}/${page}`}
          images={[`${data.results[0].profile_path}`]}
        />
        <div className="container mx-auto">
          <h1 className="text-slate-200 text-4xl mb-5">
            {personForPage.find((item) => item.path === id)?.name} People
          </h1>
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
            {data.results.map((person) => (
              <li key={person.id}>
                <PersonCard person={person} />
              </li>
            ))}
          </ul>
          <Pagination
            total={data.total_results}
            page={Number(page)}
            path={`/people/${id}`}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <MetaData
        title="People"
        description="Explore a wide collection of People on AmirMovies."
        url="/people"
      />
      <div className="container mx-auto">
        <div>
          <PersonTab basePath="/trending/person" list={trend} name="Trending" />
        </div>
        <div className="mt-10">
          <PersonTab basePath="/person" list={personPopular} name="Popular" />
          <div className="flex justify-end mt-2">
            <ForwardButton name="More" link="/people/popular/1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default People;
