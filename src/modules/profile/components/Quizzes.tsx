import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import {
  Button,
  HStack,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Sleepy from "@/assets/sleepy.svg";
import Link from "next/link";
// import { useAuth } from "@/hooks/useAuthorization";
// import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/configs/axios";
import { CompletedQuizCard } from "./CompletedQuizCard";
import { Confetti } from "solar-icon-set";

const Completed = () => {
  const isEmpty = false;
  return (
    <VStack w="full" gap="16px" py={isEmpty ? "24px" : "0"}>
      {isEmpty ? (
        <>
          <Image src={Sleepy} alt="sleepy" />
          <Text fontSize="lg" color="gray.80" fontWeight={500}>
            No completed quizzes
          </Text>
        </>
      ) : (
        <>
          <HStack
            w="full"
            borderRadius="10px"
            justifyContent="space-between"
            p="4px 4px 6px 12px"
            bg="rgba(32, 32, 51, 1)"
            position="relative"
            _before={{
              content: "''",
              position: "absolute",
              top: "-1px",
              left: "-1px",
              right: "-1px",
              height: "calc(100% + 2px)",
              width: "calc(100% + 2px)",
              background: "var(--chakra-colors-primaryRadial)",
              zIndex: -1,
              borderRadius: "10px",
            }}
          >
            <HStack>
              <Confetti iconStyle="Bold" color="gray.0" size={24} />
              <Text>Unclaimed prizes available!</Text>
            </HStack>

            <Button size="mini" onClick={() => {}}>
              Claim All
            </Button>
          </HStack>
          <CompletedQuizCard />
        </>
      )}
    </VStack>
  );
};

const Upcoming = () => {
  const isEmpty = true;
  return (
    <VStack w="full" gap="16px" py={isEmpty ? "24px" : "0"}>
      {isEmpty ? (
        <>
          <Image src={Sleepy} alt="sleepy" />
          <Text fontSize="lg" color="gray.80" fontWeight={500}>
            No upcoming quizzes{" "}
          </Text>

          <Button variant="outline" size="md" as={Link} href="/quiz">
            Browse Quizzes
          </Button>
        </>
      ) : (
        <></>
      )}
    </VStack>
  );
};

export const Quizzes = () => {
  // const id = 57;
  // const authInfo = useAuth();
  // const { data } = useQuery({
  //   queryKey: [`user-${id}-competitions`],
  //   queryFn: async () =>
  //     await axiosClient
  //       .get(`/quiz/${id}/competitions/`)
  //       .then((res) => res.data),
  // });
  // console.log(data);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace 'your-api-url' with your actual API endpoint
        const response = await axiosClient.get(`/quiz/${4}/competitions/`);
        setData(response.data); // Update state with data
      } catch (err) {
        console.log(err); // Handle any error
      } finally {
        console.log("competitions data: ");
        console.log(data);
      }
    };

    fetchData();
  }, []);

  return (
    <Card gap="16px">
      <Text fontSize="2xl" fontWeight={700} color="gray.0">
        Quizzes
      </Text>

      <Tabs isFitted w="full" variant="unstyled">
        <TabList h="46px" p="4px" bg="glassBackground" rounded="10px" mb="16px">
          <Tab>Upcoming</Tab>
          <Tab>Completed</Tab>
          <TabIndicator height="38px" bg="blue" rounded="8px" zIndex={-1} />
        </TabList>

        <TabPanels>
          <TabPanel>
            <Upcoming />
          </TabPanel>
          <TabPanel>
            <Completed />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Card>
  );
};
