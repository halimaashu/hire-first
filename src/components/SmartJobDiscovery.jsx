import React from 'react';
import {
  MapPin,
  Briefcase,
  CircleDollar,
  ArrowRight,
} from '@gravity-ui/icons';
import Link from 'next/link';

const jobCards = [
  {
    id: 1,
    title: 'Frontend Developer',
    description:
      'Showcase your commitment to diversity and inclusion by highlighting initiatives',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25-€40/hour',
  },
  {
    id: 2,
    title: 'Frontend Developer',
    description:
      'Showcase your commitment to diversity and inclusion by highlighting initiatives',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25-€40/hour',
  },
  {
    id: 3,
    title: 'Frontend Developer',
    description:
      'Showcase your commitment to diversity and inclusion by highlighting initiatives',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25-€40/hour',
  },
  {
    id: 4,
    title: 'Frontend Developer',
    description:
      'Showcase your commitment to diversity and inclusion by highlighting initiatives',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25-€40/hour',
  },
  {
    id: 5,
    title: 'Frontend Developer',
    description:
      'Showcase your commitment to diversity and inclusion by highlighting initiatives',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25-€40/hour',
  },
  {
    id: 6,
    title: 'Frontend Developer',
    description:
      'Showcase your commitment to diversity and inclusion by highlighting initiatives',
    location: 'New York, USA',
    type: 'Hybrid',
    salary: '€25-€40/hour',
  },
];

export default function SmartJobDiscovery() {
  return (
    <section className="bg-[#08080a] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Top Tagline Badge */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
            SMART JOB DISCOVERY
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
        </div>

        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12 text-gray-100">
          The roles youd never <br className="hidden sm:inline" />
          find by searching
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left mb-12">
          {jobCards.map((job) => (
            <div
              key={job.id}
              className="bg-[#121215] border border-zinc-800/60 rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-700 transition duration-200"
            >
              <div>
                {/* Job Title */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {job.title}
                </h3>

                {/* Job Description */}
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {job.description}
                </p>

                {/* Badges / Details */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {/* Location Tag */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#1a1a20] text-gray-300 border border-zinc-800">
                    <MapPin className="w-3.5 h-3.5 text-pink-400" />
                    {job.location}
                  </span>

                  {/* Work Type Tag */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#1a1a20] text-gray-300 border border-zinc-800">
                    <Briefcase className="w-3.5 h-3.5 text-pink-400" />
                    {job.type}
                  </span>
                </div>

                {/* Salary Tag */}
                <div className="mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-[#1a1a20] text-gray-300 border border-zinc-800">
                    <CircleDollar className="w-3.5 h-3.5 text-pink-400" />
                    {job.salary}
                  </span>
                </div>
              </div>

              {/* Apply Link */}
              <div>
                <a
                  href="#"
                  className="inline-flex items-center text-xs font-semibold text-gray-200 hover:text-white group transition duration-150"
                >
                  Apply Now
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1 text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div>
         <Link href="/jobs">
          <button
            type="button"
            className="inline-flex items-center justify-center bg-white text-black font-semibold text-xs px-6 py-3 rounded-xl hover:bg-gray-200 transition duration-150"
          >
            View all job open
          </button>
         </Link>
        </div>
      </div>
    </section>
  );
}