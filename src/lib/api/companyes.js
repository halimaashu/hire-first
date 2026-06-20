import { serverFetch } from "../actions/core/mutation"

export const getRecruiterCompany=async(recruiterId)=>{
return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`)
}