"use client";

import {  Input, Button, Chip, Card } from "@heroui/react";
import { Magnifier } from "@gravity-ui/icons";

export default function Bannertop() {
  const tags = [
    "Product Designer",
    "AI Engineering",
    "DevOps Engineer",
  ];

  return (
    <Card>
      <main className="relative min-h-screen overflow-hidden bg-black">
        {/* Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#312e81_0%,#000_50%)]" />

        {/* Glow Effect */}
        <div className="absolute bottom-0 left-1/2 h-60 w-[500px] -translate-x-1/2 rounded-full bg-violet-600/30 blur-[120px]" />

        <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <div className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <span>🔥</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-gray-300 sm:text-xs">
              50,000+ New Jobs This Month
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-5xl text-2xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Find Your Dream Job Today
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
            HireLoop connects top talent with world-class companies.
            Browse thousands of curated opportunities and land your next role —
            faster.
          </p>

          {/* Search Box */}
          <div className="mt-10 w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
            <div className="flex flex-col gap-2 md:flex-row">
              <Input
                size="lg"
                variant="flat"
                radius="lg"
                placeholder="Job title, skill or company"
                startContent={<Magnifier />}
                className="flex-1"
              />

              <Input
                size="lg"
                variant="flat"
                radius="lg"
                placeholder="Location or Remote"
                className="flex-1"
              />

              <Button
                color="primary"
                size="lg"
                isIconOnly
                className="h-12 min-w-[60px]"
              >
                <Magnifier />
              </Button>
            </div>
          </div>

          {/* Trending Tags */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-gray-500 sm:text-sm">
              Trending Position
            </span>

            {tags.map((tag) => (
              <Chip
                key={tag}
                variant="bordered"
                className="border-white/10 text-gray-300"
              >
                {tag}
              </Chip>
            ))}
          </div>
        </section>
      </main>
    </Card>
  );
}