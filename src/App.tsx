import { Container, MantineProvider } from '@mantine/core';
import { useState } from 'react';
import { getMovies } from '@/utils/getMovies';
import CollaborationsSearch from './components/CollaborationsSearch/CollaborationsSearch';
import CollaborationSearchResults from './components/CollaborationsSearchResults/CollaborationsSearchResults';

export default function App() {
  const [movies, setMovies] = useState([]);

  const onSearchHandler = async (name1Id: number, name2Id: number) => {
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
        <CollaborationSearchResults movies={movies} />
      </Container>
    </MantineProvider>
  );
}
