import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MutableRefObject, useRef } from "react";
import { IProject } from "../../interfaces/project-interface";
import { IJob } from "../../interfaces/job-interface";
import { addParticipant } from "../../functions/project";
import { useUserAuth } from "../../contexts/user-context";
import { loadingToast, successToast, warningToast } from "../../utils/toast";

export default function ParcipateJob({
  project,
  job,
}: {
  project: IProject;
  job: IJob;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef: MutableRefObject<any | null> = useRef(null);
  const toast = useToast();
  const title = "Adding participant";
  const { user } = useUserAuth();
  const clickHandle = () => {
    if (!confirm("You sure want to participate on this job")) return;
    toast(loadingToast(title, "please wait a moment"));
    addParticipant(user.email, project, job.id).then((response) => {
      toast.closeAll();
      if (response.success) {
        toast(successToast(title, "success participating you the job"));
        onClose();
        return;
      }
      toast(warningToast(title, response.message));
    });
  };

  return (
    <>
      <Button
        variant={"ghost"}
        onClick={onOpen}
        size={"xs"}
        leftIcon={<PlusSquareIcon />}
      >
        Participate
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Join in {job.title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text>
              Are you sure you want to participate in the Job {job.title},
              {job.description}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={clickHandle} colorScheme="blue" ml={3}>
              Join
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
