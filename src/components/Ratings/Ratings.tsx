import { StarSymbol } from '@/Icons/StarSymbol/StarSymbol';
import { Flex } from '@mantine/core';
import React from 'react';

interface RatingsProps {
  voteAverage: number;
  voteCount?: number;
}

export default function Ratings({ voteAverage, voteCount }: RatingsProps) {
  return (
    <Flex align="center">
      <StarSymbol color="yellow" size="md" type="full" />
      <span
        style={{
          marginLeft: '4px',
          marginRight: '8px',
        }}
      >
        {voteAverage}
      </span>
      {voteCount && (
        <>
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
            Votes: {voteCount}
          </span>
        </>
      )}
    </Flex>
  );
}
