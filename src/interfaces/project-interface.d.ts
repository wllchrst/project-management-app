import { IJob } from "./job-interface";

export interface IProject {
  id: string;
  name: string;
  description: string;
  workers: string[];
  jobs: IJob[];
  background: string;
}
