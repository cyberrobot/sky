import { useApiConfigStore } from '@/stores/useApiConfigStore';
import { Person } from '@/types';
import { getPerson, getPersons } from '@/utils/getPersons';
import {
  Button,
  Flex,
  Autocomplete,
  AutocompleteItem,
  Image,
} from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import { forwardRef, useState } from 'react';

const inputFieldStyle = {
  ['.mantine-InputWrapper-root']: {
    flexGrow: 2,
  },
};

const errorMessageStyle = {
  marginTop: '10px',
  color: 'red',
};

const buttonStyle = {
  marginTop: '24.8px',
};

interface CollaborationsSearchProps {
  onSearchExternalHandler: (name1Id: number, name2Id: number) => void;
}

interface FormValues {
  name1: string;
  name2: string;
}

interface AutocompleteItemPlus extends AutocompleteItem {
  id: number;
}

interface PersonsState {
  name1?: Person;
  name2?: Person;
  name1Suggestions?: AutocompleteItem[];
  name2Suggestions?: AutocompleteItem[];
}

export default function CollaborationsSearch({
  onSearchExternalHandler,
}: CollaborationsSearchProps) {
  const [persons, setPersons] = useState<PersonsState>();
  const form = useForm({
    initialValues: {
      name1: '',
      name2: '',
    },
    validate: {
      name1: isNotEmpty('Please enter Name 1'),
      name2: isNotEmpty('Please enter Name 2'),
    },
  });

  const onSubmitHandler = (values: FormValues) => {
    const fetchPersons = async () => {
      const data = await getPersons(values.name1, values.name2);

      await onSearchExternalHandler(data.name1.id, data.name2.id);
    };

    fetchPersons().catch(console.error);
    setPersons({});
  };

  const onChangeHandler = (value: string, key: string) => {
    if (!value || value.length < 2) {
      return;
    }

    const fetchPerson = async () => {
      const data = await getPerson(value);

      setPersons({
        ...persons,
        [`${key}Suggestions`]: data.map((person: Person) => ({
          value: person.name,
          id: person.id,
        })),
      });
    };

    fetchPerson().catch(console.error);
  };

  return (
    <form
      onSubmit={form.onSubmit(onSubmitHandler)}
      style={{
        marginBottom: '20px',
      }}
    >
      <Flex
        gap="md"
        direction="row"
        wrap="wrap"
        align="top"
        justify="stretch"
        sx={inputFieldStyle}
      >
        <Autocomplete
          label="Name 1"
          {...form.getInputProps('name1')}
          placeholder={'Type name, e.g., "Al Pacino"'}
          onChange={(value) => {
            form.setFieldValue('name1', value);
            onChangeHandler(value, 'name1');
          }}
          onItemSubmit={(item: AutocompleteItemPlus) => {
            form.setFieldValue('name1', item.value);
            setPersons({
              ...persons,
              name1: {
                id: item.id,
                name: item.value,
              },
            });
          }}
          data={persons?.name1Suggestions || []}
        />
        <span
          style={{
            lineHeight: '36px',
            marginTop: '24.8px',
          }}
        >
          and
        </span>
        <Autocomplete
          label="Name 2"
          {...form.getInputProps('name2')}
          placeholder={'Type name, e.g., "Robert De Niro"'}
          onChange={(value) => {
            form.setFieldValue('name2', value);
            onChangeHandler(value, 'name2');
          }}
          onItemSubmit={(item: AutocompleteItemPlus) => {
            form.setFieldValue('name2', item.value);
            setPersons({
              ...persons,
              name2: {
                id: item.id,
                name: item.value,
              },
            });
          }}
          data={persons?.name2Suggestions || []}
        />
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          type="submit"
          sx={buttonStyle}
        >
          Search
        </Button>
      </Flex>
    </form>
  );
}
