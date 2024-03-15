import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink, Text, useToast } from "@chakra-ui/react";
import background from "../assets/register-background.jpg";
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
import { IRegister } from "../interfaces/register-interface";
import { registerUser } from "../functions/register";

export default function Register() {
  const toast = useToast();
  const [registerInformation, setregisterInformation] = useState({
    email: "",
    confirmPassword: "",
    name: "",
    password: "",
  } as IRegister);
  const navigate = useNavigate();
  const changeHandle = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setregisterInformation({
      ...registerInformation,
      [event.target.name]: event.target.value,
    });
  };

  function submitHandle() {
    toast({
      position: "top-right",
      title: "Register",
      description: "Registering your account",
      status: "loading",
    });
    registerUser(registerInformation).then((response) => {
      toast.closeAll();
      if (response.success) {
        toast({
          position: "top-right",
          duration: 1000,
          title: "Success",
          status: "success",
          description: "Register Successful",
        });
        navigate('/')
      } else
        toast({
          position: "top-right",
          duration: 1000,
          title: "Register Failed",
          status: "warning",
          description: response.message,
        });
    });
  }
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
            Register
          </Heading>
          <VStack alignItems={"flex-start"} gap={5}>
            <Input
              variant={"flushed"}
              placeholder="Full Name"
              _placeholder={{ color: "rgb(255,255,255,0.85)" }}
              size={"md"}
              width={400}
              name="name"
              onChange={changeHandle}
            />
            <Input
              variant={"flushed"}
              _placeholder={{ color: "rgb(255,255,255,0.85)" }}
              placeholder="Your Email"
              onChange={changeHandle}
              size={"md"}
              name="email"
              width={400}
            />
            <Input
              variant={"flushed"}
              type="password"
              onChange={changeHandle}
              placeholder="Password"
              _placeholder={{ color: "rgb(255,255,255,0.85)" }}
              name="password"
              size={"md"}
              width={400}
            />
            <Input
              variant={"flushed"}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              size={"md"}
              width={400}
              _placeholder={{ color: "rgb(255,255,255,0.85)" }}
              onChange={changeHandle}
            />

            <Flex justifyContent={"center"} width={"100%"}>
              <ChakraLink as={ReactRouterLink} to="/">
                <Text
                  decoration={"underline"}
                  _hover={{ color: "white" }}
                  color={"white"}
                >
                  Already have an account? Login!
                </Text>
              </ChakraLink>
            </Flex>

            <Button onClick={submitHandle}>
              <ArrowForwardIcon />
            </Button>
          </VStack>
        </Flex>
      </Box>
    </Center>
  );
}
