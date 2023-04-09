import { getPersons } from '@/utils/getPersons';
import { Button, Flex, TextInput } from '@mantine/core';
import { useForm, isNotEmpty, TransformedValues } from '@mantine/form';
import React, { useState } from 'react';

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

export default function CollaborationsSearch({
  onSearchExternalHandler,
}: CollaborationsSearchProps) {
  const [persons, setPersons] = useState({
    name1: [],
    name2: [],
  });
  const [errorMessage, setErrorMessage] = useState('');
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
      setPersons({
        name1: data.name1,
        name2: data.name2,
      });

      await onSearchExternalHandler(data.name1.id, data.name2.id);
      setErrorMessage('');
    };

    fetchPersons().catch(console.error);
  };

  return (
    <form onSubmit={form.onSubmit(onSubmitHandler)}>
      <Flex
        gap="md"
        direction="row"
        wrap="wrap"
        align="top"
        justify="stretch"
        sx={inputFieldStyle}
      >
        <TextInput
          label="Name 1"
          {...form.getInputProps('name1')}
          placeholder={'Type name, e.g., "Al Pacino"'}
        />
        <span
          style={{
            lineHeight: '36px',
            marginTop: '24.8px',
          }}
        >
          and
        </span>
        <TextInput
          label="Name 2"
          {...form.getInputProps('name2')}
          placeholder={'Type name, e.g., "Robert De Niro"'}
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
      {errorMessage && <div style={errorMessageStyle}>{errorMessage}</div>}
    </form>
  );
}
