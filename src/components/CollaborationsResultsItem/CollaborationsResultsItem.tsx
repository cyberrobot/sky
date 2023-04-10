import { StarSymbol } from '@/Icons/StarSymbol/StarSymbol';
import { Movie } from '@/types';
import { Flex, Image } from '@mantine/core';

const getReleaseYear = (releaseDate: string) => {
  return new Date(releaseDate).getFullYear();
};

const sectionStyle = {
  borderBottom: '1px solid #eee',
  padding: '16px 0',
};

export default function CollaborationsResultsItem(movie: Movie) {
  return (
    <section style={sectionStyle}>
      <Flex direction="row" gap="lg">
        <Image width={140} src={movie.poster_path} alt={movie.title} />
        <div>
          <h3
            style={{
              marginTop: 0,
              marginBottom: '4px',
            }}
          >
            {movie.title} ({getReleaseYear(movie.release_date)})
          </h3>
          <Flex align="center">
            <StarSymbol color="yellow" size="md" type="full" />
            <span
              style={{
                marginLeft: '4px',
              }}
            >
              {movie.vote_average}
            </span>
          </Flex>
          <div
            style={{
              marginTop: '8px',
            }}
          >
            {movie.overview}
          </div>
        </div>
      </Flex>
    </section>
  );
}
