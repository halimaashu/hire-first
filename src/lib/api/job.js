import { serverFetch } from "../actions/core/mutation";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
export const getJobs=async({companyId,status="active"})=>{
     const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
     return res.json();
}
export const  getAllJobs=async(path)=>{
     return serverFetch("/api/jobs")
    
}
export const  getDetailJob=async(id)=>{
     const res=await fetch(`${baseUrl}/api/allJobs/${id}`);
     return res.json()
}