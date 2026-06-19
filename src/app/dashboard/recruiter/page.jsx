"use client";

import JobPortalDemo from '@/components/dashboard/JobPortalDemo';
import MetricCard from '@/components/dashboard/MetricCard';
import { getSession } from 'better-auth/api';
import React from 'react';

const recruiterPage = () => {
    const {user:session,isPending}=getSession();
    const user=session?.user;
    console.log(session,"from dash board page is recruiter")
    return (
        <div>
            <h1 className='text-3xl'>Well Come Back, MR. {user?.name}</h1>
          
            <JobPortalDemo/>
        </div>
    );
};

export default recruiterPage;