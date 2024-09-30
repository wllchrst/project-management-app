import { Wrap, WrapItem } from "@chakra-ui/react";
import { IUser } from "../../interfaces/user-interface";
import ProfileCard from "../../pages/profile-card";

export default function ViewUser({ users }: { users: IUser[] }) {
  return (
    <Wrap width={"100%"}>
      {users.map((user, index) => (
        <WrapItem width={"45%"} margin={1} className="" key={index}>
          <ProfileCard profile={user} key={index} />
        </WrapItem>
      ))}
    </Wrap>
  );
}
