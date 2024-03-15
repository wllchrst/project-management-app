import { useParams } from "react-router-dom";
import useProject from "../hooks/use-project";
import Loading from "../components/loading";
import {
  Flex,
  Heading,
  Image,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  AvatarGroup,
  Avatar,
  Spacer,
} from "@chakra-ui/react";
import Jobs from "../components/todos/jobs-main";
import ProjectPartner from "../components/project/project-partner";
import useProjectPartner from "../hooks/use-project-partner";
import ProjectWorkerProfile from "../components/project/project-worker-profiles";
import ProjectProgress from "../components/project/project-progress";

export default function ProjectDetail() {
  const { id } = useParams();
  if (id == undefined) return <Loading />;
  const { project, isLoading } = useProject(id);
  const { workers, isFetchingWorker } = useProjectPartner(project);

  if (isLoading) return <Loading />;

  return (
    <>
      <VStack alignItems={"flex-start"}>
        <Flex
          width={"100%"}
          height={250}
          overflow={"hidden"}
          borderBottomRadius={20}
        >
          <Image
            objectFit="cover"
            width={"100%"}
            src={project.background}
            fallbackSrc="https://9to5mac.com/wp-content/uploads/sites/6/2020/10/The-Cliffs-6-dragged.jpg?quality=82&strip=all"
            aspectRatio={1.7}
          />
        </Flex>
        <Box padding={10} width={"100%"}>
          <VStack alignItems={"flex-start"} marginBottom={7}>
            <Heading size={"lg"}>{project.name}</Heading>
            <Spacer />
            <ProjectWorkerProfile project={project} />
          </VStack>
          <Tabs variant={"enclosed"} colorScheme="teal" width={"100%"}>
            <TabList>
              <Tab borderWidth={1.5}>Jobs</Tab>
              <Tab borderWidth={1.5}>Partners</Tab>
              <Tab borderWidth={1.5}>Progress</Tab>
            </TabList>

            <TabPanels width={"100%"}>
              <TabPanel width={"100%"}>
                <Jobs project={project} />
              </TabPanel>
              <TabPanel>
                <ProjectPartner project={project} />
              </TabPanel>
              <TabPanel>
                <ProjectProgress project={project} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </VStack>
    </>
  );
}
