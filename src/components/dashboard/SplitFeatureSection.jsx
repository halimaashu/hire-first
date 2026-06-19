// components/SplitFeatureSection.jsx
import React from "react";
import { Card, Button, Chip } from "@heroui/react";
import { ChevronRight } from "@gravity-ui/icons";

export default function SplitFeatureSection({
  title,
  highlightText,
  description,
  points = [],
  ctaText,
  badgeText,
  reversed = false,
  theme = "dark",
}) {
  const isDark = theme === "dark";

  return (
    <Card
      className={`p-6 md:p-8 border transition-all duration-300 ${
        isDark
          ? "bg-zinc-950 text-white border-zinc-900"
          : "bg-white text-zinc-900 border-zinc-200"
      }`}
      variant={isDark ? "tertiary" : "default"}
    >
      <Card.Content className="p-0 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Content info */}
        <div className={`space-y-6 ${reversed ? "lg:order-last" : ""}`}>
          {badgeText && (
            <Chip
              variant="flat"
              color={isDark ? "secondary" : "primary"}
              className={
                isDark
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "bg-indigo-50 text-indigo-600"
              }
              size="sm"
            >
              {badgeText}
            </Chip>
          )}

          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
            {title}{" "}
            <span className={isDark ? "text-cyan-400" : "text-indigo-600"}>
              {highlightText}
            </span>
          </h2>

          <p
            className={`text-base ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
          >
            {description}
          </p>

          {/* Checklist Points */}
          {points.length > 0 && (
            <ul className="space-y-2.5">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span
                    className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isDark
                        ? "bg-cyan-500/20 text-cyan-400"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    ✓
                  </span>
                  <span className={isDark ? "text-zinc-300" : "text-zinc-700"}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Call to Action Button */}
          <div className="pt-2">
            <Button
              size="md"
              radius="xl"
              endContent={<ChevronRight size={16} />}
              className={`font-semibold transition-transform hover:-translate-y-0.5 ${
                isDark
                  ? "bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:bg-cyan-300"
                  : "bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
              }`}
            >
              {ctaText}
            </Button>
          </div>
        </div>

        {/* Right Side: Sleek Bento Box Dashboard Mockup Graphic */}
        <div
          className={`p-8 w-full aspect-video rounded-xl border flex flex-col justify-between ${
            isDark
              ? "bg-zinc-900/40 border-zinc-800/80"
              : "bg-zinc-50 border-zinc-200"
          }`}
        >
          <div className="space-y-2">
            <div
              className={`h-3 w-1/4 rounded ${isDark ? "bg-zinc-800" : "bg-zinc-300"}`}
            ></div>
            <div
              className={`h-6 w-1/2 rounded-md ${isDark ? "bg-zinc-700" : "bg-zinc-400"}`}
            ></div>
          </div>

          {/* Nested Dashboard UI Card element */}
          <Card
            className={`p-4 border ${isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-zinc-200"} shadow-lg`}
            variant={isDark ? "transparent" : "default"}
          >
            <Card.Content className="p-0 flex flex-row gap-3 items-center">
              <div
                className={`w-8 h-8 rounded-full flex-shrink-0 ${isDark ? "bg-cyan-500/20" : "bg-indigo-100"}`}
              ></div>
              <div className="flex-1 space-y-1.5">
                <div
                  className={`h-2.5 w-1/3 rounded ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
                ></div>
                <div
                  className={`h-2 w-2/3 rounded ${isDark ? "bg-zinc-800" : "bg-zinc-200"}`}
                ></div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </Card.Content>
    </Card>
  );
}
