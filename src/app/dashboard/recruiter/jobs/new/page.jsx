import React from 'react';
import JobPostForm from './JobPostForm';
// import { getUser } from '@/lib/actions/core/session';
// import { getRecruiterCompany } from '@/lib/api/companyes';
import { getLoggedInRecruiterCompany } from '@/lib/api/companyes';


const page = async() => {
    // const user=await getUser();
    // const company=await getRecruiterCompany(user.id)
    const company=await getLoggedInRecruiterCompany()
    console.log(company,"from job post page")
    return (
        <div>
            <JobPostForm company={company}/> 
        </div>
    );
};

export default page;