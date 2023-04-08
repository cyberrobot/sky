import {
  Button,
  Container,
  Flex,
  MantineProvider,
  TextInput,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { config } from './config';

export interface Movie {
  id: number;
  original_title: string;
}

export const getPerson = async (name1: string, name2: string) => {
  // Persons lookup
  const res = {
    name1: await fetch(
      `${config.apiUrl}/search/person?language=en-US&query=${name1}&page=1&include_adult=false`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.apiToken,
        },
      }
    ),
    name2: await fetch(
      `${config.apiUrl}/search/person?language=en-US&query=${name2}&page=1&include_adult=false`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.apiToken,
        },
      }
    ),
  };
  const data = {
    name1: await res.name1.json(),
    name2: await res.name2.json(),
  };

  return {
    name1: data.name1.results[0],
    name2: data.name2.results[0],
  };
};

export const getMovies = async (actor1Id: number, actor2Id: number) => {
  // Movies lookup
  const res = await fetch(
    `${config.apiUrl}/discover/movie?language=en-US&with_cast=${actor1Id},${actor2Id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.apiToken,
      },
    }
  );
  const data = await res.json();

  return data.results;
};

function uniq(a: Movie[]) {
  let seen: Record<number, boolean> = {};
  return a.filter((item) =>
    seen.hasOwnProperty(item.id) ? false : (seen[item.id] = true)
  ) as [];
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState({
    name1: '',
    name2: '',
  });
  const [persons, setPersons] = useState({
    name1: [],
    name2: [],
  });
  const [movies, setMovies] = useState([]);

  const onClickHandler = () => {
    const fetchPersons = async () => {
      const data = await getPerson(searchTerm.name1, searchTerm.name2);
      setPersons({
        name1: data.name1,
        name2: data.name2,
      });

      const fetchMovies = async () => {
        const movies = await getMovies(data.name1.id, data.name2.id);
        // const uniqueMovies = uniq([].concat(...movies));
        setMovies(movies);
      };

      fetchMovies().catch(console.error);
    };

    fetchPersons().catch(console.error);
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container>
        <h1>Search movies</h1>
        <Flex gap="md" direction="row" wrap="wrap" align="end">
          <TextInput
            label="Name 1"
            value={searchTerm.name1}
            onChange={(event) =>
              setSearchTerm({
                ...searchTerm,
                name1: event.currentTarget.value,
              })
            }
            placeholder={'Type actor\'s name, for example "Al Pacino"'}
          />
          <span
            style={{
              lineHeight: '36px',
            }}
          >
            and
          </span>
          <TextInput
            label="Name 2"
            value={searchTerm.name2}
            onChange={(event) =>
              setSearchTerm({
                ...searchTerm,
                name2: event.currentTarget.value,
              })
            }
            placeholder={'Type actor\'s name, for example "Al Pacino"'}
          />
          <Button
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
            onClick={onClickHandler}
          >
            Search
          </Button>
        </Flex>
        {/* persons:{' '}
        {persons.map((person: any) => (
          <div key={person.id}>{person.name}</div>
        ))} */}
        movies:{' '}
        {movies.map((movie: any) => (
          <div key={movie.id}>{movie.original_title}</div>
        ))}
      </Container>
    </MantineProvider>
  );
}
