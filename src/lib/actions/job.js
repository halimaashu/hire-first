'use server';

import { mutationServer } from "./core/mutation";

export const createJob = async (newJobData) => {
  return mutationServer("/jobs",newJobData);
};
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");

// export const createJob = async (newJobData) => {
//   console.log("Posting to:", `${baseUrl}/jobs`); // 👈 add this temporarily to confirm URL

//   const res = await fetch(`${baseUrl}/jobs`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newJobData),
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     console.error(`API error ${res.status}:`, text);
//     return { ok: false, error: `Server error: ${res.status}` };
//   }

//   const data = await res.json();
//   return { ok: true, data };
// };