import {
  Box,
  Button,
  Center,
  HStack,
  Select,
  SimpleGrid,
  Tag,
  VStack,
} from '@chakra-ui/react';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { alphabet, themes } from './cconstants';
import { LetterCard } from './components/LetterCard';
import { Timer } from './components/Timer';
import Sound from 'react-sound';

function App() {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [isPending, startTransition] = useTransition();
  const [clicked, setClicked] = useState<string[]>([]);
  const [gameTimer, setGameTimer] = useState<number>();
  const [themeTimer, setThemeTimer] = useState<number>();
  const [theme, setTheme] = useState<string>();
  const [playBell, setPlayBell] = useState(false);

  const gameOver = useMemo(() => gameTimer === 0, [gameTimer]);
  const gameOn = useMemo(() => Boolean(gameTimer), [gameTimer]);

  const buttonSize = { base: 'xs', sm: 'sm', md: 'md', lg: 'lg' };

  const onClickStart = () => {
    setClicked([]);
    setGameTimer(100);
  };

  const onClickEnd = () => {
    setClicked([]);
    setGameTimer(undefined);
  };

  const onClickLetter = useCallback(
    (letter: string) => {
      return () => {
        if (!gameTimer) return;
        setGameTimer(100);
        if (clicked.length === alphabet.length - 1) return setClicked([]);
        setClicked((clicked) => [...clicked, letter]);
      };
    },
    [gameTimer, clicked.length]
  );

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
    if (gameTimer === 0) return setPlayBell(true);
    if (gameTimer === undefined) return;

    const timer = setInterval(
      () => {
        startTransition(() => {
          setGameTimer(gameTimer - 1);
        });
      },
      gameTimer === 100 ? 500 : 100
    );

    return () => {
      clearInterval(timer);
    };
  }, [gameTimer]);

  return (
    <Center h="100%" w="100%">
      <Sound
        playStatus={gameOn ? 'PLAYING' : 'STOPPED'}
        url="/tapple/assets/ticking-clock.mp3"
        volume={20}
        loop
      />
      <Sound
        playStatus={playBell ? 'PLAYING' : 'STOPPED'}
        onFinishedPlaying={() => setPlayBell(false)}
        url="/tapple/assets/bell-ding.mp3"
        volume={20}
      />
      <Box
        h="100%"
        w="100%"
        maxW="container.xl"
        p={5}
        color={'gray.300'}
        bgColor={'gray.800'}
      >
        <HStack
          mb="4"
          spacing={{ base: 2, sm: 4, md: 10 }}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Button
            colorScheme={'teal'}
            onClick={() => setThemeTimer(20)}
            size={buttonSize}
          >
            Sort Theme
          </Button>
          <VStack spacing={4}>
            <Timer timeLeft={gameTimer === undefined ? 100 : gameTimer} />
          </VStack>
          <VStack spacing={4}>
            {!gameOn ? (
              <Button
                colorScheme={'teal'}
                onClick={onClickStart}
                size={buttonSize}
              >
                Start{gameTimer === 0 && ' Again'}
              </Button>
            ) : (
              <Button
                colorScheme={'orange'}
                onClick={onClickEnd}
                size={buttonSize}
              >
                End round
              </Button>
            )}
            {gameOver && (
              <Center>
                <Tag
                  size={{ base: 'sm', md: 'lg' }}
                  colorScheme={'red'}
                  variant={'solid'}
                  fontWeight="bold"
                >
                  Game Over
                </Tag>
              </Center>
            )}
          </VStack>
        </HStack>
        <Center mb="4">
          <Select
            w={{ base: '40', md: '44' }}
            size={{ base: 'xs', md: 'sm' }}
            bg="teal.900"
            variant={'filled'}
            fontWeight="bold"
            placeholder="Sort or select"
            value={theme}
            disabled={Boolean(themeTimer)}
            onChange={(event) => setTheme(event.currentTarget.value)}
          >
            {themes.map((item, index) => (
              <option value={item} key={item + index}>
                {item}
              </option>
            ))}
          </Select>
        </Center>
        <SimpleGrid columns={{ base: 4, md: 5, lg: 6 }}>
          {alphabet.map((letter, index) =>
            LetterCard({
              key: letter + index,
              letter,
              clicked: clicked.includes(letter),
              onClick: onClickLetter(letter),
            })
          )}
        </SimpleGrid>
      </Box>
    </Center>
  );
}

export default App;
