import { Text } from "@chakra-ui/react";
import { IProject } from "../../interfaces/project-interface";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }: { project: IProject }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex w-full rounded overflow-hidden shadow-lg border mb-4 hover:bg-sky-50 transition-all"
      onClick={() => {
        navigate(`/projects/${project.id}`);
      }}
    >
      {/* Fixed-size project background on the left */}
      <div className="w-80 h-48">
        <img
          src={project.background}
          alt={project.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Project name and description on the right */}
      <div className="flex-1 px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{project.name}</h2>
        <Text noOfLines={4} className="text-gray-700 text-base line-clamp-3">
          {project.description}
        </Text>
      </div>
    </div>
  );
}
