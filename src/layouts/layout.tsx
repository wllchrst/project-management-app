import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Img,
  Menu,
  MenuButton,
  MenuList,
  Spacer,
  MenuItem,
  Text,
  VStack,
  useToast,
  IconButton,
} from "@chakra-ui/react";
import { PageContainer } from "../components/styled/page-container";
import logo from "../assets/logo.png";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import { signOutCurrentUser } from "../functions/login";
import { useUserAuth } from "../contexts/user-context";
import { HamburgerIcon } from "@chakra-ui/icons";

type ContentLayout = {
  children: JSX.Element;
};

export default function MainLayout({ children }: ContentLayout) {
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useUserAuth();
  function logOut() {
    signOutCurrentUser().then((response) => {
      if (response.success) {
        toast({
          title: response.message,
          status: "success",
          position: "top-right",
        });
        navigate("/");
      }
    });
  }
  return (
    <Flex>
      {/* side bar */}
      <Flex
        justify={"space-between"}
        height={"100vh"}
        flexDirection={"column"}
        align={"flex-start"}
        position={"fixed"}
        left={0}
        border={"1px solid #878787"}
        width={320}
      >
        <VStack align={"flex-start"} width={"100%"}>
          <Image src={logo} padding={8} />
          <ChakraLink
            fontWeight={"semibold"}
            as={ReactRouterLink}
            to="/home"
            fontSize="lg"
            padding={5}
            className="hover:bg-sky-100"
            paddingLeft={8}
            width={"100%"}
            _hover={{ textDecoration: "none" }}
          >
            <Text>Home</Text>
          </ChakraLink>

          <ChakraLink
            as={ReactRouterLink}
            fontWeight={"semibold"}
            to="/projects"
            fontSize="lg"
            padding={5}
            className="hover:bg-sky-100"
            paddingLeft={8}
            width={"100%"}
            _hover={{ textDecoration: "none" }}
          >
            <Text>Project</Text>
          </ChakraLink>

          <ChakraLink
            as={ReactRouterLink}
            fontWeight={"semibold"}
            to="/partners"
            fontSize="lg"
            padding={5}
            paddingLeft={8}
            className="hover:bg-sky-100"
            width={"100%"}
            _hover={{ textDecoration: "none" }}
          >
            <Text>Partners</Text>
          </ChakraLink>
        </VStack>

        <VStack align={"flex-start"} padding={5}>
          <Flex overflow={"hidden"} alignItems={"center"} gap={3} width={300}>
            <Center borderRadius={"5px"} boxSize={"50px"} overflow={"hidden"}>
              <Image
                src={user.profile}
                fallbackSrc="https://via.placeholder.com/150"
              />
            </Center>
            <Text fontSize="md">
              <ChakraLink as={ReactRouterLink} to={"/projects"}>
                {user.name}
              </ChakraLink>
            </Text>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                padding={1}
                background={"rgb(0,0,0,0)"}
              ></MenuButton>
              <MenuList>
                <MenuItem onClick={logOut}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </VStack>
      </Flex>
      <Box width={"100%"} marginLeft={320}>
        {children}
      </Box>
    </Flex>
  );
}
