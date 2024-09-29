import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  UseDisclosureProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

interface ModalBaseProps extends UseDisclosureProps {
  footer?: ReactNode;
  header?: ReactNode;
  body: ReactNode;
  modalProps?: Partial<ModalProps>;
  modalContentStyle?: ModalContentProps;
}
export const ModalBase = ({
  footer,
  isOpen,
  onClose,
  header,
  body,
  modalProps,
  modalContentStyle,
}: ModalBaseProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...modalProps}>
      <ModalOverlay />
      <ModalContent p="16px" position="relative" {...modalContentStyle}>
        {header && (
          <ModalHeader
            p="0"
            textAlign="center"
          >
            {header}
          </ModalHeader>
        )}
        <ModalCloseButton
          pos="absolute"
          top="12px"
          right="16px"
          color="gray.100"
          boxSize="24px"
          fontSize='12px'
        />
        <ModalBody p="0">{body}</ModalBody>

        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};
