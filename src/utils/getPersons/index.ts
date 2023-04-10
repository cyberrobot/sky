import { config } from '@/config';
import { Person } from '@/types';
import { uniqObjByKey } from '../data/uniq';

export const getPersons = async (name1: string, name2: string) => {
  // Persons lookup
  const data = {
    name1: await getPerson(name1),
    name2: await getPerson(name2),
  };

  return {
    name1: data.name1[0],
    name2: data.name2[0],
  };
};

export async function getPerson(name: string): Promise<Person[]> {
  const res = await fetch(
    `${config.apiUrl}/search/person?language=en-US&query=${name}&page=1&include_adult=false`
  );

  const data = await res.json();

  // Sanitize data by remove duplicates
  return uniqObjByKey(data.results, 'name');
}
