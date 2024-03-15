import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { IProject } from "../../interfaces/project-interface";
import { createProject } from "../../functions/project";
import { loadingToast, successToast, warningToast } from "../../utils/toast";
import { useUserAuth } from "../../contexts/user-context";

export default function CreateProject() {
  const toast = useToast();
  const { user } = useUserAuth();
  const [project, setProject] = useState({
    name: "",
    description: "",
  } as IProject);

  const Overlay = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(2.5px) hue-rotate(90deg)"
    />
  );

  const changeHandle = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProject({
      ...project,
      [event.target.name]: event.target.value,
    });
  };

  function clickHandle() {
    project.workers = [user.email];
    toast(loadingToast("Adding New Project", "Please be patient"));
    createProject(project).then((response) => {
      toast.closeAll();
      if (response.success) {
        toast(successToast("Project Created", response.message));
        onClose();
      } else toast(warningToast("Failed", response.message));
    });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<Overlay />);
  return (
    <>
      {/* create new project */}
      <Button
        as={AddIcon}
        onClick={() => {
          setOverlay(<Overlay />);
          onOpen();
        }}
      />

      <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Create New Project!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              gap={3}
            >
              <Input
                name="name"
                placeholder="Project Name"
                onChange={changeHandle}
              />
              <Textarea
                name="description"
                placeholder="Description"
                rows={5}
                onChange={changeHandle}
              />
              <Button
                onClick={clickHandle}
                variant={"solid"}
                colorScheme="linkedin"
                width={"30%"}
              >
                Add
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
