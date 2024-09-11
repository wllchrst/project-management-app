import { Flex, Heading, Spacer, VStack } from "@chakra-ui/react";

import CreateProject from "../components/project/create-project";
import useProjects from "../hooks/use-get-projects";
import Loading from "../components/loading";
import ProjectCard from "../components/project/project-card";

export default function Project() {
  const { projects, isLoading } = useProjects();

  if (isLoading) return <Loading></Loading>;

  return (
    <>
      <VStack alignItems={"flex-start"} padding={10} className="w-full">
        <Heading size={"lg"}>Projects</Heading>
        <div className="mt-3 flex flex-col gap-3">
          {projects.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))}
        </div>
        <Spacer marginTop={2} />
        <CreateProject />
      </VStack>
    </>
  );
}
