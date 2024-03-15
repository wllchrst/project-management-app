import { ArrowForwardIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink, Text, useToast } from "@chakra-ui/react";
import background from "../assets/login-background.jpg";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import { ILogin } from "../interfaces/login-interface";
import { loginUser } from "../functions/login";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" } as ILogin);
  const toast = useToast();
  const navigate = useNavigate();

  const changeHandle = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const clickHandle = () => {
    toast({
      position: "top-right",
      title: "Register",
      description: "Registering your account",
      status: "loading",
    });
    loginUser(user).then((response) => {
      toast.closeAll();
      if (response.success) {
        toast({
          position: "top-right",
          title: "Login",
          description: "Login Success",
          status: "success",
        });
        navigate("/home");
      } else
        toast({
          position: "top-right",
          title: "Login",
          description: "Failed Login",
          status: "error",
        });
    });
  };

  return (
    <Center
      height={"100vh"}
      backgroundImage={background}
      backgroundPosition={"center"}
      backgroundSize={"100vw"}
      color={"white"}
    >
      <Box
        borderWidth={1}
        borderRadius={5}
        padding={10}
        backdropFilter={"blur(3px) brightness(0.75)"}
      >
        <Flex mx={"auto"} p={4} direction={"column"}>
          <Heading textAlign={"left"} mb={5}>
            Login
          </Heading>
          <VStack alignItems={"flex-start"} gap={5}>
            <Input
              variant={"flushed"}
              placeholder="Your Email"
              size={"md"}
              width={400}
              name="email"
              _placeholder={{ color: "rgb(255,255,255,0.85)" }}
              onChange={changeHandle}
            />
            <Input
              variant={"flushed"}
              _placeholder={{ color: "rgb(255,255,255,0.85)" }}
              type="password"
              name="password"
              placeholder="Password"
              size={"md"}
              onChange={changeHandle}
              width={400}
            />

            <Flex justifyContent={"center"} width={"100%"}>
              <ChakraLink as={ReactRouterLink} to="/register">
                <Text
                  decoration={"underline"}
                  _hover={{ color: "white" }}
                  color={"white"}
                >
                  Register New Account
                </Text>
              </ChakraLink>
            </Flex>

            <Button onClick={clickHandle}>
              <ArrowForwardIcon />
            </Button>
          </VStack>
        </Flex>
      </Box>
    </Center>
  );
}
