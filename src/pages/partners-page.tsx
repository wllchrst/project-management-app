import {
  Center,
  HStack,
  Heading,
  Image,
  Spacer,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import background from "../assets/partner-page-background.png";
import AddPartner from "../components/partner/add-partner";
import useFriends from "../hooks/use-friends";
import { useUserAuth } from "../contexts/user-context";
import Loading from "../components/loading";
import ProfileCard from "./profile-card";
import ViewUser from "../components/partner/view-users";

export default function Partners() {
  const { friends, isLoading } = useFriends();

  return (
    <VStack alignItems={"flex-start"}>
      <Center width={"100%"} height={"230px"} overflow={"hidden"}>
        <Image src={background} width={"100%"} />
      </Center>
      <div className="p-10 w-full">
        <Heading size={"lg"}>Partners</Heading>
        <Spacer marginTop={4} />
        {isLoading ? <Loading /> : <ViewUser users={friends} />}
        <AddPartner />
      </div>
    </VStack>
  );
}
