import { Box, SkeletonText, useColorModeValue } from '@chakra-ui/react';

const CardSkeleton = () => {
  const cardBgColor = useColorModeValue('#F2F2F2', '#212322');

  const SkeletonTexts: JSX.Element[] = [];
  const SkeletonCards: JSX.Element[] = [];

  for (let i = 0; i < 4; i++) {
    SkeletonTexts.push(
      <SkeletonText
        endColor='#1F1F1F'
        startColor='#EBEBEB'
        mt='8'
        noOfLines={1}
        key={i}
      />
    );
  }
  for (let i = 0; i < 3; i++) {
    SkeletonCards.push(
      <Box
        bg={cardBgColor}
        rounded='3xl'
        w={['100%', '44%', '400px']}
        m={['3', '3', '5']}
        h={['xs', 'md', 'xs']}
        p='8'
        key={i}
      >
        <SkeletonText
          endColor='#1F1F1F'
          startColor='#EBEBEB'
          noOfLines={1}
        />
        <SkeletonText
          endColor='#1F1F1F'
          startColor='#EBEBEB'
          mt='14'
          noOfLines={1}
        />
        {SkeletonTexts}
      </Box>
    );
  }

  return <>{SkeletonCards}</>;
};

export default CardSkeleton;
