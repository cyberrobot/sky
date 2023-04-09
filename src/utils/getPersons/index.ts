import { config } from '@/config';

export const getPersons = async (name1: string, name2: string) => {
  // Persons lookup
  const res = {
    name1: await fetch(
      `${config.apiUrl}/search/person?language=en-US&query=${name1}&page=1&include_adult=false`,
      {
        method: 'GET',
        headers: {
          Authorization: config.apiToken,
        },
      }
    ),
    name2: await fetch(
      `${config.apiUrl}/search/person?language=en-US&query=${name2}&page=1&include_adult=false`,
      {
        method: 'GET',
        headers: {
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
