import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Home, LearnIcon, ProfileIcon, QuizIcon } from "./Icons";
import Link from "next/link";
import { useRouter } from "next/router";

const routes = [
  {
    id: 0,
    title: "Home",
    href: "/",
    icon: (isActive: boolean) => <Home isActive={isActive} />,
  },
  {
    id: 1,
    href: "/quiz",
    title: "Quiz",
    icon: (isActive: boolean) => <QuizIcon isActive={isActive} />,
  },
  {
    id: 2,
    href: "/learn",
    title: "Learn",
    icon: (isActive: boolean) => <LearnIcon isActive={isActive} />,
  },
  {
    id: 3,
    href: "/profile",
    title: "Profile",
    icon: (isActive: boolean) => <ProfileIcon isActive={isActive} />,
  },
];

export const BottomNavbar = () => {
  const router = useRouter();

  return (
    <HStack
      height="90px"
      width="full"
      maxWidth="380px"
      gap="8px"
      padding="8px"
      borderRadius="16px"
      justifyContent="space-around"
      alignItems="center"
      bg="glassBackground"
      position="fixed"
      bottom="12px"
      zIndex="sticky"
    >
      {routes.map((route) => {
        const isActive = router.pathname === route.href;

        return (
          <Link href={route.href}>
            <VStack key={route.id}>
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
                    bottom="10px"
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
  );
};
