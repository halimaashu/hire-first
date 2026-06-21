import { serverFetch } from "../actions/core/mutation"
import { getUser } from "../actions/core/session"

export const getRecruiterCompany=async(recruiterId)=>{
return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`)
}
export const getLoggedInRecruiterCompany=async()=>{
     const user=await getUser();
     return getRecruiterCompany(user?.id)

}