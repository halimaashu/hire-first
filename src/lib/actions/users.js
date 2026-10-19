import { serverFetch } from "./core/mutation"

export const getAllUsers=async()=>{
    return await  serverFetch("/users")

}