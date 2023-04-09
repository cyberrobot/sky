import { getPersons } from '@/utils/getPersons';
import { Button, Flex, TextInput } from '@mantine/core';
import React, { useState } from 'react';

const inputFieldStyle = {
  ['.mantine-TextInput-wrapper']: {
    width: '300px',
  },
};

const errorMessageStyle = {
  marginTop: '10px', // Better use styled-components and access MantineProvider theme
  color: 'red',
};

interface CollaborationsSearchProps {
  onSearchExternalHandler: (name1Id: number, name2Id: number) => void;
}

export default function CollaborationsSearch({
  onSearchExternalHandler,
}: CollaborationsSearchProps) {
  const [searchTerm, setSearchTerm] = useState({
    name1: '',
    name2: '',
  });
  const [persons, setPersons] = useState({
    name1: [],
    name2: [],
  });
  const [errorMessage, setErrorMessage] = useState('');

  const onClickHandler = () => {
    if (!searchTerm.name1 || !searchTerm.name2) {
      setErrorMessage('Please enter both names');
      return;
    }

    const fetchPersons = async () => {
      const data = await getPersons(searchTerm.name1, searchTerm.name2);
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
    <>
      <Flex gap="md" direction="row" wrap="wrap" align="end">
        <TextInput
          label="Name 1"
          value={searchTerm.name1}
          onChange={(event) =>
            setSearchTerm({
              ...searchTerm,
              name1: event.currentTarget.value,
            })
          }
          placeholder={'Type name, e.g., "Al Pacino"'}
          sx={inputFieldStyle}
        />
        <span
          style={{
            lineHeight: '36px',
          }}
        >
          and
        </span>
        <TextInput
          label="Name 2"
          value={searchTerm.name2}
          onChange={(event) =>
            setSearchTerm({
              ...searchTerm,
              name2: event.currentTarget.value,
            })
          }
          placeholder={'Type name, e.g., "Robert De Niro"'}
          sx={inputFieldStyle}
        />
        <Button
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan' }}
          onClick={onClickHandler}
        >
          Search
        </Button>
      </Flex>
      {errorMessage && <div style={errorMessageStyle}>{errorMessage}</div>}
    </>
  );
}
