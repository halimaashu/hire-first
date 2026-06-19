const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
export const getJobs=async({companyId,status="active"})=>{
     const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
     return res.json();
}