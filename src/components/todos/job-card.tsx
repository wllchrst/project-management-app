import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  Spacer,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { IJob } from "../../interfaces/job-interface";
import { CalendarIcon, CheckIcon } from "@chakra-ui/icons";
import { jobColor, timestampString } from "../../functions/utility";
import ParcipateJob from "./participate-job";
import { IProject } from "../../interfaces/project-interface";
import useJobParticipant from "../../hooks/use-job-participant";
import JobChat from "./job-group-chat";
import { loadingToast, successToast, warningToast } from "../../utils/toast";
import { makeJobDone } from "../../functions/project";

export default function JobCard({
  job,
  project,
}: {
  job: IJob;
  project: IProject;
}) {
  const { participants } = useJobParticipant(project.id, job.id);
  const toast = useToast();

  function clickJobDone() {
    const title = "Job Done";
    if (!confirm("Are you sure the job is done")) return;
    toast(loadingToast(title, "please wait a moment"));
    makeJobDone(project, job).then((response) => {
      toast.closeAll();
      if (response.success) {
        toast(successToast(title, response.message));
      } else toast(warningToast(title, response.message));
    });
  }
  return (
    <>
      <AccordionItem width={"100%"}>
        <AccordionButton
          width={"100%"}
          _hover={{ backgroundColor: jobColor(job) + ",0.1)" }}
          backgroundColor={jobColor(job) + ", 0.04)"}
        >
          <Box as="span" flex="1" textAlign="left">
            <Heading size={"md"}>{job.title}</Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <VStack alignItems={"flex-start"}>
            <Text>{job.description}</Text>
            <Box className="flex items-center gap-2">
              <CalendarIcon /> <Text> {timestampString(job.deadline)}</Text>
            </Box>
            <Spacer marginBottom={2} />
            <HStack>
              <AvatarGroup size="sm" max={3}>
                {participants.map((participant, index) => (
                  <Avatar
                    key={index}
                    name={participant.name}
                    src={participant.profile}
                  />
                ))}
              </AvatarGroup>
              <ParcipateJob project={project} job={job} />
              <JobChat job={job} />
              <Button
                as={Icon}
                variant={"ghost"}
                padding={3}
                onClick={clickJobDone}
              >
                <CheckIcon />
              </Button>
            </HStack>
          </VStack>
        </AccordionPanel>
      </AccordionItem>
    </>
  );
}
