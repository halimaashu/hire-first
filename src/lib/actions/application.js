// get mutation

import { mutationServer, serverFetch } from "./core/mutation"



export const postApplication=async(applicationData)=>{
    const apply=await mutationServer("/api/applications",applicationData)
}

// http://localhost:5000/api/applications?applicantId=6aadeeda6f0215d9e7c2f1a7
export const getApplicationByApplicantID=async(userid)=>{
    return serverFetch(`/api/applications?applicantId=${userid}`)
}