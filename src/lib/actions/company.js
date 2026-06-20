'use server';

import { mutationServer } from "./core/mutation";







// right code but repetad code
export const registerCompany = async (newCompanyData) => {
 return mutationServer("/api/companies", newCompanyData);
};