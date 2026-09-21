import React from "react";
import { Check, Gear, Globe } from "@gravity-ui/icons";
import Image from "next/image";

const profiles = [
  {
    name: "Candidate 1",
    role: "Product Designer",
    avatar: "/images/manCartoon.jpg",
    bgAccent: "bg-teal-500/20",
  },
  {
    name: "Candidate 2",
    role: "UX Designer",
    avatar: "/images/wemanCartoon.jpg",
    bgAccent: "bg-pink-500/20",
  },
  {
    name: "ms. Johnson",
    role: "HR Recruiter",
    avatar: "/images/recruiterCartoon.jpg",
    bgAccent: "bg-purple-500/20",
  },
];

export default function GlobalTalentSection() {
  return (
    <section className="bg-[#0b0b0d] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Dot Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Outer Container Border Frame */}
        <div className="border border-zinc-800/80 rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-zinc-900/40 to-transparent backdrop-blur-sm">
          
          {/* Top Profile Cards Container */}
          <div className="relative flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-12">
            
            {/* Horizontal Connecting Line behind cards */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/60 to-transparent -z-10" />

            {/* Profile 1 & 2 Group */}
            <div className="flex gap-4 sm:gap-6">
              {profiles.slice(0, 2).map((profile, idx) => (
                <div
                  key={idx}
                  className="bg-[#141417] border border-zinc-800/90 rounded-2xl p-5 w-44 sm:w-48 text-center shadow-xl transition-transform duration-300 hover:-translate-y-1"
                >
                  {/* Avatar Container */}
                  <div className="relative inline-block mb-3">
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 ${profile.bgAccent}`}>
                      <Image
                        src={profile.avatar}
                        alt={profile.name}
                        fill
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    {/* Verified Green Badge */}
                    <div className="absolute top-0 right-0 bg-emerald-400 text-black p-1 rounded-full border-2 border-[#141417]">
                      <Check className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Name and Role */}
                  <h3 className="text-sm sm:text-base font-semibold text-gray-100">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{profile.role}</p>
                </div>
              ))}
            </div>

            {/* Connecting Spinner Icon */}
            <div className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700/60 text-gray-400 my-auto">
              <Gear className="w-4 h-4 animate-spin text-gray-400" />
            </div>

            {/* Profile 3 */}
            <div className="bg-[#141417] border border-zinc-800/90 rounded-2xl p-5 w-44 sm:w-48 text-center shadow-xl transition-transform duration-300 hover:-translate-y-1">
              <div className="relative inline-block mb-3">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 ${profiles[2].bgAccent}`}>
                  <Image
                    src={profiles[2].avatar}
                    fill
                    alt={profiles[2].name}
                   
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute top-0 right-0 bg-emerald-400 text-black p-1 rounded-full border-2 border-[#141417]">
                  <Check className="w-3 h-3" />
                </div>
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-100">
                {profiles[2].name}
              </h3>
              <p className="text-xs text-gray-400 mt-1">{profiles[2].role}</p>
            </div>
          </div>

          {/* Bottom Heading & Description */}
          <div className="text-center max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
              <Globe className="w-3.5 h-3.5" />
              <span>GLOBAL RECRUITMENT</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
              Find global & multilingual talent
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Build and scale your worldwide hiring effortlessly with direct access to vetted candidate profiles across top technical and creative fields.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}