import { serverFetch } from "../actions/core/mutation"

export const getApplications=async(applicantId)=>{
    
  return serverFetch(`/api/applications?applicantId=${applicantId}`)
}