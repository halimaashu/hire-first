"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown } from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

// Change this to your real "create job" API endpoint
const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/\/+$/, "");
const POST_JOB_ENDPOINT = `${BASE_URL}/jobs`;

// Same values as the jobs page filters and the job card labels
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
  { value: "entry", label: "Entry level" },
  { value: "mid", label: "Mid level" },
  { value: "senior", label: "Senior level" },
  { value: "lead", label: "Lead / Principal" },
  { value: "executive", label: "Executive" },
];

const CURRENCIES = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "BDT", label: "BDT (৳)" },
  { value: "INR", label: "INR (₹)" },
];

const fieldBase =
  "w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-white/10 dark:bg-[#0B1530] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/30";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200";

const hintClass = "mt-1.5 text-xs text-slate-600 dark:text-slate-400";

// Turns one-item-per-line text into the "- item" format the job page expects
function toBulletText(text) {
  return String(text || "")
    .split("\n")
    .map((line) => line.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean)
    .map((line) => `- ${line}`)
    .join("\n");
}

function Field({ id, label, hint, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
        {optional && (
          <span className="ml-1 font-normal text-slate-500 dark:text-slate-400">
            (optional)
          </span>
        )}
      </label>
      {children}
      {hint && <p className={hintClass}>{hint}</p>}
    </div>
  );
}

function SelectField({ id, name, label, options, placeholder, defaultValue }) {
  return (
    <Field id={id} label={label}>
      <div className="relative">
        <select
          id={id}
          name={name}
          required
          defaultValue={defaultValue ?? ""}
          className={`${fieldBase} h-12 cursor-pointer appearance-none pr-10`}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          width={16}
          height={16}
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
        />
      </div>
    </Field>
  );
}

