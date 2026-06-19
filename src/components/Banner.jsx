"use client";

import Image from "next/image";
import {
  Briefcase,
   Magnifier,
  Persons,
  Star,
} from "@gravity-ui/icons";

const stats = [
  {
    icon: Briefcase,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: Magnifier,
    value: "12K",
    label: "Companies",
  },
  {
    icon: Persons,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Globe Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/globe.png"
          alt="Globe"
          fill
          priority
          className="object-cover object-center opacity-90"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 " />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-16 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-white md:text-5xl">
            Assisting over{" "}
            <span className="text-white">15,000</span>{" "}
            job seekers
          </h2>

          <p className="mt-3 text-xl text-gray-300 md:text-3xl">
            find their dream positions.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-white/10 p-6 backdrop-blur-md transition hover:border-violet-500/40"
              >
                <Icon className="h-5 w-5 text-white" />

                <h3 className="mt-10 text-4xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-gray-300">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}