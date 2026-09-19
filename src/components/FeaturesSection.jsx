import React from 'react';
import {
  Magnifier,
  BarsAscendingAlignLeft,
  Bookmark,
  ChartLine,
  LayoutHeaderCursor,
  Circle,
  FolderTree,
  LayoutCells,
} from '@gravity-ui/icons';

const features = [
  {
    icon: Magnifier,
    title: 'Smart Search',
    description: 'Find your ideal job with advanced filters.',
  },
  {
    icon: BarsAscendingAlignLeft,
    title: 'Top Companies',
    description: 'Apply to vetted companies that are hiring.',
  },
  {
    icon: Bookmark,
    title: 'Saved Jobs',
    description: 'Manage apps & favorites on your dashboard.',
  },
  {
    icon: ChartLine,
    title: 'Salary Insights',
    description: 'Get real salary data to negotiate confidently.',
  },
  {
    icon: LayoutHeaderCursor,
    title: 'One-Click Apply',
    description: 'Simplify your job applications for an easier process.',
  },
  {
    icon: Circle,
    title: 'Skill-Based Matching',
    description: 'Discover jobs that match your skills and experience.',
  },
  {
    icon: FolderTree,
    title: 'Career Growth Resources',
    description: 'Boost your career with quick interview tips.',
  },
  {
    icon: LayoutCells,
    title: 'Resume Builder',
    description: 'Create professional resumes with modern templates.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#0b0b0d] text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Top Tagline */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase">
            FEATURES JOB
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-14 text-gray-100">
          Everything you need <br className="hidden sm:inline" />
          to succeed
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-4 p-2 rounded-xl transition duration-200 hover:bg-zinc-900/50"
              >
                {/* Icon Box */}
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#141417] border border-zinc-800/80 text-purple-400 shadow-sm">
                  <IconComponent width={20} height={20} />
                </div>

                {/* Content */}
                <div className="pt-0.5">
                  <h3 className="text-sm font-semibold text-gray-200 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}