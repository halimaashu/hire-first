'use server';

import { mutationServer, serverFetch } from "./core/mutation";

export const createJob = async (newJobData) => {
  return mutationServer("/jobs",newJobData);
};


// get all jobs
// http://localhost:5000/api/allJobs
export const getAllJobs=async()=>{
  return serverFetch("/api/allJobs")
}