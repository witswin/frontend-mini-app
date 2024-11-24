import { useAuth } from '@/hooks/useAuthorization';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  HomeAngle2,
  NotebookMinimalistic,
  SliderVertical,
  User,
} from 'solar-icon-set';

export const BottomNavbar = () => {
  const router = useRouter();
  const authInfo = useAuth();

  const routes = [
    {
      id: 0,
      title: 'Home',
      href: '/',
      icon: (isActive: boolean) => (
        <HomeAngle2
          color={
            isActive
              ? 'var(--chakra-colors-blue)'
              : 'var(--chakra-colors-gray-0)'
          }
          iconStyle={isActive ? 'Bold' : 'BoldDuotone'}
          size={24}
        />
      ),
    },
    {
      id: 1,
      href: '/quiz',
      title: 'Quiz',
      icon: (isActive: boolean) => (
        <SliderVertical
          color={
            isActive
              ? 'var(--chakra-colors-blue)'
              : 'var(--chakra-colors-gray-0)'
          }
          iconStyle={isActive ? 'Bold' : 'BoldDuotone'}
          size={24}
        />
      ),
    },
    {
      id: 2,
      href: '/learn',
      title: 'Learn',
      icon: (isActive: boolean) => (
        <Box
          sx={{
            path: {
              fill: isActive
                ? 'var(--chakra-colors-blue)'
                : 'var(--chakra-colors-gray-0)',
            },
          }}
          color={
            isActive
              ? 'var(--chakra-colors-blue)'
              : 'var(--chakra-colors-gray-0)'
          }
          as={NotebookMinimalistic}
          iconStyle={isActive ? 'Bold' : 'BoldDuotone'}
          size={24}
        />
      ),
    },
    {
      id: 3,
      href: `/profile/${authInfo?.pk}`,
      title: 'Profile',
      icon: (isActive: boolean) => (
        <User
          color={
            isActive
              ? 'var(--chakra-colors-blue)'
              : 'var(--chakra-colors-gray-0)'
          }
          iconStyle={isActive ? 'Bold' : 'BoldDuotone'}
          size={24}
        />
      ),
    },
  ];

  return (
    <Box
      position="fixed"
      zIndex="sticky"
      bottom="0"
      maxWidth="538px"
      left="50%"
      transform="translateX(-50%)"
      background="linear-gradient(2.73deg, #111125 23.73%, rgba(17, 17, 37, 0.4) 60.91%, rgba(17, 17, 37, 0) 97.72%)"
      width="full"
      py="16px"
    >
      <HStack
        backdropFilter="blur(40px)"
        height="90px"
        width="calc(100% - 32px)"
        maxWidth="506px"
        gap="8px"
        borderRadius="16px"
        justifyContent="space-around"
        alignItems="center"
        bg="glassBackground"
        mx="auto"
      >
        {routes.map((route) => {
          const basePath = router.asPath.split(/[?#]/)[0];

          const isActive = basePath === route.href;

          return (
            <Link href={route.href} key={route.id}>
              <VStack>
                {route.icon(isActive)}

                {isActive ? (
                  <>
                    <Text
                      bgGradient="var(--chakra-colors-primaryLinear)"
                      fontWeight="600"
                      bgClip="text"
                    >
                      {route.title}
                    </Text>

                    <Box
                      position="absolute"
                      bottom="8px"
                      boxShadow="0px 4px 10px var(--chakra-colors-cyan)"
                      width="24px"
                      h="3px"
                      bgGradient="var(--chakra-colors-primaryRadial)"
                      borderTopRadius="4px"
                      borderBottomRadius="1px"
                    />
                  </>
                ) : (
                  <Text color="gray.40" fontSize="sm" fontWeight="600">
                    {route.title}
                  </Text>
                )}
              </VStack>
            </Link>
          );
        })}
      </HStack>
    </Box>
  );
};
