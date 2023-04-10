import React from 'react';
import { Person } from '@/types';
import { getPerson, getPersons } from '@/utils/getPersons';
import { Button, Flex, Autocomplete, AutocompleteItem } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const inputFieldStyle = {
  ['.mantine-InputWrapper-root']: {
    flexGrow: 2,
  },
};

const buttonStyle = {
  marginTop: '24.8px',
};

interface CollaborationsSearchProps {
  onSearchExternalHandler?: (name1Id: number, name2Id: number) => void;
}

interface FormValues {
  name1: string;
  name2: string;
}

interface AutocompleteItemPlus extends AutocompleteItem {
  id: number;
}

interface PersonsState {
  name1Suggestions?: AutocompleteItem[];
  name2Suggestions?: AutocompleteItem[];
}

export default function CollaborationsSearch({
  onSearchExternalHandler,
}: CollaborationsSearchProps) {
  const [persons, setPersons] = useState<PersonsState>();
  // Initiate form values and validation
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

  /* 
    This function validates form field values by calling the api,
    returned person objects are used to get the movie list
  */
  const onSubmitHandler = (values: FormValues) => {
    const fetchPersons = async () => {
      const data = await getPersons(values.name1, values.name2);

      if (onSearchExternalHandler) {
        await onSearchExternalHandler(data.name1.id, data.name2.id);
      }
    };

    fetchPersons().catch(console.error);
  };

  /* 
    This function is called on the form field change 
    and calls the api to get the person list. To reduce the number of api calls,
    the function is debounced by 200ms.  
  */
  const onChangeHandler = useDebouncedCallback((value: string, key: string) => {
    if (!value) {
      return;
    }

    const fetchPerson = async () => {
      const data = await getPerson(value);

      // Create an AutoCompleteItem array from the Person array
      setPersons({
        ...persons,
        [`${key}Suggestions`]: data.map((person: Person) => ({
          value: person.name,
          id: person.id,
        })),
      });
    };

    fetchPerson().catch(console.error);
  }, 200);

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
