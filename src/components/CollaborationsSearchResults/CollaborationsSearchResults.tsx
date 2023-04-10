import { Movie } from '@/types';
import CollaborationsResultsItem from '@/components/CollaborationsResultsItem';
import { useApiConfigStore } from '@/stores/useApiConfigStore';

interface CollaborationsSearchResultsProps {
  movies: Movie[];
}

export default function CollaborationSearchResults({
  movies,
}: CollaborationsSearchResultsProps) {
  const apiConfig = useApiConfigStore((state) => state.config);

  return (
    <>
      {movies.map((movie: Movie) => {
        const {
          images: { secure_base_url, poster_sizes },
        } = apiConfig;
        const size = poster_sizes[poster_sizes.length - 1];
        const staticResourcePath = `${secure_base_url}${size}`;
        movie.poster_path = `${staticResourcePath}${movie.poster_path}`;
        return <CollaborationsResultsItem {...movie} key={movie.id} />;
      })}
    </>
  );
}
