import { Center, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

export const Timer = ({ timeLeft }: { timeLeft: number }) => (
  <Center>
    <CircularProgress
      value={timeLeft}
      color={timeLeft > 60 ? 'teal.500' : timeLeft > 30 ? 'yellow.500' : 'red.500'}
      size={'8rem'}
      thickness={'0.75rem'}
      trackColor={'gray.300'}
    >
      <CircularProgressLabel fontSize={'2xl'} fontWeight="bold">
        {((timeLeft ?? 0) / 10).toFixed(1)}
      </CircularProgressLabel>
    </CircularProgress>
  </Center>
);