import { Accordion, VStack, Flex } from "@chakra-ui/react";
import { IProject } from "../../interfaces/project-interface";
import AddToDo from "./add-job";
import JobCard from "./job-card";

export default function Jobs({ project }: { project: IProject }) {
  return (
    <VStack alignItems={"flex-start"} width={"100%"}>
      <Flex width={"100%"}>
        <Accordion defaultIndex={[0]} allowMultiple width={"100%"}>
          {project.jobs.map((job) => (
            <JobCard job={job} project={project} />
          ))}
        </Accordion>
      </Flex>

      <AddToDo project={project} />
    </VStack>
  );
}
