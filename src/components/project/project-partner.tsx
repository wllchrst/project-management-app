import { Spacer } from "@chakra-ui/react";
import useProjectPartner from "../../hooks/use-project-partner";
import { IProject } from "../../interfaces/project-interface";
import ViewUser from "../partner/view-users";
import AddPartnerToProject from "./add-partner-to-project";

export default function ProjectPartner({ project }: { project: IProject }) {
  const { workers } = useProjectPartner(project);
  return (
    <>
      {/* show semua worker di project nanti*/}
      <ViewUser users={workers} />
      <Spacer marginTop={4} />
      <AddPartnerToProject project={project} />
    </>
  );
}
