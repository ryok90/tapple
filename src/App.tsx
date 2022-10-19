import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState, useTransition } from 'react';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

type LetterCardProps = {
  letter: string;
  onClick: () => void;
  clicked: boolean;
};

const LetterCard = ({ letter, onClick, clicked }: LetterCardProps) => {
  return (
    <AspectRatio
      m={{ base: 1.5, md: 2, lg: 3 }}
      ratio={5 / 3}
      bgColor={clicked ? 'gray.700' : 'teal.800'}
      borderRadius={10}
      onClick={clicked ? undefined : onClick}
    >
      <Center>
        <Text
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          fontWeight="bold"
        >
          {letter}
        </Text>
      </Center>
    </AspectRatio>
  );
};

function App() {
  const [delay, setDelay] = useState<number>();
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [isPending, startTransition] = useTransition();
  const [clicked, setClicked] = useState<string[]>([]);

  useEffect(() => {
    if (!delay) return;

    const timer = setInterval(() => {
      startTransition(() => {
        setDelay(delay - 1);
      });
    }, 100);

    if (delay === 0) {
      clearInterval(timer);
      setDelay(-1);
    }

    return () => {
      clearInterval(timer);
    };
  }, [delay]);

  return (
    <Box h="100vh" w="100vw" p={5} color={'gray.300'} bgColor={'gray.800'}>
      <HStack mb="5" h="32" alignItems={'center'} justifyContent={'center'}>
        {!delay ? (
          <>
            {delay === 0 && (
              <Badge colorScheme={'red'} variant={'solid'} fontSize="sm">
                You lost!
              </Badge>
            )}
            <Button
              colorScheme={'teal'}
              onClick={() => {
                setClicked([]);
                setDelay(100);
              }}
              size="lg"
            >
              Start{delay === 0 && ' Again'}
            </Button>
          </>
        ) : (
          <Center>
            <CircularProgress
              value={delay}
              color={
                delay > 60 ? 'teal.500' : delay > 30 ? 'yellow.500' : 'red.500'
              }
              size={'8rem'}
              thickness={'0.75rem'}
              trackColor={'gray.300'}
            >
              <CircularProgressLabel fontSize={'2xl'} fontWeight="bold">
                {((delay ?? 0) / 10).toFixed(1)}
              </CircularProgressLabel>
            </CircularProgress>
            <Box>
              <Text
                fontWeight={'bold'}
                fontSize="6xl"
                color={'teal.500'}
              ></Text>
            </Box>
          </Center>
        )}
        <Text></Text>
      </HStack>
      <SimpleGrid columns={{ base: 4, md: 5, lg: 6 }}>
        {alphabet.map((letter) =>
          LetterCard({
            letter,
            clicked: clicked.includes(letter),
            onClick: () => {
              if (!delay) return;
              setDelay(100);
              setClicked((clicked) => [...clicked, letter]);
            },
          })
        )}
      </SimpleGrid>
    </Box>
  );
}

export default App;
