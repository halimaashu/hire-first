'use server';

import { mutationServer, serverFetch } from "./core/mutation";







// right code but repetad code
export const registerCompany = async (newCompanyData) => {
 return mutationServer("/api/companies", newCompanyData);
};

// get all companies
export const getALlCompanies=async(req,res)=>{
    return await serverFetch("/api/companies")
}