import React from 'react';
import JobsTrialPage from './JobsTrialPage';
import { getAllJobs } from '@/lib/api/job';

const browseAllJobPage =async () => {
    const allJob=await getAllJobs()

    return (
        <div>
            <JobsTrialPage allJob={allJob}/>
        </div>
    );
};

export default browseAllJobPage;