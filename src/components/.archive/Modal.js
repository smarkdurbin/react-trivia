import { useEffect, useState } from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const Modal = ({
  callToActionFunction,
  callToActionText,
  closeModal,
  content,
  openModal,
  show,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State.
  const [actionButtonFunction, setActionButtonFunction] = useState();
  const [actionButtonText, setActionButtonText] = useState();
  const [body, setBody] = useState();

  // Hook on content.
  useEffect(() => {
    // If content.
    if (content) {
      // Set body.
      setBody(content);
    } else {
      // Set body.
      setBody();
    }
  }, [content]);

  // Hook on call to action function.
  useEffect(() => {
    // If call to action function.
    if (typeof callToActionFunction === "function") {
      // Set action button function.
      setActionButtonFunction(() => callToActionFunction);
    } else {
      // Set action button function.
      setActionButtonFunction();
    }
  }, [callToActionFunction]);

  // Hook on call to action text.
  useEffect(() => {
    if (callToActionText) {
      // Set action button text.
      setActionButtonText(callToActionText);
    } else {
      // Set action button text.
      setActionButtonText();
    }
  }, [callToActionText]);

  // Hook on is open.
  useEffect(() => {
    // If is open.
    if (isOpen) {
      // Open modal.
      openModal();
    } else {
      // Close modal.
      closeModal();
    }
  }, [isOpen]);

  // Hook on show.
  useEffect(() => {
    // If show.
    if (show) {
      // On open.
      onOpen();
    } else {
      // On close.
      onClose();
    }
  }, [show, onClose, onOpen]);

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr="auto" onClick={onClose}>
            Close
          </Button>
          {actionButtonText && actionButtonFunction && (
            <Button
              colorScheme="blue"
              ml="auto"
              onClick={() => {
                actionButtonFunction();
              }}
            >
              {actionButtonText}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
