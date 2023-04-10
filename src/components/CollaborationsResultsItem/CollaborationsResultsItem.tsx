import { StarSymbol } from '@/Icons/StarSymbol/StarSymbol';
import { Movie } from '@/types';
import { getYearFromDate } from '@/utils/date/getYearFromDate';
import { Flex, Image } from '@mantine/core';
import Ratings from '../Ratings';

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
          <Ratings
            voteAverage={movie.vote_average}
            voteCount={movie.vote_count}
          />
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
