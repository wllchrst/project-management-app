import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  PopoverBody,
  VStack,
  Input,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { IProject } from "../../interfaces/project-interface";
import { getFile } from "../../functions/utility";
import { useState } from "react";
import { editBackground } from "../../functions/project";
import { loadingToast, successToast, warningToast } from "../../utils/toast";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function EditProjectBackground({
  project,
}: {
  project: IProject;
}) {
  const [file, setFile] = useState<File>();
  const toast = useToast();

  function clickHandle() {
    if (file) {
      toast(
        loadingToast(
          "Uploading Background",
          "please wait this might take a moment"
        )
      );
      editBackground(project, file).then((response) => {
        toast.closeAll();
        if (response.success) {
          toast(successToast("Success", ""));
        } else {
          toast(warningToast("someting went wrong", "please try again later"));
        }
      });
    }
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} variant={"ghost"} fontSize={"smaller"}>
        Add Picture
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems={"flex-start"}>
              <Input
                type="file"
                onChange={(e) => {
                  getFile(e, setFile);
                }}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={clickHandle}>
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
