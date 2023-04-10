import { config } from '@/config';

export const getMovies = async (actor1Id: number, actor2Id: number) => {
  // Movies lookup
  const res = await fetch(
    `${config.apiUrl}/discover/movie?language=en-US&with_cast=${actor1Id},${actor2Id}`
  );
  const data = await res.json();

  return data.results;
};
