import { CloseIcon } from "@chakra-ui/icons";
import { isJobDone } from "../../functions/utility";
import { IProject } from "../../interfaces/project-interface";
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react";

export default function ProjectProgress({ project }: { project: IProject }) {
  return (
    <>
      <Stepper
        index={project.jobs.length}
        orientation="vertical"
        height={"200px"}
      >
        {project.jobs.map((job, index) => (
          <Step className="" key={index}>
            <StepIndicator className="">
              <StepStatus
                complete={isJobDone(job) ? <StepIcon /> : <CloseIcon />}
              />
            </StepIndicator>

            <Box className="">
              <StepTitle>{job.title}</StepTitle>
              <StepDescription className="">{job.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </>
  );
}
