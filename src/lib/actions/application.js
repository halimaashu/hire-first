// get mutation

import { mutationServer } from "./core/mutation"



export const postApplication=async(applicationData)=>{
    const apply=await mutationServer("/api/applications",applicationData)
}