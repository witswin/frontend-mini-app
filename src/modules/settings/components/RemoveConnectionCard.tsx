import { BottomModal } from "@/components/BottomModal"
import { axiosClient } from "@/configs/axios"
import { colors } from "@/theme/colors"
import { Button, Flex, Text, useToast, VStack } from "@chakra-ui/react"
import { FC } from "react"
import { useProfileDispatch } from "../hooks"

export const RemoveConnectionCard: FC<{
  name: string
  url: string
  onClose: () => void
  isOpen: boolean
}> = ({ name, url, onClose, isOpen }) => {
  const toast = useToast({    position: 'top',
  })
  const dispatchProfile = useProfileDispatch()

  const onDelete = async () => {
    axiosClient
      .delete(url)
      .then(() => {
        toast({
          description: "connection deleted",
          status: "info",
        })
        dispatchProfile(undefined)
      })
      .finally(onClose)
  }

  return (
    <BottomModal onClose={onClose} isOpen={isOpen} title={`Remove ${name}?`}>
      <VStack gap="24px">
        <VStack width="full">
          <Text
            color="gray.0"
            fontSize="lg"
            lineHeight="24px"
            fontWeight="700"
            width="full"
            textAlign="center"
          >
            Are you sure you want to disconnect your {name} account?
          </Text>
        </VStack>
        <Flex width="full" gap="3" align="center">
          <Button flex={1} width="full" onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button
            flex={1}
            width="full"
            onClick={onDelete}
            variant="unstyled"
            background={colors.red[500]}
            border={colors.red[500]}
          >
            Remove
          </Button>
        </Flex>
      </VStack>
    </BottomModal>
  )
}
