import { Movie } from '@/types';
import CollaborationsResultsItem from '@/components/CollaborationResultsItem/CollaborationResultsItem';
import { config } from '@/config';
import { useEffect, useState } from 'react';

interface CollaborationsSearchResultsProps {
  movies: Movie[];
}

interface ApiConfigResponse {
  images: {
    secure_base_url: string;
    poster_sizes: string[];
  };
}

// TODO: Store in global state
export const getApiConfig = async (): Promise<ApiConfigResponse> => {
  const response = await fetch(`${config.apiUrl}/configuration`, {
    method: 'GET',
    headers: {
      Authorization: config.apiToken,
    },
  });
  const data = await response.json();
  return data;
};

// export const getStaticResourceUrl = async (path: string) => {
//   const {images: {secure_base_url, poster_sizes}} = await getApiConfig();
//   const size = poster_sizes[poster_sizes.length - 1];
//   return `${secure_base_url}${size}${path}`;
// };

export default function CollaborationSearchResults({
  movies,
}: CollaborationsSearchResultsProps) {
  const [staticResourcePath, setStaticResourcePath] = useState('');
  useEffect(() => {
    // Get API configuration
    const fetchApiConfig = async () => {
      const {
        images: { secure_base_url, poster_sizes },
      } = await getApiConfig();
      const size = poster_sizes[poster_sizes.length - 1];
      setStaticResourcePath(`${secure_base_url}${size}`);
    };

    fetchApiConfig().catch(console.error);
  }, [movies.length]);

  return (
    <>
      {movies.map((movie: Movie) => {
        movie.poster_path = `${staticResourcePath}${movie.poster_path}`;
        return <CollaborationsResultsItem {...movie} key={movie.id} />;
      })}
    </>
  );
}
