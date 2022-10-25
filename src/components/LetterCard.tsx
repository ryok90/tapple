import { AspectRatio, Center, Text } from '@chakra-ui/react';

type LetterCardProps = {
  letter: string;
  onClick: () => void;
  clicked: boolean;
  key: string;
};

export const LetterCard = ({
  letter,
  onClick,
  clicked,
  key,
}: LetterCardProps) => (
  <AspectRatio
    m={{ base: 1.5, md: 2, lg: 3 }}
    ratio={2 / 1}
    bgColor={clicked ? 'gray.700' : 'teal.800'}
    borderRadius={10}
    onClick={clicked ? undefined : onClick}
    key={key}
  >
    <Center>
      <Text fontSize={{ base: 'xl', md: '3xl', lg: '4xl' }} fontWeight="bold">
        {letter}
      </Text>
    </Center>
  </AspectRatio>
);
