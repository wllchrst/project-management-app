import {
  Button,
  Icon,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  Flex,
  Avatar,
  Box,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IUser } from "../../interfaces/user-interface";
import { ArrowRightIcon, ChatIcon } from "@chakra-ui/icons";
import { useUserAuth } from "../../contexts/user-context";
import { sendChatPartner } from "../../functions/user";
import { useEffect, useRef, useState } from "react";
import useChat from "../../hooks/use-chats";
import { showChat } from "../../functions/utility";

interface I {
  userTo: IUser;
}

export default function ChatPartner({ userTo }: I) {
  const { user } = useUserAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [current, setCurrent] = useState("");
  const { chats } = useChat(userTo.email);
  const divRef = useRef<HTMLDivElement>(null);

  function clickHandle() {
    if (user.email != undefined)
      sendChatPartner(user, userTo, current).then((result) => {
        if (result) setCurrent("");
      });
  }

  return (
    <>
      <Button
        padding={3}
        variant={"ghost"}
        as={Icon}
        onClick={() => {
          onOpen();
          console.log(chats);
        }}
      >
        <ChatIcon />
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex>
              <Avatar src={userTo.profile} name={userTo.name} />
              <Box ml="3">
                <Text fontWeight="bold">{userTo.name}</Text>
                <Text fontSize="sm">{userTo.email}</Text>
              </Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <Box ref={divRef} padding={3} borderRadius={4} height={"100%"}>
              <VStack
                justifyContent={"space-between"}
                height={"100%"}
                width={"100%"}
              >
                <Box
                  className="border-sm h-full w-full flex flex-col-reverse gap-3 rounded-sm bg-white p-5"
                  boxShadow={"md"}
                  overflowY={"scroll"}
                >
                  {chats.map((chat, index) => (
                    <div key={index}>
                      {showChat(chat, user.email, userTo.email) ? (
                        <>
                          {chat.to != userTo.email ? (
                            <Flex justifyContent={"flex-start"}>
                              <Text
                                padding={2.5}
                                color={"black"}
                                backgroundColor={"rgb(240,240,240,1)"}
                                borderRadius={7}
                              >
                                {chat.message}
                              </Text>
                            </Flex>
                          ) : (
                            <Flex justifyContent={"flex-end"}>
                              <Text
                                padding={2.5}
                                color={"white"}
                                backgroundColor={"#4B7EFD"}
                                borderRadius={7}
                              >
                                {chat.message}
                              </Text>
                            </Flex>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
                </Box>
                <div className="flex w-full gap-2">
                  <Input
                    value={current}
                    boxShadow={"md"}
                    backgroundColor={"white"}
                    onChange={(o) => {
                      setCurrent(o.target.value);
                    }}
                  ></Input>
                  <Button
                    boxShadow={"md"}
                    as={Icon}
                    backgroundColor={"white"}
                    onClick={clickHandle}
                  >
                    <ArrowRightIcon />
                  </Button>
                </div>
              </VStack>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
