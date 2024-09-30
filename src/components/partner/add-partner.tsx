import { AddIcon, PlusSquareIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Input,
  DrawerFooter,
  VStack,
  Flex,
  Icon,
  Box,
  Avatar,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { IUser } from "../../interfaces/user-interface";
import { addFriend, getUserInformation } from "../../functions/user";
import { loadingToast, successToast, warningToast } from "../../utils/toast";
import { useUserAuth } from "../../contexts/user-context";
import useFindUser from "../../hooks/use-find-user";

export default function AddPartner() {
  const userContext = useUserAuth();
  const { users, isLoading, setFind } = useFindUser();
  const [email, setEmail] = useState("");
  const toast = useToast();

  function clickHandle(user: IUser) {
    if (user) {
      const email = user.email;
      if (!confirm(`You sure you want to add ${user.email}`)) return;

      toast(loadingToast("Adding new friend", "please wait a moment"));
      addFriend(userContext.user.email, email).then((response) => {
        toast.closeAll();
        if (response.success) {
          toast(successToast("Adding new friend", response.message));
          onClose();
        } else toast(warningToast("Adding new friend", response.message));
      });
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        className="mt-4"
        onClick={onOpen}
        variant={"outline"}
        leftIcon={<AddIcon />}
      >
        Add Partner
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Find Partner</DrawerHeader>

          <DrawerBody>
            <VStack gap={3}>
              <Flex width={"100%"} gap={2}>
                <Input
                  placeholder="Email"
                  name="title"
                  borderWidth={2}
                  onChange={(o) => setEmail(o.target.value)}
                />
                <Button as={Icon} onClick={() => setFind(email)} padding={3}>
                  <SearchIcon />
                </Button>
              </Flex>
            </VStack>
            {users.map((user, index) => (
              <>
                <Flex padding={3} marginTop={3}>
                  <Avatar src={user.profile} />
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <Box ml="3">
                      <Text fontWeight="bold">{user.name}</Text>
                      <Text fontSize="sm">{user.email}</Text>
                    </Box>
                    <Button
                      as={Icon}
                      padding={2.5}
                      isDisabled={
                        userContext.user.friends.includes(user.email)
                          ? true
                          : false
                      }
                      variant={"ghost"}
                      onClick={() => clickHandle(user)}
                    >
                      <PlusSquareIcon boxSize={"5"} />
                    </Button>
                  </Flex>
                </Flex>
              </>
            ))}
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
