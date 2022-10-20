import { AspectRatio, Center, Text } from '@chakra-ui/react';

type LetterCardProps = {
  letter: string;
  onClick: () => void;
  clicked: boolean;
};

export const LetterCard = ({ letter, onClick, clicked }: LetterCardProps) => (
  <AspectRatio
    m={{ base: 1.5, md: 2, lg: 3 }}
    ratio={2 / 1}
    bgColor={clicked ? 'gray.700' : 'teal.800'}
    borderRadius={10}
    onClick={clicked ? undefined : onClick}
  >
    <Center>
      <Text fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }} fontWeight="bold">
        {letter}
      </Text>
    </Center>
  </AspectRatio>
);
