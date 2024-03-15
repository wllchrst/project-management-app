import {
  Timestamp,
  addDoc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { IProject } from "../interfaces/project-interface";
import { v4 } from "uuid";
import { jobChatCollection, projectCollection } from "../utils/firebase";
import {
  failedResponse,
  isPast,
  postImage,
  successResponse,
  timestampToDate,
} from "./utility";
import { IJob } from "../interfaces/job-interface";
import { Status } from "../enums/job-status-enum";
import { IChatGroup } from "../interfaces/chat-group-interface";

async function getProjectByID(id: string) {
  const q = query(projectCollection, where("id", "==", id));
  const snapshot = await getDocs(q);
  return snapshot.docs[0];
}

async function createProject(project: IProject) {
  const buildProject: IProject = {
    id: v4(),
    background: "",
    description: project.description,
    name: project.name,
    jobs: [],
    workers: project.workers,
  };

  if (!project.name.trim()) {
    return failedResponse("Project name is required", null);
  } else if (!project.description.trim()) {
    return failedResponse("Project description is required", null);
  }

  try {
    addDoc(projectCollection, buildProject);
    return successResponse("Added new project", null);
  } catch (error) {
    console.log(error);
    return failedResponse("Something went wrong", null);
  }
}

async function updateProject(project: IProject) {
  try {
    const doc = await getProjectByID(project.id);
    await updateDoc(doc.ref, project as any);
    return successResponse("Updated Project", null);
  } catch (error) {
    console.log(error);
    return failedResponse("Failed updating project", null);
  }
}

async function editBackground(project: IProject, file: File) {
  try {
    const link = await postImage(file);
    project.background = link;
    const response = await updateProject(project);
    if (response.success) return successResponse("Editted background", null);
    else return failedResponse("failed editting background", null);
  } catch (error) {
    console.log(error);
    return failedResponse("failed editting background", null);
  }
}

function validateJob(job: IJob) {
  if (job.title == "" || job.description == "" || !job.deadline)
    return "Every field is required";

  if (isPast(job.deadline)) return "Deadline must be in the future";
  return null;
}

async function createNewJob(project: IProject, jobInput: IJob) {
  const job: IJob = {
    id: v4(),
    deadline: jobInput.deadline,
    description: jobInput.description,
    status: Status.ONGOING,
    title: jobInput.title,
    workers: [],
  };

  const validation = validateJob(job);
  if (validation != null) {
    return failedResponse(validation, null);
  }

  try {
    project.jobs.push(job);
    const response = await updateProject(project);
    if (response.success)
      return successResponse("Success adding new job", null);
    else return failedResponse("Failed adding new job", null);
  } catch (error) {
    console.log(error);
    return failedResponse("Failed creating adding new job", null);
  }
}

async function addParticipant(email: string, project: IProject, jobId: string) {
  for (const job of project.jobs) {
    if (job.id === jobId) {
      if (!job.workers.includes(email)) job.workers.push(email);
      else
        return failedResponse("You are already participating this job", null);
    }
  }

  try {
    const response = await updateProject(project);
    if (response.success)
      return successResponse("You are not participating in the job", null);
    return failedResponse("Something went wrong please try again later", null);
  } catch (error) {
    console.log(error);
    return failedResponse("Something went wrong please try again later", null);
  }
}

async function addUserToProject(project: IProject, email: string) {
  if (project.workers.includes(email))
    return failedResponse(`${email} is already on this project.`, null);

  project.workers.push(email);

  try {
    const response = await updateProject(project);
    if (response.success)
      return successResponse("Added new Partner to the project", null);
    return failedResponse("something went wrong please try again later", null);
  } catch (error) {
    console.log(error);
    return failedResponse("something went wrong please try again later", null);
  }
}

async function chatJob(jobId: string, email: string, message: string) {
  const chat: IChatGroup = {
    id: jobId,
    from: email,
    created: Timestamp.fromDate(new Date()),
    message: message,
  };

  try {
    await addDoc(jobChatCollection, chat);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function makeJobDone(project: IProject, jobInput: IJob) {
  for (const job of project.jobs) {
    if (job.id == jobInput.id) job.status = Status.DONE;
  }

  try {
    const response = await updateProject(project);
    if (!response.success) return failedResponse(response.message, null);
    return successResponse("Success marking the job", null);
  } catch (error) {
    console.log(error);
    return failedResponse("something went wrong please try again later", null);
  }
}

export {
  createProject,
  makeJobDone,
  chatJob,
  editBackground,
  createNewJob,
  addParticipant,
  addUserToProject,
};
