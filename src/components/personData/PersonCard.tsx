import { Link } from "react-router-dom";
import { imgURL } from "../../api/apiConfig"; 

interface IDataPerson {
  person: {
    id: number;
    name: string;
    biography: string;
    known_for_department: string;
    profile_path: string;
  };
}

const PersonCard = ({ person }: IDataPerson) => {
  return (
    <>
      <Link to={`/person/${person.id}`}>
        <div className="group/card bg-gray-600 aspect-[2/3] relative rounded-lg overflow-hidden ">
          <img
            src={
              person.profile_path
                ? imgURL(person.profile_path, "w500")
                : "/person.jpg"
            }
            alt={person.name}
            className="h-full w-full group-hover/card:scale-105 transition-all duration-300"
          />
          <div
            className="flex flex-col justify-end 
                absolute bottom-0 left-0 w-full h-full p-2 md:p-4
                bg-gradient-to-t from-[#0f172a78] to-[#0f172a0a]
                opacity-100 group-hover/card:opacity-0 
                transition-all duration-300"
          >
            <h1 className="text-sm md:text-base font-bold">{person.name}</h1>
            <p>
              <span className="text-xs md:text-sm">
                {person.known_for_department}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default PersonCard;
