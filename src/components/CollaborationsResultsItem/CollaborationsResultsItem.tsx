import { StarSymbol } from '@/Icons/StarSymbol/StarSymbol';
import { Movie } from '@/types';
import { getYearFromDate } from '@/utils/date/getYearFromDate';
import { Flex, Image } from '@mantine/core';

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
            {movie.title} ({getYearFromDate(movie.release_date)})
          </h3>
          <Flex align="center">
            <StarSymbol color="yellow" size="md" type="full" />
            <span
              style={{
                marginLeft: '4px',
                marginRight: '8px',
              }}
            >
              {movie.vote_average}
            </span>
            <span
              style={{
                color: '#ccc',
              }}
            >
              |
            </span>
            <span
              style={{
                marginLeft: '8px',
              }}
            >
              Votes: {movie.vote_count}
            </span>
          </Flex>
          <div
            style={{
              marginTop: '8px',
              marginBottom: '8px',
            }}
          >
            {movie.overview}
          </div>
        </div>
      </Flex>
    </section>
  );
}
