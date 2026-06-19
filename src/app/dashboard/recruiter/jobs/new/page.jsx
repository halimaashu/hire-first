"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createJob } from "@/lib/actions/job";
import { useRouter } from "next/navigation";

// ── Icons (Gravity UI) ───────────────────────────────────────────────────────
import {
  Briefcase,
  Factory,
  Globe,
  MapPin,
  Calendar,
  ArrowUpFromLine,
  ChevronDown,
  CircleCheck,
  TriangleExclamation,
  Xmark,
} from "@gravity-ui/icons";

// ── Animation variants ───────────────────────────────────────────────────────
const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (d) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: d },
  }),
};

const collapseVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      height: { duration: 0.3, ease: "easeOut" },
      opacity: { duration: 0.2, delay: 0.08 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      opacity: { duration: 0.15 },
      height: { duration: 0.25, ease: "easeIn" },
    },
  },
};

// ── Reusable field components ────────────────────────────────────────────────

function FieldLabel({ children, required }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1.5">
      {children}
      {required && <span className="text-rose-500 ml-1">*</span>}
    </label>
  );
}

function TextInput({ icon: Icon, error, className = "", ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <Icon className="w-4 h-4 text-neutral-500" />
        </div>
      )}
      <input
        {...props}
        className={`
          w-full bg-[#0f0f11] border rounded-lg h-11 text-sm text-white placeholder-neutral-600
          focus:outline-none focus:ring-2 transition-all duration-200
          ${Icon ? "pl-9 pr-3" : "px-3"}
          ${error
            ? "border-rose-500/70 focus:ring-rose-500/30"
            : "border-neutral-800 focus:border-neutral-600 focus:ring-neutral-600/20"
          }
          ${className}
        `}
      />
      {error && (
        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
          <TriangleExclamation className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function TextareaInput({ error, className = "", ...props }) {
  return (
    <div>
      <textarea
        {...props}
        className={`
          w-full bg-[#0f0f11] border rounded-lg p-3 text-sm text-white placeholder-neutral-600
          focus:outline-none focus:ring-2 transition-all duration-200 resize-none
          ${error
            ? "border-rose-500/70 focus:ring-rose-500/30"
            : "border-neutral-800 focus:border-neutral-600 focus:ring-neutral-600/20"
          }
          ${className}
        `}
      />
      {error && (
        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
          <TriangleExclamation className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function SelectInput({ value, onChange, options, placeholder, error }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  React.useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className={`
          w-full bg-[#0f0f11] border rounded-lg h-11 px-3 flex items-center justify-between
          text-sm transition-all duration-200 focus:outline-none focus:ring-2
          ${error
            ? "border-rose-500/70 focus:ring-rose-500/30"
            : "border-neutral-800 focus:border-neutral-600 focus:ring-neutral-600/20"
          }
          ${value ? "text-white" : "text-neutral-600"}
        `}
      >
        {selected ? selected.label : placeholder}
        <ChevronDown
          className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 w-full bg-[#18181b] border border-neutral-800 rounded-lg overflow-hidden shadow-xl max-h-56 overflow-y-auto"
          >
            {options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`
                  px-3 py-2.5 text-sm cursor-pointer transition-colors duration-150
                  ${value === opt.value
                    ? "bg-neutral-800 text-white"
                    : "text-neutral-300 hover:bg-neutral-800/60"
                  }
                `}
              >
                {opt.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {error && (
        <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
          <TriangleExclamation className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2.5 group"
    >
      <div
        className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${checked ? "bg-violet-600" : "bg-neutral-700"}`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0.5"}`}
        />
      </div>
      <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
        {label}
      </span>
    </button>
  );
}

// ── Toast notification ───────────────────────────────────────────────────────
function Toast({ type, message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className={`
        fixed bottom-6 right-6 z-50 flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl border max-w-sm
        ${type === "success"
          ? "bg-emerald-950 border-emerald-800 text-emerald-300"
          : "bg-rose-950 border-rose-800 text-rose-300"
        }
      `}
    >
      {type === "success"
        ? <CircleCheck className="w-5 h-5 shrink-0 mt-0.5" />
        : <TriangleExclamation className="w-5 h-5 shrink-0 mt-0.5" />
      }
      <p className="text-sm leading-snug">{message}</p>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity">
        <Xmark className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

// ── Section card wrapper ─────────────────────────────────────────────────────
function SectionCard({ step, title, subtitle, icon: Icon, delay, children }) {
  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible" custom={delay}>
      <div className="bg-[#121214] border border-neutral-800/80 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-7 pt-7 pb-5 border-b border-neutral-800/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-600/15 border border-violet-500/20 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-violet-500">
                Step {step}
              </span>
              <h2 className="text-sm font-semibold text-neutral-100">{title}</h2>
            </div>
          </div>
          {subtitle && (
            <p className="mt-2 text-xs text-neutral-500 leading-relaxed">{subtitle}</p>
          )}
        </div>
        <div className="px-7 py-6 space-y-5">{children}</div>
      </div>
    </motion.div>
  );
}

// ── Option sets ──────────────────────────────────────────────────────────────
const INDUSTRIES = [
  { value: "technology", label: "Technology & Software" },
  { value: "design", label: "Design & Creative" },
  { value: "marketing", label: "Marketing & Growth" },
  { value: "finance", label: "Finance & Accounting" },
  { value: "healthcare", label: "Healthcare & Medical" },
  { value: "education", label: "Education & Training" },
  { value: "ecommerce", label: "E-commerce & Retail" },
  { value: "manufacturing", label: "Manufacturing & Engineering" },
  { value: "legal", label: "Legal & Compliance" },
  { value: "other", label: "Other" },
];

const EMPLOYEE_RANGES = [
  { value: "1-10", label: "1–10 employees (Startup)" },
  { value: "11-50", label: "11–50 employees (Small)" },
  { value: "51-200", label: "51–200 employees (Mid-size)" },
  { value: "201-500", label: "201–500 employees (Growing)" },
  { value: "501-1000", label: "501–1,000 employees (Large)" },
  { value: "1000+", label: "1,000+ employees (Enterprise)" },
];

const JOB_CATEGORIES = [
  { value: "engineering", label: "Engineering & Development" },
  { value: "design", label: "Design & UX" },
  { value: "product", label: "Product Management" },
  { value: "marketing", label: "Marketing & Content" },
  { value: "sales", label: "Sales & Business Dev" },
  { value: "operations", label: "Operations & Admin" },
  { value: "data", label: "Data & Analytics" },
  { value: "hr", label: "Human Resources" },
  { value: "finance", label: "Finance & Legal" },
  { value: "customer-success", label: "Customer Success" },
];

const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
];

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level (0–2 years)" },
  { value: "mid", label: "Mid Level (2–5 years)" },
  { value: "senior", label: "Senior Level (5–8 years)" },
  { value: "lead", label: "Lead / Principal (8+ years)" },
  { value: "executive", label: "Executive / C-Level" },
];

const CURRENCIES = [
  { value: "USD", label: "USD $" },
  { value: "EUR", label: "EUR €" },
  { value: "GBP", label: "GBP £" },
  { value: "BDT", label: "BDT ৳" },
  { value: "INR", label: "INR ₹" },
];

// ── Main form ────────────────────────────────────────────────────────────────
export default function JobPostForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const [logoFile, setLogoFile] = useState(null);
  const [isRemote, setIsRemote] = useState(false);

  const [industry, setIndustry] = useState("");
  const [employeeRange, setEmployeeRange] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [currency, setCurrency] = useState("USD");

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = (data) => {
    const e = {};
    if (!data.companyName?.trim()) e.companyName = "Company name is required";
    if (!industry) e.industry = "Select an industry";
    if (!data.websiteUrl?.trim()) e.websiteUrl = "Website URL is required";
    else if (!/^https?:\/\/.+/.test(data.websiteUrl))
      e.websiteUrl = "Enter a valid URL starting with http:// or https://";
    if (!data.companyLocation?.trim()) e.companyLocation = "Location is required";
    if (!employeeRange) e.employeeRange = "Select company size";
    if (!data.companyDescription?.trim()) e.companyDescription = "Description is required";
    else if (data.companyDescription.trim().length < 50)
      e.companyDescription = "Write at least 50 characters";

    if (!data.jobTitle?.trim()) e.jobTitle = "Job title is required";
    if (!jobCategory) e.jobCategory = "Select a job category";
    if (!jobType) e.jobType = "Select employment type";
    if (!experienceLevel) e.experienceLevel = "Select experience level";
    if (!data.minSalary) e.minSalary = "Enter minimum salary";
    if (!data.maxSalary) e.maxSalary = "Enter maximum salary";
    if (data.minSalary && data.maxSalary && Number(data.minSalary) >= Number(data.maxSalary))
      e.maxSalary = "Max must be greater than min";
    if (!isRemote) {
      if (!data.jobCity?.trim()) e.jobCity = "City is required for on-site roles";
      if (!data.jobCountry?.trim()) e.jobCountry = "Country is required for on-site roles";
    }
    if (!data.deadline) e.deadline = "Application deadline is required";
    else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(data.deadline) <= today) e.deadline = "Deadline must be a future date";
    }
    if (!data.responsibilities?.trim()) e.responsibilities = "Responsibilities are required";
    else if (data.responsibilities.trim().length < 30)
      e.responsibilities = "Provide more detail (min 30 characters)";
    if (!data.requirements?.trim()) e.requirements = "Requirements are required";
    else if (data.requirements.trim().length < 30)
      e.requirements = "Provide more detail (min 30 characters)";
    return e;
  };

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const raw = Object.fromEntries(formData.entries());

    const payload = {
      ...raw,
      industry,
      employeeRange,
      jobCategory,
      jobType,
      experienceLevel,
      currency,
      isRemote,
      status:"active",
      companyId:"company_123"
    };

    const validationErrors = validate(payload);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      document.getElementById(firstKey)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setLoading(true);

    let shouldRedirect = false;

    try {
      const response = await createJob(payload);

      if (response.ok) {
        setToast({ type: "success", message: "Job post published successfully!" });
        shouldRedirect = true;
        e.target.reset();
        setIndustry(""); setEmployeeRange(""); setJobCategory("");
        setJobType(""); setExperienceLevel(""); setCurrency("USD");
        setIsRemote(false); setLogoFile(null);
      } else {
        setToast({ type: "error", message: response.error || "Failed to publish. Try again." });
      }
    } catch (err) {
      console.error("Submission error:", err);
      setToast({ type: "error", message: "Something went wrong. Check your connection." });
    } finally {
      setLoading(false);
    }

    if (shouldRedirect) {
      setTimeout(() => router.push("/dashboard/recruiter/jobs"), 1200);
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

      {/* Page heading */}
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" custom={0}>
        <h1 className="text-xl font-bold text-white">Post a New Job</h1>
        <p className="text-sm text-neutral-500 mt-1">
          Fill in both sections to publish your listing. Fields marked{" "}
          <span className="text-rose-400">*</span> are required.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">

        {/* ── STEP 1: COMPANY ─────────────────────────────────────────────── */}
        <SectionCard
          step={1}
          title="Company Profile"
          subtitle="This information represents your company to candidates. Keep it accurate and professional."
          icon={Factory}
          delay={0.05}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div id="companyName">
              <FieldLabel required>Company Name</FieldLabel>
              <TextInput
                name="companyName"
                placeholder="e.g. Acme Technologies"
                error={errors.companyName}
              />
            </div>
            <div id="industry">
              <FieldLabel required>Industry</FieldLabel>
              <SelectInput
                value={industry}
                onChange={setIndustry}
                options={INDUSTRIES}
                placeholder="Select industry"
                error={errors.industry}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div id="websiteUrl">
              <FieldLabel required>Website URL</FieldLabel>
              <TextInput
                name="websiteUrl"
                type="url"
                icon={Globe}
                placeholder="https://www.company.com"
                error={errors.websiteUrl}
              />
            </div>
            <div id="companyLocation">
              <FieldLabel required>Headquarters</FieldLabel>
              <TextInput
                name="companyLocation"
                icon={MapPin}
                placeholder="e.g. Dhaka, Bangladesh"
                error={errors.companyLocation}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <div id="employeeRange">
              <FieldLabel required>Company Size</FieldLabel>
              <SelectInput
                value={employeeRange}
                onChange={setEmployeeRange}
                options={EMPLOYEE_RANGES}
                placeholder="Select size"
                error={errors.employeeRange}
              />
            </div>
            <div>
              <FieldLabel>Company Logo</FieldLabel>
              <label className="flex items-center gap-3 bg-[#0f0f11] border border-dashed border-neutral-800 rounded-lg px-4 h-11 cursor-pointer hover:border-neutral-600 transition-colors duration-200 group">
                <ArrowUpFromLine className="w-4 h-4 text-neutral-500 group-hover:text-neutral-300 transition-colors shrink-0" />
                <span className="text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors truncate">
                  {logoFile ? logoFile.name : "Upload PNG or JPG (max 5MB)"}
                </span>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  name="logo"
                  className="hidden"
                  onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                />
              </label>
            </div>
          </div>

          <div id="companyDescription">
            <FieldLabel required>Company Description</FieldLabel>
            <TextareaInput
              name="companyDescription"
              placeholder="Describe your company's mission, culture, and what makes it a great place to work. (min 50 characters)"
              rows={4}
              error={errors.companyDescription}
            />
          </div>
        </SectionCard>

        {/* ── STEP 2: JOB DETAILS ─────────────────────────────────────────── */}
        <SectionCard
          step={2}
          title="Job Details"
          subtitle="Define the role clearly. Specific, honest listings attract better candidates."
          icon={Briefcase}
          delay={0.1}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div id="jobTitle">
              <FieldLabel required>Job Title</FieldLabel>
              <TextInput
                name="jobTitle"
                placeholder="e.g. Senior React Developer"
                error={errors.jobTitle}
              />
            </div>
            <div id="jobCategory">
              <FieldLabel required>Category</FieldLabel>
              <SelectInput
                value={jobCategory}
                onChange={setJobCategory}
                options={JOB_CATEGORIES}
                placeholder="Select category"
                error={errors.jobCategory}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div id="jobType">
              <FieldLabel required>Employment Type</FieldLabel>
              <SelectInput
                value={jobType}
                onChange={setJobType}
                options={JOB_TYPES}
                placeholder="Select type"
                error={errors.jobType}
              />
            </div>
            <div id="experienceLevel">
              <FieldLabel required>Experience Level</FieldLabel>
              <SelectInput
                value={experienceLevel}
                onChange={setExperienceLevel}
                options={EXPERIENCE_LEVELS}
                placeholder="Select level"
                error={errors.experienceLevel}
              />
            </div>
          </div>

          {/* Salary */}
          <div>
            <FieldLabel required>Salary Range (Annual)</FieldLabel>
            <div className="flex gap-2 items-start">
              <div className="w-32 shrink-0">
                <SelectInput
                  value={currency}
                  onChange={setCurrency}
                  options={CURRENCIES}
                  placeholder="Currency"
                />
              </div>
              <div id="minSalary" className="flex-1">
                <TextInput
                  name="minSalary"
                  type="number"
                  min="0"
                  placeholder="Min"
                  error={errors.minSalary}
                />
              </div>
              <div className="flex items-center h-11 text-neutral-600 text-sm shrink-0 px-1">to</div>
              <div id="maxSalary" className="flex-1">
                <TextInput
                  name="maxSalary"
                  type="number"
                  min="0"
                  placeholder="Max"
                  error={errors.maxSalary}
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-[#0f0f11] border border-neutral-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <MapPin className="w-4 h-4 text-neutral-500" />
                Job Location
              </div>
              <Toggle
                checked={isRemote}
                onChange={setIsRemote}
                label="Remote / Work from anywhere"
              />
            </div>

            <AnimatePresence initial={false}>
              {!isRemote && (
                <motion.div
                  variants={collapseVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div id="jobCity">
                      <FieldLabel required>City</FieldLabel>
                      <TextInput
                        name="jobCity"
                        placeholder="e.g. Dhaka"
                        error={errors.jobCity}
                      />
                    </div>
                    <div id="jobCountry">
                      <FieldLabel required>Country</FieldLabel>
                      <TextInput
                        name="jobCountry"
                        placeholder="e.g. Bangladesh"
                        error={errors.jobCountry}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Deadline */}
          <div id="deadline" className="max-w-xs">
            <FieldLabel required>Application Deadline</FieldLabel>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                <Calendar className="w-4 h-4 text-neutral-500" />
              </div>
              <input
                type="date"
                name="deadline"
                min={todayStr}
                className={`
                  w-full bg-[#0f0f11] border rounded-lg h-11 pl-9 pr-3 text-sm text-white
                  focus:outline-none focus:ring-2 transition-all duration-200 [color-scheme:dark]
                  ${errors.deadline
                    ? "border-rose-500/70 focus:ring-rose-500/30"
                    : "border-neutral-800 focus:border-neutral-600 focus:ring-neutral-600/20"
                  }
                `}
              />
            </div>
            {errors.deadline && (
              <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                <TriangleExclamation className="w-3 h-3" /> {errors.deadline}
              </p>
            )}
          </div>

          {/* Role description */}
          <div className="border-t border-neutral-800/60 pt-5 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Role Description
            </p>

            <div id="responsibilities">
              <FieldLabel required>Responsibilities</FieldLabel>
              <TextareaInput
                name="responsibilities"
                placeholder={"List the core duties of this role. Be specific — candidates use this to self-qualify.\n\n• Own and ship product features end-to-end\n• Collaborate closely with design and product teams\n• Review code and mentor junior engineers"}
                rows={5}
                error={errors.responsibilities}
              />
            </div>

            <div id="requirements">
              <FieldLabel required>Requirements</FieldLabel>
              <TextareaInput
                name="requirements"
                placeholder={"List must-have qualifications and nice-to-haves separately.\n\nRequired:\n• 3+ years of React experience\n• Strong TypeScript skills\n\nNice to have:\n• Experience with Next.js App Router"}
                rows={5}
                error={errors.requirements}
              />
            </div>

            <div>
              <FieldLabel>
                Perks & Benefits{" "}
                <span className="text-neutral-600 font-normal normal-case tracking-normal">(optional)</span>
              </FieldLabel>
              <TextareaInput
                name="benefits"
                placeholder={"What makes this role attractive beyond the salary?\n\n• Flexible hours & async-first culture\n• Annual learning budget ($1,500)\n• Health insurance covered 100%"}
                rows={4}
              />
            </div>
          </div>
        </SectionCard>

        {/* ── ACTION BUTTONS ────────────────────────────────────────────────── */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          custom={0.15}
          className="flex items-center gap-3 pb-4"
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 h-11 rounded-lg border border-neutral-800 text-sm text-neutral-400 hover:text-white hover:border-neutral-600 transition-all duration-200"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-7 h-11 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold text-white transition-all duration-200 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Publishing…
              </>
            ) : (
              "Publish Job"
            )}
          </button>
        </motion.div>
      </form>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}