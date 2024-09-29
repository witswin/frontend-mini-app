import { ModalBase } from "@/components/ModalBase";
import { ModalProps, UseDisclosureProps, VStack } from "@chakra-ui/react";

const Card = () => {
  return (
    <VStack
      borderStartStartRadius="24px"
      borderStartEndRadius="24px"
      borderTop="2px solid"
      borderColor="cyan"
      bg="var(--chakra-colors-cardBackground)"
      backdropFilter="blur(50px)"
      margin={0}
      bottom={0}
      mt="auto !important"
      position='absolute'
    >
      <p>sakam</p>
    </VStack>
  );
};

interface EnrolledCardProps extends UseDisclosureProps {
  modalProps: ModalProps;
}

export const EnrolledCard = ({ isOpen, onClose }: EnrolledCardProps) => {
  console.log({ isOpen });

  return isOpen?<Card />:<></>
};
