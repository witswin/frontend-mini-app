import { ColorFullText } from "@/components/ColorFullText"
import { CountDown } from "@/components/CountDown"
import { axiosClient } from "@/configs/axios"
import { quizType } from "@/globalTypes"
import { useAuth } from "@/hooks/useAuthorization"
import {
  Box,
  Divider,
  HStack,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  chakra,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useMemo } from "react"
import { AlarmAdd, UsersGroupTwoRounded, Widget } from "solar-icon-set"

interface HintContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: (args: any) => JSX.Element
  title: string
  description: string
  iconType: string
}
const HintContent = ({
  description,
  icon,
  title,
  iconType,
}: HintContentProps) => (
  <VStack width="full">
    <HStack width="full">
      <Box
        as={icon}
        size={20}
        iconStyle={iconType}
        sx={{
          svg: {
            color: "var(--chakra-colors-blue)",
          },
        }}
      />
      <Text
        fontSize="md"
        background="primaryLinear"
        backgroundClip="text"
        fontWeight="700"
        sx={{ WebkitTextFillColor: "transparent" }}
      >
        {title}
      </Text>
    </HStack>
    <Text
      width="full"
      textAlign="left"
      color="gray.0"
      fontSize="md"
      lineHeight="22px"
    >
      {description}
    </Text>
  </VStack>
)

const Rules = () => {
  const { query } = useRouter()
  const { data } = useQuery<quizType>({
    queryKey: ["quiz", query?.id],
    queryFn: async () =>
      await axiosClient
        .get(`/quiz/competitions/${query?.id}/`)
        .then((res) => res.data),
  })

  return (
    <VStack width="full">
      <Text fontSize="md" fontWeight="bold" width="full">
        📝 Game Rules
      </Text>
      <UnorderedList width="full">
        <ListItem
          color="gray.30"
          fontSize="xl"
          fontWeight="500"
          listStylePosition="inside"
        >
          Total Questions:{" "}
          <chakra.span color="gray.0" fontWeight="700">
            {data?.questions?.length}
          </chakra.span>
        </ListItem>
        <ListItem
          color="gray.30"
          fontSize="xl"
          fontWeight="500"
          listStylePosition="inside"
        >
          Time per Question:{" "}
          <chakra.span color="gray.0" fontWeight="700">
            {data?.questionTimeSeconds}{" "}
          </chakra.span>
          seconds
        </ListItem>
        <ListItem
          color="gray.30"
          fontSize="xl"
          fontWeight="500"
          listStylePosition="inside"
        >
          Lives:{" "}
          <chakra.span color="gray.0" fontWeight="700">
            1{" "}
          </chakra.span>
          life
        </ListItem>
        <Text color="gray.30" fontWeight="600" fontSize="md">
          (one incorrect answer ends the game)
        </Text>
      </UnorderedList>
    </VStack>
  )
}

const HintInfo = () => {
  const { query } = useRouter()
  const { data } = useQuery<quizType>({
    queryKey: ["quiz", query?.id],
    queryFn: async () =>
      await axiosClient
        .get(`/quiz/competitions/${query?.id}/`)
        .then((res) => res.data),
  })

  const content = useMemo(
    () => ({
      stats: (
        <HintContent
          description="Shows the percentage of other players' choices for each option."
          title="Audience Poll"
          icon={UsersGroupTwoRounded}
          iconType="Bold"
        />
      ),
      fifty: (
        <HintContent
          description="Removes two incorrect options."
          title="50/50"
          icon={Widget}
          iconType="BoldDuotone"
        />
      ),
      time: (
        <HintContent
          description="Shows the percentage of other players' choices for each option."
          title="Extra Time"
          icon={AlarmAdd}
          iconType="Bold"
        />
      ),
    }),
    []
  )
  return (
    <VStack width="full">
      <Text fontSize="md" fontWeight="bold" width="full">
        💡 Hints
      </Text>
      {data?.builtInHints?.map((hint) => content[hint.hint.hintType])}
    </VStack>
  )
}
export const Lobby = () => {
  const { query } = useRouter()

  const auth = useAuth()

  const { data } = useQuery<quizType>({
    queryKey: ["quiz", query?.id],
    queryFn: async () =>
      await axiosClient
        .get(`/quiz/competitions/${query?.id}/`)
        .then((res) => res.data),
  })
  return (
    <VStack
      width="full"
      p="16px"
      borderRadius="16px"
      background="glassBackground"
      rowGap="24px"
      maxH="100vh"
    >
      <VStack flex={0} height="auto" width="full" rowGap="24px">
        <ColorFullText
          fontSize="5xl"
          textContent={`Welcome, ${auth.username ?? "Guest User"}!`}
        />
        <Text
          fontSize="5xl"
          textAlign="center"
          color="gray.0"
          lineHeight="36px"
        >
          Get ready to test your knowledge!
        </Text>
        <Text>The quiz starts in:</Text>
        <CountDown
          timerStyle={{ width: "full" }}
          shows={{ min: true, sec: true }}
          date={new Date(data?.startAt).getTime()}
          containerStyle={{
            bg: "transparent",
            backdropFilter: "none",
          }}
        />
      </VStack>
      <VStack
        flex={1}
        overflow="auto"
        divider={
          <Divider
            border="none"
            boxShadow="none"
            bg="glassBackground"
            height="2px"
            width="full"
          />
        }
        width="full"
        borderRadius="12px"
        p="16px"
        bg="cardBackground"
      >
        <Rules />
        <HintInfo />
      </VStack>
    </VStack>
  )
}
