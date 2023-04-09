import { Movie } from '@/types';
import CollaborationsResultsItem from '@/components/CollaborationResultsItem/CollaborationResultsItem';
import { useEffect, useState } from 'react';
import { getApiConfig } from '@/utils/getApiConfig';

interface CollaborationsSearchResultsProps {
  movies: Movie[];
}

export default function CollaborationSearchResults({
  movies,
}: CollaborationsSearchResultsProps) {
  const [staticResourcePath, setStaticResourcePath] = useState('');

  useEffect(() => {
    // TODO: Call once and store in global state
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
