import { StarSymbol } from '@/Icons/StarSymbol/StarSymbol';
import { Movie } from '@/types';
import { Flex } from '@mantine/core';

const getReleaseYear = (releaseDate: string) => {
  return new Date(releaseDate).getFullYear();
};

const sectionStyle = {
  borderBottom: '1px solid #eee',
};

export default function CollaborationsItem(movie: Movie) {
  return (
    <section key={movie.id} style={sectionStyle}>
      <h3>
        {movie.title} ({getReleaseYear(movie.release_date)})
      </h3>
      <Flex align="center">
        <StarSymbol color="yellow" size="md" type="full" />
        <span
          style={{
            fontWeight: 'bold',
            marginLeft: '4px',
          }}
        >
          {movie.vote_average}
        </span>
      </Flex>
      <p>{movie.overview}</p>
    </section>
  );
}
