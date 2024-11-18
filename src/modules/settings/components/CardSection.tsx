import { colors } from "@/theme/colors"
import { BoxProps, VStack } from "@chakra-ui/react"
import { FC, PropsWithChildren } from "react"

export const CardSection: FC<PropsWithChildren & BoxProps> = ({
  children,
  ...rest
}) => {
  return (
    <VStack
      width="full"
      position="relative"
      background={colors.glassBackground}
      borderRadius="16px"
      {...rest}
    >
      <VStack
        overflow="hidden"
        p="10px"
        rowGap="16px"
        width="full"
        borderRadius="inherit"
        zIndex={2}
        height="full"
      >
        {children}
      </VStack>
    </VStack>
  )
}