function FormSection({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none sm:p-7">
      <h2
        className={`${display.className} text-lg font-bold text-slate-950 dark:text-white`}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

// `company` is loaded on the server (see page.jsx) and passed in as a plain object:
// { _id, name, logo }
export default function JobPostForm({ company }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isRemote, setIsRemote] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const minSalary = Number(form.get("minSalary"));
    const maxSalary = Number(form.get("maxSalary"));

    if (minSalary > maxSalary) {
      setError("The minimum salary can’t be higher than the maximum salary.");
      return;
    }

    const logo = String(form.get("companyLogo") || "").trim();

    const payload = {
      jobTitle: String(form.get("jobTitle")).trim(),
      companyName: String(form.get("companyName")).trim(),
      ...(logo ? { companyLogo: logo } : {}),
      jobCategory: form.get("jobCategory"),
      jobType: form.get("jobType"),
      experienceLevel: form.get("experienceLevel"),
      isRemote,
      jobCity: String(form.get("jobCity") || "").trim(),
      jobCountry: String(form.get("jobCountry") || "").trim(),
      currency: form.get("currency"),
      minSalary,
      maxSalary,
      deadline: form.get("deadline"),
      responsibilities: toBulletText(form.get("responsibilities")),
      requirements: toBulletText(form.get("requirements")),
      benefits: toBulletText(form.get("benefits")),
      status: "active",
      recruiterId: user?.id,
      companyId: company?._id,
    };

    setSubmitting(true);

    try {
      const res = await fetch(POST_JOB_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Could not publish the job.");
      }

      toast.success("Job published successfully!");
      router.push("/dashboard/recruiter/jobs");
    } catch (err) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${body.className} mx-auto max-w-3xl`}>
      {/* Header */}
      <div>
        <h1
          className={`${display.className} text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl`}
        >
          Post a job
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Fill in the details below. Candidates will see this information on the
          job page.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Job details */}
        <FormSection title="Job details">
          <Field id="jobTitle" label="Job title">
            <input
              id="jobTitle"
              name="jobTitle"
              type="text"
              placeholder="Senior Product Designer"
              required
              className={`${fieldBase} h-12`}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              id="jobCategory"
              name="jobCategory"
              label="Category"
              placeholder="Select a category"
              options={JOB_CATEGORIES}
            />
            <SelectField
              id="jobType"
              name="jobType"
              label="Job type"
              placeholder="Select a type"
              options={JOB_TYPES}
            />
          </div>

          <SelectField
            id="experienceLevel"
            name="experienceLevel"
            label="Experience level"
            placeholder="Select a level"
            options={EXPERIENCE_LEVELS}
          />
        </FormSection>

        {/* Company */}
        <FormSection title="Company">
          <Field id="companyName" label="Company name">
            <input
              id="companyName"
              name="companyName"
              type="text"
              autoComplete="organization"
              placeholder="Acme Inc"
              defaultValue={company?.name ?? ""}
              required
              className={`${fieldBase} h-12`}
            />
          </Field>

          <Field
            id="companyLogo"
            label="Company logo URL"
            optional
            hint="Link to a square image. If you leave it empty, the company’s first letter is shown."
          >
            <input
              id="companyLogo"
              name="companyLogo"
              type="url"
              placeholder="https://example.com/logo.png"
              defaultValue={company?.logo ?? ""}
              className={`${fieldBase} h-12`}
            />
          </Field>
        </FormSection>

        {/* Location */}
        <FormSection title="Location">
          <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-slate-800 dark:text-slate-200">
            <input
              type="checkbox"
              checked={isRemote}
              onChange={(e) => setIsRemote(e.target.checked)}
              className="h-5 w-5 rounded border-slate-300 accent-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            />
            This job can be done remotely
          </label>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="jobCity" label="City" optional={isRemote}>
              <input
                id="jobCity"
                name="jobCity"
                type="text"
                autoComplete="address-level2"
                placeholder="Dhaka"
                required={!isRemote}
                className={`${fieldBase} h-12`}
              />
            </Field>
            <Field id="jobCountry" label="Country" optional={isRemote}>
              <input
                id="jobCountry"
                name="jobCountry"
                type="text"
                autoComplete="country-name"
                placeholder="Bangladesh"
                required={!isRemote}
                className={`${fieldBase} h-12`}
              />
            </Field>
          </div>
        </FormSection>

        {/* Salary and deadline */}
        <FormSection title="Salary and deadline">
          <div className="grid gap-5 sm:grid-cols-3">
            <SelectField
              id="currency"
              name="currency"
              label="Currency"
              defaultValue="USD"
              options={CURRENCIES}
            />
            <Field id="minSalary" label="Minimum salary">
              <input
                id="minSalary"
                name="minSalary"
                type="number"
                min="0"
                step="any"
                inputMode="numeric"
                placeholder="60000"
                required
                className={`${fieldBase} h-12`}
              />
            </Field>
            <Field id="maxSalary" label="Maximum salary">
              <input
                id="maxSalary"
                name="maxSalary"
                type="number"
                min="0"
                step="any"
                inputMode="numeric"
                placeholder="90000"
                required
                className={`${fieldBase} h-12`}
              />
            </Field>
          </div>

          <Field id="deadline" label="Application deadline">
            <input
              id="deadline"
              name="deadline"
              type="date"
              min={today}
              required
              className={`${fieldBase} h-12`}
            />
          </Field>
        </FormSection>

        {/* Description */}
        <FormSection
          title="Description"
          description="Write one item per line. Each line becomes a bullet point on the job page."
        >
          <Field id="responsibilities" label="Responsibilities">
            <textarea
              id="responsibilities"
              name="responsibilities"
              rows={5}
              required
              placeholder={"Design user flows and prototypes\nWork with engineers to ship features"}
              className={`${fieldBase} resize-y py-3`}
            />
          </Field>

          <Field id="requirements" label="Requirements">
            <textarea
              id="requirements"
              name="requirements"
              rows={5}
              required
              placeholder={"3+ years of product design experience\nStrong portfolio"}
              className={`${fieldBase} resize-y py-3`}
            />
          </Field>

          <Field id="benefits" label="Perks and benefits" optional>
            <textarea
              id="benefits"
              name="benefits"
              rows={4}
              placeholder={"Flexible working hours\nHealth insurance"}
              className={`${fieldBase} resize-y py-3`}
            />
          </Field>
        </FormSection>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
          >
            {error}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard/recruiter/jobs"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 px-6 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-none dark:focus-visible:ring-offset-[#050B1A]"
          >
            {submitting ? "Publishing…" : "Publish job"}
          </button>
        </div>
      </form>
    </div>
  );
}