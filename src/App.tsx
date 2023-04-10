import { Container, MantineProvider } from '@mantine/core';
import { useEffect, useState } from 'react';
import { getMovies } from '@/utils/getMovies';
import CollaborationsSearch from './components/CollaborationsSearch';
import CollaborationSearchResults from './components/CollaborationsSearchResults';
import { useApiConfigStore } from './stores/useApiConfigStore';
import { registerApiInterceptors } from './config';
import { Movie } from './types';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const setApiConfig = useApiConfigStore((state) => state.setApiConfig);

  useEffect(() => {
    registerApiInterceptors();
    setApiConfig();
  }, []);

  const onSearchHandler = async (name1Id: number, name2Id: number) => {
    if (!name1Id || !name2Id) {
      setMovies([
        {
          id: 0,
          title: 'No results found. Enter valid names.',
          poster_path: '',
          vote_average: 0,
          vote_count: 0,
          overview: '',
          release_date: '',
        },
      ]);
      return;
    }

    const fetchMovies = async () => {
      const movies = await getMovies(name1Id, name2Id);
      setMovies(movies);
    };

    fetchMovies().catch(console.error);
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
        <h1>Collaborations</h1>
        <CollaborationsSearch onSearchExternalHandler={onSearchHandler} />
        {movies[0]?.id !== 0 ? (
          <CollaborationSearchResults movies={movies} />
        ) : (
          <p>{movies[0]?.title}</p>
        )}
      </Container>
    </MantineProvider>
  );
}
