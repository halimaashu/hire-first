// app/dashboard/page.jsx (or wherever your route sits)
import React from 'react';
import { Button } from "@heroui/react";

// Import your custom reusable components



// Import Gravity UI Icons for the feed mapping
import { FileText, Persons, Thunderbolt, CircleCheck } from '@gravity-ui/icons';
import MetricCard from './MetricCard';
import SplitFeatureSection from './SplitFeatureSection';

export default function JobPortalDemo() {
  // Analytical statistics dataset configuration
  const recruiterStatsData = [
    { id: 'job-posts', title: 'Total Job Posts', value: '48', icon: FileText },
    { id: 'applicants', title: 'Total Applicants', value: '1,284', icon: Persons },
    { id: 'active', title: 'Active Jobs', value: '18', icon: Thunderbolt },
    { id: 'closed', title: 'Jobs Closed', value: '32', icon: CircleCheck },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Workspace Portal Header */}
        <div className="border-b border-[#1e1e22] pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Main Hub Interface</h1>
            <p className="text-sm text-zinc-500 mt-0.5">Unified dashboard configuration for Recruiter and Seeker elements.</p>
          </div>
          <Button radius="md" variant="bordered" className="text-zinc-300 border-[#1e1e22] hover:bg-[#121214]">
            Settings Configuration
          </Button>
        </div>

        {/* 1.MAIN     METRICS GRID SECTION */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-zinc-400 tracking-wider uppercase">Live Analytics Feed</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {recruiterStatsData.map((stat) => (
              <MetricCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>

        <hr className="border-[#1e1e22]" />

       

      </div>
    </div>
  );
}