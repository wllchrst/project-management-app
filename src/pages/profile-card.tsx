import { Avatar, Badge, Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { IUser } from "../interfaces/user-interface";
import { ChatIcon } from "@chakra-ui/icons";
import ChatPartner from "../components/chat/chat-partner";
import { useUserAuth } from "../contexts/user-context";

export default function ProfileCard({ profile }: { profile: IUser }) {
  const { user } = useUserAuth();

  if (user.email == undefined) return <></>;
  return (
    <>
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex>
          <Avatar src={profile.profile} name={profile.name} />
          <Box ml="3">
            <Text fontWeight="bold">{profile.name}</Text>
            <Text fontSize="sm">{profile.email}</Text>
          </Box>
        </Flex>
        <div>
          {user.email == profile.email ? (
            <></>
          ) : (
            <ChatPartner userTo={profile} />
          )}
        </div>
      </Flex>
    </>
  );
}
