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
  Flex,
  Avatar,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import useProjectPartner from "../../hooks/use-project-partner";
import { IProject } from "../../interfaces/project-interface";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import useFriends from "../../hooks/use-friends";
import Loading from "../loading";
import { IUser } from "../../interfaces/user-interface";
import { addUserToProject } from "../../functions/project";
import { loadingToast, successToast, warningToast } from "../../utils/toast";
import { useUserAuth } from "../../contexts/user-context";

export default function AddPartnerToProject({
  project,
}: {
  project: IProject;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [clickedUser, setClickedUser] = useState<IUser | null>(null);
  const { friends, isLoading } = useFriends();
  const { user } = useUserAuth();

  function clickHandle() {
    const title = "Adding new partner to project";
    if (clickedUser == null) return;
    if (
      !confirm(
        "Are you sure you want to add " + clickedUser.name + " to the project"
      )
    ) {
      setClickedUser(null);
      return;
    } else {
      toast(loadingToast(title, "please wait a moment"));
      addUserToProject(project, clickedUser.email).then((response) => {
        toast.closeAll();
        if (response.success) {
          toast(successToast(title, response.message));
          onClose();
        } else toast(warningToast(title, response.message));
      });
      setClickedUser(null);
    }
  }

  useEffect(() => {
    clickHandle();
  }, [clickedUser]);

  if (user.email == undefined) return <Loading />;

  return (
    <>
      <Button as={Icon} padding={3.5} onClick={onOpen}>
        <AddIcon />
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Invite Partner to Project</DrawerHeader>

          <DrawerBody>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {friends.map((friend, index) => (
                  <Flex
                    width={"100%"}
                    marginTop={2}
                    key={index}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Flex>
                      <Avatar src={friend.profile} name={friend.name} />
                      <Box ml="3">
                        <Text fontWeight="bold">{friend.name}</Text>
                        <Text fontSize="sm">{friend.email}</Text>
                      </Box>
                    </Flex>
                    <Button
                      padding={3}
                      variant={"ghost"}
                      as={Icon}
                      onClick={() => {
                        setClickedUser(friend);
                        clickHandle();
                      }}
                    >
                      {user.friends.includes(friend.email) ? (
                        <></>
                      ) : (
                        <AddIcon />
                      )}
                    </Button>
                  </Flex>
                ))}
              </>
            )}
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
