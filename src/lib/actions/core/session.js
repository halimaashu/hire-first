import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export const getUser=async()=>{
const session=await auth.api.getSession({
    headers: await headers() // some endpoints might require headers
})
return session?.user ||null;
};
