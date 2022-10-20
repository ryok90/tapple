import {
  Box,
  Button,
  Center,
  HStack,
  SimpleGrid,
  Tag,
} from '@chakra-ui/react';
import { useEffect, useState, useTransition } from 'react';
import { alphabet, themes } from './cconstants';
import { LetterCard } from './LetterCard';
import { Timer } from './Timer';

function App() {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [isPending, startTransition] = useTransition();
  const [clicked, setClicked] = useState<string[]>([]);
  const [gameTimer, setGameTimer] = useState<number>();
  const [themeTimer, setThemeTimer] = useState<number>();
  const [theme, setTheme] = useState<string>();

  const gameOver = gameTimer === 0;
  const gameOn = Boolean(gameTimer);

  useEffect(() => {
    if (!themeTimer) return;

    const timer = setInterval(() => {
      startTransition(() => {
        setThemeTimer(themeTimer - 1);
        setTheme(themes[Math.floor(Math.random() * themes.length)]);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, [themeTimer]);

  useEffect(() => {
    if (!gameTimer) return;

    const timer = setInterval(
      () => {
        startTransition(() => {
          setGameTimer(gameTimer - 1);
        });
      },
      gameTimer === 100 ? 500 : 100
    );

    if (gameTimer === 0) {
      clearInterval(timer);
      setGameTimer(-1);
    }

    return () => {
      clearInterval(timer);
    };
  }, [gameTimer]);

  return (
    <Box h="100%" w="100%" p={5} color={'gray.300'} bgColor={'gray.800'}>
      <HStack mb="5" h="32" alignItems={'center'} justifyContent={'center'}>
        <HStack spacing="5">
          {gameOver && (
            <Tag
              size="lg"
              colorScheme={'red'}
              variant={'solid'}
              fontWeight="bold"
            >
              You lost!
            </Tag>
          )}
          {gameTimer && <Timer timeLeft={gameTimer} />}
          <Center w="52">
            <Tag
              size="lg"
              colorScheme={themeTimer ? 'yellow' : 'green'}
              variant={'solid'}
              fontWeight="bold"
              onClick={() => setThemeTimer(20)}
            >
              {theme ?? 'Sort a theme'}
            </Tag>
          </Center>
          {!gameOn ? (
            <Button
              colorScheme={'teal'}
              onClick={() => {
                setClicked([]);
                setGameTimer(100);
              }}
              size="lg"
            >
              Start{gameTimer === 0 && ' Again'}
            </Button>
          ) : (
            <Button
              colorScheme={'orange'}
              onClick={() => {
                setClicked([]);
                setGameTimer(undefined);
              }}
              size="lg"
            >
              End round
            </Button>
          )}
        </HStack>
      </HStack>
      <SimpleGrid columns={{ base: 4, md: 5, lg: 6 }}>
        {alphabet.map((letter) =>
          LetterCard({
            letter,
            clicked: clicked.includes(letter),
            onClick: () => {
              if (!gameTimer) return;
              setGameTimer(100);
              setClicked((clicked) => [...clicked, letter]);
            },
          })
        )}
      </SimpleGrid>
    </Box>
  );
}

export default App;
