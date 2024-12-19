import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
import {
  CrownStar,
  MedalRibbon,
  MedalRibbonsStar,
  MedalRibbonStar,
  MedalStar,
  MedalStarCircle,
  MedalStarSquare,
} from 'solar-icon-set';
import { Neuron } from './icons';

interface GradeType {
  text: string;
  color: string;
  icon: React.JSX.Element;
  badgeIcon: React.JSX.Element;
}

const grades = {
  600: {
    text: 'Legend',
    color: '#E5AF19',
    icon: <CrownStar iconStyle="Bold" color="#E5AF19" size={24} />,
    badgeIcon: <CrownStar iconStyle="Bold" size={20} />,
  },
  500: {
    text: 'Grandmasters',
    color: '#FFA947',
    icon: <MedalStar iconStyle="Bold" color="#FFA947" size={24} />,
    badgeIcon: <MedalStar iconStyle="Bold" color="gray.0" size={20} />,
  },
  400: {
    text: 'Master',
    color: '#F56788',
    icon: <MedalStarSquare iconStyle="Bold" color="#F56788" size={24} />,
    badgeIcon: <MedalStarSquare iconStyle="Bold" color="gray.0" size={20} />,
  },
  300: {
    text: 'Expert',
    color: '#7B60F2',
    icon: <MedalStarCircle iconStyle="Bold" color="#7B60F2" size={24} />,
    badgeIcon: <MedalStarCircle iconStyle="Bold" color="gray.0" size={20} />,
  },
  200: {
    text: 'Student',
    color: '#4A92FF',
    icon: <MedalRibbonsStar iconStyle="Bold" color="#4A92FF" size={24} />,
    badgeIcon: <MedalRibbonsStar iconStyle="Bold" color="gray.0" size={20} />,
  },
  100: {
    text: 'Beginner',
    color: '#14BFCC',
    icon: <MedalRibbonStar iconStyle="Bold" color="#14BFCC" size={24} />,
    badgeIcon: <MedalRibbonStar iconStyle="Bold" color="gray.0" size={20} />,
  },
  0: {
    text: 'Trainee',
    color: '#00BD89',
    icon: <MedalRibbon iconStyle="Bold" color="#00BD89" size={24} />,
    badgeIcon: <MedalRibbon iconStyle="Bold" color="gray.0" size={20} />,
  },
};

export const getGrade = (count: number) => {
  const key = parseInt(
    Object.keys(grades)
      .reverse()
      .find((key) => parseInt(key) <= count),
  );

  return grades[key as keyof typeof grades];
};

export const GradeBadge = ({
  grade,
  neuronCount,
}: {
  grade: GradeType;
  neuronCount: number;
}) => {
  return (
    <HStack
      padding="2px"
      gap="4px"
      h="34px"
      border="1px solid"
      borderColor={grade?.color}
      borderRadius="18px"
    >
      <HStack
        p="4px"
        gap="4px"
        bg={grade?.color}
        borderRadius="16px"
        h="30px"
        alignItems="center"
      >
        <Text fontSize="md" fontWeight={600} color="gray.0">
          {grade?.text}
        </Text>
        {grade?.badgeIcon}
      </HStack>

      <HStack mr="10px" ml="6px" alignItems="center" gap="4px">
        <Text fontSize="lg" fontWeight={800} color={grade?.color}>
          {neuronCount}
        </Text>
        <Neuron color={grade?.color} />
      </HStack>
    </HStack>
  );
};
