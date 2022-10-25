import {
  Center,
  CircularProgress,
  CircularProgressLabel,
  useBreakpointValue,
} from '@chakra-ui/react';

export const Timer = ({ timeLeft }: { timeLeft: number }) => {
  const size = useBreakpointValue({ base: '5rem', sm: '8rem' });
  const thickness = useBreakpointValue({ base: '0.5rem', sm: '0.75rem' });

  return (
    <Center>
      <CircularProgress
        value={timeLeft}
        color={
          timeLeft > 60 ? 'teal.500' : timeLeft > 30 ? 'yellow.500' : 'red.500'
        }
        size={size}
        thickness={thickness}
        trackColor={'gray.300'}
      >
        <CircularProgressLabel fontSize={{ base: 'xl', sm: '2xl' }} fontWeight="bold">
          {((timeLeft ?? 0) / 10).toFixed(1)}
        </CircularProgressLabel>
      </CircularProgress>
    </Center>
  );
};
