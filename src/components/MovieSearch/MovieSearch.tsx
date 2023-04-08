import { TextInput } from '@mantine/core';
import React, { useState } from 'react';

export default function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <TextInput
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.currentTarget.value)}
      placeholder={'Type actor\'s name, for example "Al Pacino"'}
    />
  );
}
