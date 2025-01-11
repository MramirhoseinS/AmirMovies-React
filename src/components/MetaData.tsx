import { Helmet } from "react-helmet";
import { imgURL } from "../api/apiConfig";

interface IMetaData {
  title: string;
  description: string;
  url?: string;
  Otitle?: string;
  Odescription?: string;
  images?: string[];
}

const baseURL = "http://localhost:5173"

const MetaData = ({
  title,
  description,
  url,
  Otitle,
  Odescription,
  images,
}: IMetaData) => {
  return (
    <>
      <Helmet>
        <title>React | {title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${baseURL}${url}`} />
        <meta name="og:title" content={Otitle || title} />
        <meta name="og:url" content={`${baseURL}${url}`} />
        <meta name="og:description" content={Odescription || description} />
        <meta name='og:type' content='website' />
        <meta name='og:site_name' content='AmirMovies' />
        {images?.map((image) => (
          <meta name="og:image" content={imgURL(image, 'w500')} />
        ))}
      </Helmet>
    </>
  );
};

export default MetaData;
