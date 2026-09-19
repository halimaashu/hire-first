"use client";

import React, { useState } from "react";
import { Card, Button, Accordion, AccordionItem } from "@heroui/react";
import { ShieldCheck, Flame } from "@gravity-ui/icons";

export default function PricingPage() {
  // Toggle state: 'seekers' or 'recruiters'
  const [activeTab, setActiveTab] = useState("seekers");

  const seekerPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Essential tools for finding and saving jobs.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile visibility",
        "Standard email alerts",
      ],
      cta: "Current Plan",
      variant: "bordered",
      color: "default",
    },
    {
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
      variant: "solid",
      color: "primary",
      popular: true,
    },
    {
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
      variant: "flat",
      color: "secondary",
    },
  ];

  const recruiterPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for scaling teams starting their initial hunt.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management system",
        "Standard listing visibility",
        "Great for a company's first year",
      ],
      cta: "Start Free",
      variant: "bordered",
      color: "default",
    },
    {
      name: "Growth",
      price: "$39",
      period: "month",
      description: "Expanded allocations for active hiring managers.",
      features: [
        "Up to 10 active job posts",
        "Full applicant tracking pipelines",
        "Basic application analytics data",
        "Dedicated email support lines",
      ],
      cta: "Choose Growth",
      variant: "solid",
      color: "primary",
      popular: true,
    },
    {
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
      variant: "flat",
      color: "secondary",
    },
  ];

  const currentPlans = activeTab === "seekers" ? seekerPlans : recruiterPlans;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-16 px-4 sm:px-6 lg:px-8 text-neutral-900 dark:text-neutral-100">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Typography Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Flexible Plans for Everyone
          </h1>
          <p className="text-lg text-neutral-500 dark:text-neutral-400">
            Choose the perfect fit for your goals. Upgrade, downgrade, or cancel
            any time.
          </p>
        </div>

        {/* Custom Toggle Switch Component */}
        <div className="flex justify-center">
          <div className="bg-neutral-200/70 dark:bg-neutral-800 p-1.5 rounded-xl flex items-center gap-1 shadow-inner border border-neutral-300/40 dark:border-neutral-700">
            <button
              onClick={() => setActiveTab("seekers")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "seekers"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300"
              }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setActiveTab("recruiters")}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "recruiters"
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300"
              }`}
            >
              For Recruiters
            </button>
          </div>
        </div>

        {/* Responsive Pricing Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start pt-4">
          {currentPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-1 flex flex-col relative transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                plan.popular
                  ? "border-2 border-blue-500 dark:border-blue-400 shadow-md ring-4 ring-blue-500/10 dark:ring-blue-400/5 md:-translate-y-2 hover:md:-translate-y-3"
                  : "border border-neutral-200 dark:border-neutral-800 shadow-sm"
              }`}
            >
              {/* Highlight Badge for Popular/Growth Tiers */}
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Flame size={12} /> Most Popular
                </span>
              )}

              <Card.Header className="flex flex-col items-start p-6 pb-4 space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-neutral-400">
                  {plan.name}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-neutral-400 text-sm font-medium">
                    /{plan.period}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed pt-1">
                  {plan.description}
                </p>
              </Card.Header>

              <Card.Content className="p-6 pt-0 flex-grow">
                <div className="w-full border-t border-neutral-100 dark:border-neutral-800 my-4" />

                {/* Dynamic Plan Feature Loop */}
                <ul className="space-y-3.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm">
                      <div className="p-0.5 rounded-full bg-green-500/10 dark:bg-green-500/20 text-green-600 dark:text-green-400 mt-0.5 shrink-0">
                        <ShieldCheck size={14} />
                      </div>
                      <span className="text-neutral-600 dark:text-neutral-300 leading-normal">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card.Content>

              <Card.Footer className="p-6 pt-2">
                <form action="/api/checkout_sessions" method="POST">
                  <section>
                    <button
                      type="submit"
                      role="link"
                      className={`font-bold text-sm tracking-wide py-5 rounded-xl transition-all ${
                        plan.popular
                          ? "shadow-md shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white"
                          : ""
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </section>
                </form>
              </Card.Footer>
            </Card>
          ))}
        </div>

        {/* Divider Separation Break */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-16 mt-8" />

        {/* FAQ Accordion Component Layer */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-neutral-400">
              Everything you need to know about billing cycles, cancellations,
              and plans.
            </p>
          </div>

          <Accordion variant="splitted" className="px-0">
            <AccordionItem
              key="1"
              aria-label="How does subscription cancellation work?"
              title="Can I cancel my subscription anytime?"
              className="bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/50 shadow-xs rounded-xl"
            >
              <p className="text-sm text-neutral-500 dark:text-neutral-400 pb-4">
                Yes, absolutely. You can cancel your subscription inside your
                billing dashboard panel at any given moment. You will maintain
                complete access to your plan features until the end of your
                active billing period.
              </p>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="What is your policy regarding refunds?"
              title="What is your refund policy?"
              className="bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/50 shadow-xs rounded-xl"
            >
              <p className="text-sm text-neutral-500 dark:text-neutral-400 pb-4">
                We offer a 14-day window for complete refunds on initial
                purchases if you feel the platform didn't add adequate value.
                Reach out to our billing help desk, and we will handle it
                immediately.
              </p>
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Which payment methods do you support?"
              title="What payment methods do you support?"
              className="bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/50 shadow-xs rounded-xl"
            >
              <p className="text-sm text-neutral-500 dark:text-neutral-400 pb-4">
                We safely manage checkout operations using Stripe encryption
                keys. We accept all major networks including Visa, Mastercard,
                American Express, alongside native configurations for Apple Pay
                and Google Pay.
              </p>
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="Can I switch between plans midway through a billing cycle?"
              title="Can I switch plans midway through the month?"
              className="bg-white dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/50 shadow-xs rounded-xl"
            >
              <p className="text-sm text-neutral-500 dark:text-neutral-400 pb-4">
                Yes, you can upgrade or downgrade instantly. When upgrading or
                switching profiles, our engine automatically calculates a
                prorated balance, credited cleanly against your adjusted pricing
                target.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
