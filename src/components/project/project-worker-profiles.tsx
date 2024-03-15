import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { IProject } from "../../interfaces/project-interface";
import useProjectPartner from "../../hooks/use-project-partner";

export default function ProjectWorkerProfile({
  project,
}: {
  project: IProject;
}) {
  const { workers, isFetchingWorker } = useProjectPartner(project);
  if (isFetchingWorker) return <></>;

  return (
    <AvatarGroup size="md" max={2}>
      {workers.map((worker, index) => (
        <Avatar name={worker.name} src={worker.profile} key={index} />
      ))}
    </AvatarGroup>
  );
}
