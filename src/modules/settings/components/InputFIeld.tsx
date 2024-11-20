import { colors } from "@/theme/colors"
import { FormLabel, Input } from "@chakra-ui/react"

export const InputField = () => {
  return (
    <FormLabel>
      Last Name
      <Input
        mt="1"
        background={colors.inputBackground}
        placeholder="Enter your lastname"
      />
    </FormLabel>
  )
}
