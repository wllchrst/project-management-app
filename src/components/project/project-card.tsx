import {
  Card,
  CardBody,
  Stack,
  Image,
  Heading,
  Text,
  CardFooter,
  Button,
  Flex,
  VStack,
  Box,
} from "@chakra-ui/react";
import { IProject } from "../../interfaces/project-interface";
import { ExternalLinkIcon, SettingsIcon } from "@chakra-ui/icons";
import EditProjectBackground from "./edit-project-background";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }: { project: IProject }) {
  const navigate = useNavigate();
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "300px" }}
          src={project.background}
          aspectRatio={1.7}
        />

        <Stack>
          <CardBody>
            <VStack alignItems={"flex-start"}>
              <Flex alignItems={"center"} gap={3}>
                <Heading
                  size="md"
                  _hover={{ borderBottom: "1px solid black" }}
                  onClick={() => {
                    navigate("/projects/" + project.id);
                  }}
                >
                  {project.name}{" "}
                </Heading>
                <EditProjectBackground project={project} />
              </Flex>
              <Text noOfLines={3}>{project.description}</Text>
            </VStack>
          </CardBody>

          <CardFooter>
            <Flex
              alignItems={"center"}
              justifyItems={"space-between"}
              width={"100%"}
            ></Flex>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}
