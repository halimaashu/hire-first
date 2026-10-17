"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Flame } from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const plans = {
  seekers: [
    {
      id: "seeker-free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Essential tools for finding and saving jobs.",
      features: [
        "Browse and save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile visibility",
        "Standard email alerts",
      ],
      cta: "Start free",
      free: true,
    },
    {
      id: "seeker-pro",
      name: "Pro",
      price: "$19",
      period: "month",
      description: "Accelerate your search with targeted tracking tools.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Advanced application tracking",
        "Exclusive salary insights",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      id: "seeker-premium",
      name: "Premium",
      price: "$39",
      period: "month",
      description: "Ultimate exposure and fast-tracked recruiter loops.",
      features: [
        "Everything in Pro",
        "Unlimited job applications",
        "Profile boost directly to recruiters",
        "Early access to newly posted jobs",
        "Priority customer support",
      ],
      cta: "Go Premium",
    },
  ],
  recruiters: [
    {
      id: "recruiter-free",
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for scaling teams starting their initial hunt.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management system",
        "Standard listing visibility",
        "Great for a company’s first year",
      ],
      cta: "Start free",
      free: true,
    },
    {
      id: "recruiter-growth",
      name: "Growth",
      price: "$39",
      period: "month",
      description: "Expanded allocations for active hiring managers.",
      features: [
        "Up to 10 active job posts",
        "Full applicant tracking pipelines",
        "Basic application analytics data",
        "Dedicated email support",
      ],
      cta: "Choose Growth",
      popular: true,
    },
    {
      id: "recruiter-enterprise",
      name: "Enterprise",
      price: "$149",
      period: "month",
      description: "Advanced branding features for larger organizations.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics dashboards",
        "Featured job listings placement",
        "Team collaboration modules",
        "Custom workspace branding",
        "Priority technical support",
      ],
      cta: "Contact Enterprise",
    },
  ],
};

const faqs = [
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes, absolutely. You can cancel from your billing dashboard at any moment. You keep full access to your plan features until the end of your current billing period.",
  },
  {
    q: "What is your refund policy?",
    a: "We offer a 14-day window for full refunds on initial purchases if the platform didn’t add enough value. Reach out to our billing help desk and we will handle it right away.",
  },
  {
    q: "What payment methods do you support?",
    a: "Checkout is handled securely by Stripe. We accept all major networks including Visa, Mastercard and American Express, plus Apple Pay and Google Pay.",
  },
  {
    q: "Can I switch plans midway through the month?",
    a: "Yes, you can upgrade or downgrade instantly. When you switch, we automatically calculate a prorated balance and credit it against your new price.",
  },
];

const tabs = [
  { key: "seekers", label: "For job seekers" },
  { key: "recruiters", label: "For recruiters" },
];

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("seekers");
  const currentPlans = plans[activeTab];

  return (
    <div
      className={`${body.className} min-h-screen bg-slate-50 px-4 py-14 text-slate-900 dark:bg-[#050B1A] dark:text-slate-100 sm:px-6 sm:py-20 lg:px-8`}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1
            className={`${display.className} text-balance text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl`}
          >
            Flexible plans for everyone
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 sm:text-lg">
            Choose the perfect fit for your goals. Upgrade, downgrade, or cancel
            any time.
          </p>
        </div>

        {/* Audience toggle */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Pricing audience"
            className="flex w-full max-w-sm items-center gap-1 rounded-xl border border-slate-200 bg-white p-1.5 dark:border-white/10 dark:bg-white/5 sm:w-auto sm:max-w-none"
          >
            {tabs.map((tab) => {
              const selected = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:flex-none sm:px-6 ${
                    selected
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Plans */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch lg:gap-8">
          {currentPlans.map((plan) => (
            <article
              key={plan.id}
              className={`relative flex flex-col rounded-3xl p-7 transition-shadow sm:p-8 ${
                plan.popular
                  ? "bg-blue-600 text-white shadow-xl shadow-blue-600/25 dark:shadow-blue-600/20"
                  : "border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700 shadow-sm">
                  <Flame width={12} height={12} aria-hidden="true" />
                  Most popular
                </span>
              )}

              <h2
                className={`${display.className} text-xl font-bold ${
                  plan.popular ? "text-white" : "text-slate-950 dark:text-white"
                }`}
              >
                {plan.name}
              </h2>

              <p className="mt-4 flex items-baseline gap-1">
                <span
                  className={`${display.className} text-5xl font-extrabold tracking-tight`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm font-medium ${
                    plan.popular
                      ? "text-blue-100"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  /{plan.period}
                </span>
              </p>

              <p
                className={`mt-3 text-sm leading-relaxed ${
                  plan.popular
                    ? "text-blue-100"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {plan.description}
              </p>

              <ul
                className={`mt-6 flex-grow space-y-3.5 border-t pt-6 ${
                  plan.popular
                    ? "border-white/20"
                    : "border-slate-200 dark:border-white/10"
                }`}
              >
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                        plan.popular
                          ? "bg-white/20 text-white"
                          : "bg-blue-600/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400"
                      }`}
                    >
                      <Check width={12} height={12} aria-hidden="true" />
                    </span>
                    <span
                      className={
                        plan.popular
                          ? "text-white"
                          : "text-slate-700 dark:text-slate-300"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {plan.free ? (
                  <Link
                    href="/signup"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 px-5 py-3.5 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
                  >
                    {plan.cta}
                  </Link>
                ) : (
                  <form action="/api/checkout_sessions" method="POST">
                    <input type="hidden" name="plan" value={plan.id} />
                    <input type="hidden" name="audience" value={activeTab} />
                    <button
                      type="submit"
                      className={`w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                        plan.popular
                          ? "bg-white text-blue-700 hover:bg-blue-50 focus-visible:ring-white focus-visible:ring-offset-blue-600"
                          : "bg-blue-600 text-white hover:bg-blue-500 focus-visible:ring-blue-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0B1530]"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </form>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* FAQ */}
        <div className="mx-auto mt-20 max-w-3xl border-t border-slate-200 pt-16 dark:border-white/10 sm:mt-24">
          <div className="text-center">
            <h2
              className={`${display.className} text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-3xl`}
            >
              Frequently asked questions
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 sm:text-base">
              Everything you need to know about billing, cancellations and
              plans.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-slate-200 bg-white px-5 dark:border-white/10 dark:bg-[#0B1530]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg py-4 text-left text-sm font-semibold text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-white sm:text-base [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className="flex-shrink-0 text-blue-600 transition-transform group-open:rotate-180 dark:text-blue-400"
                  />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}