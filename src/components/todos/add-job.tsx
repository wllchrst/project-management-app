import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Input,
  DrawerFooter,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { IProject } from "../../interfaces/project-interface";
import { ChangeEvent, useRef, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { IJob } from "../../interfaces/job-interface";
import { dateStringToTimestamp } from "../../functions/utility";
import { createNewJob } from "../../functions/project";
import { loadingToast, successToast, warningToast } from "../../utils/toast";

export default function AddJob({ project }: { project: IProject }) {
  const [job, setJob] = useState({} as IJob);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const toast = useToast();

  const changeHandle = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setJob({
      ...job,
      [event.target.name]: event.target.value,
    });
  };

  function clickHandle() {
    toast(loadingToast("Adding new job", "please wait"));
    createNewJob(project, job).then((response) => {
      toast.closeAll();
      if (response.success) {
        toast(successToast("Added new Job", ""));
        onClose();
      } else toast(warningToast("Failed adding new job", response.message));
    });
  }

  return (
    <div className="mt-2">
      <Button colorScheme="teal" onClick={onOpen} leftIcon={<AddIcon />}>
        New Job
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add Job</DrawerHeader>

          <DrawerBody>
            <VStack gap={3}>
              <Input placeholder="Title" name="title" onChange={changeHandle} />
              <Textarea
                placeholder="Description"
                name="description"
                rows={5}
                onChange={changeHandle}
              />
              <Input
                placeholder="Title"
                name="deadline"
                type="date"
                onChange={(o) => {
                  job.deadline = dateStringToTimestamp(o.target.value);
                }}
              />
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={clickHandle}>
              Add
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
