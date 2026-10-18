"use client";

import { useState } from "react";
import { Building2, MapPin, Upload, Edit3, ExternalLink, Users } from "lucide-react";
import { ChevronDown } from "@gravity-ui/icons";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import toast from "react-hot-toast";

import { registerCompany } from "@/lib/actions/company";

const display = Bricolage_Grotesque({ subsets: ["latin"], display: "swap" });
const body = Instrument_Sans({ subsets: ["latin"], display: "swap" });

const INDUSTRIES = [
  { id: "technology", name: "Technology" },
  { id: "finance", name: "Finance & Banking" },
  { id: "healthcare", name: "Healthcare" },
  { id: "education", name: "Education" },
  { id: "retail", name: "Retail & E-commerce" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "media", name: "Media & Marketing" },
  { id: "other", name: "Other" },
];

const EMPLOYEE_RANGES = [
  { id: "1-10", name: "1-10 employees" },
  { id: "11-50", name: "11-50 employees" },
  { id: "51-200", name: "51-200 employees" },
  { id: "201-500", name: "201-500 employees" },
  { id: "500+", name: "500+ employees" },
];

const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5 MB

const fieldBase =
  "w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-500 transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 dark:border-white/10 dark:bg-[#0B1530] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-500 dark:focus:ring-blue-500/30";

const labelClass =
  "mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200";

const primaryBtn =
  "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-none dark:focus-visible:ring-offset-[#050B1A]";

const outlineBtn =
  "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 text-sm font-semibold text-slate-900 transition-colors hover:border-blue-600 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-white/20 dark:text-white dark:hover:border-blue-400 dark:hover:text-blue-300";

const STATUS_STYLES = {
  Approved:
    "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300",
  Rejected:
    "border-rose-300 bg-rose-50 text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300",
  Pending:
    "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300",
};

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-rose-700 dark:text-rose-400">
      {message}
    </p>
  );
}

function CompanyLogo({ src, name, size = "h-16 w-16" }) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={`${size} flex flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5`}
    >
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={`${name} logo`}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className={`${display.className} text-xl font-bold text-blue-600 dark:text-blue-400`}
        >
          {name?.[0]?.toUpperCase() ?? "?"}
        </span>
      )}
    </span>
  );
}

function SelectField({ id, name, label, options, placeholder, defaultValue, error }) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          required
          defaultValue={defaultValue ?? ""}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${fieldBase} h-12 cursor-pointer appearance-none pr-10`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
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
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const [company, setCompany] = useState(recruiterCompany ?? null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [descriptionLength, setDescriptionLength] = useState(0);

  // True when a saved company exists (works even if the server did not return an _id)
  const hasCompany = Boolean(company && (company._id || company.companyName));

  const revokePreview = (url) => {
    if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
  };

  const startEditing = () => {
    revokePreview(logoPreview);
    setLogoFile(null);
    setLogoPreview(hasCompany ? company.logoUrl || "" : "");
    setErrors({});
    setFormError("");
    setDescriptionLength(hasCompany ? (company.description || "").length : 0);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    revokePreview(logoPreview);
    setIsEditing(false);
    setErrors({});
    setFormError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setErrors((prev) => ({ ...prev, logo: "Please choose a PNG or JPG image." }));
      return;
    }
    if (file.size > MAX_LOGO_SIZE) {
      setErrors((prev) => ({ ...prev, logo: "The image must be 5 MB or smaller." }));
      return;
    }

    revokePreview(logoPreview);
    setErrors((prev) => ({ ...prev, logo: undefined }));
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const companyName = String(formData.get("companyName") || "").trim();
    const industry = formData.get("industry");
    const websiteUrl = String(formData.get("websiteUrl") || "").trim();
    const location = String(formData.get("location") || "").trim();
    const employeeRange = formData.get("employeeRange");
    const description = String(formData.get("description") || "").trim();

    const currentErrors = {};
    if (!companyName) currentErrors.companyName = "Company name is required.";
    if (!industry) currentErrors.industry = "Choose an industry.";
    if (!websiteUrl) currentErrors.websiteUrl = "Website URL is required.";
    if (!location) currentErrors.location = "Location is required.";
    if (!employeeRange) currentErrors.employeeRange = "Choose a team size.";
    if (description.length < 50)
      currentErrors.description = "Please write at least 50 characters.";
    if (errors.logo) currentErrors.logo = errors.logo;

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Keep the current logo unless a new one was chosen
      let logoUrl = hasCompany ? company.logoUrl || "" : "";

      if (logoFile) {
        const imgFormData = new FormData();
        imgFormData.append("image", logoFile);

        const imgbbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
          { method: "POST", body: imgFormData }
        );
        const imgbbData = await imgbbRes.json();
        const uploadedUrl = imgbbData?.data?.display_url || imgbbData?.data?.url;

        if (!imgbbRes.ok || !uploadedUrl) {
          throw new Error("The logo could not be uploaded. Please try again.");
        }
        logoUrl = uploadedUrl;
      }

      const payload = {
        companyName,
        industry,
        websiteUrl,
        location,
        employeeRange,
        description,
        logoUrl,
        status: "Pending",
        recruiterId: recruiter?.id || null,
      };

      // Save first, then update the screen with what the server returned
      const result = await registerCompany(payload);

      if (result?.error || result?.success === false) {
        throw new Error(
          result?.message || result?.error || "Could not save the company."
        );
      }

      const saved = result?.company ?? result?.data ?? (result?._id ? result : null);
      setCompany(saved ? { ...payload, ...saved } : { ...company, ...payload });

      toast.success("Company profile saved");
      setIsEditing(false);
    } catch (err) {
      setFormError(
        err?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const industryName =
    INDUSTRIES.find((i) => i.id === company?.industry)?.name || company?.industry;
  const rangeName =
    EMPLOYEE_RANGES.find((r) => r.id === company?.employeeRange)?.name ||
    company?.employeeRange;

  return (
    <div className={`${body.className} mx-auto max-w-3xl space-y-6`}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            className={`${display.className} text-balance text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl`}
          >
            My company
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
            Manage your organization details and status.
          </p>
        </div>

        {hasCompany && !isEditing && (
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${
                STATUS_STYLES[company.status] ?? STATUS_STYLES.Pending
              }`}
            >
              {company.status || "Pending"}
            </span>
            <button type="button" onClick={startEditing} className={outlineBtn}>
              <Edit3 className="h-4 w-4" aria-hidden="true" />
              Edit
            </button>
          </div>
        )}
      </div>

      {/* Empty state */}
      {!hasCompany && !isEditing && (
        <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-white/15 sm:px-10 sm:py-16">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
            <Building2 className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2
            className={`${display.className} mt-5 text-xl font-bold text-slate-950 dark:text-white`}
          >
            No company registered
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            Register your company profile first, so you can publish job posts.
          </p>
          <button type="button" onClick={startEditing} className={`${primaryBtn} mt-6`}>
            Register company
          </button>
        </div>
      )}

      {/* Form */}
      {isEditing && (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none sm:p-7"
        >
          <h2
            className={`${display.className} text-lg font-bold text-slate-950 dark:text-white`}
          >
            {hasCompany ? "Update business profile" : "Register new company"}
          </h2>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="companyName" className={labelClass}>
                Company name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                autoComplete="organization"
                defaultValue={hasCompany ? company.companyName || "" : ""}
                placeholder="Acme Corp"
                aria-invalid={Boolean(errors.companyName)}
                aria-describedby={errors.companyName ? "companyName-error" : undefined}
                className={`${fieldBase} h-12`}
              />
              <FieldError id="companyName-error" message={errors.companyName} />
            </div>

            <SelectField
              id="industry"
              name="industry"
              label="Industry"
              placeholder="Select an industry"
              options={INDUSTRIES}
              defaultValue={hasCompany ? company.industry : ""}
              error={errors.industry}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="websiteUrl" className={labelClass}>
                Website URL
              </label>
              <input
                id="websiteUrl"
                name="websiteUrl"
                type="url"
                autoComplete="url"
                defaultValue={hasCompany ? company.websiteUrl || "" : ""}
                placeholder="https://company.com"
                aria-invalid={Boolean(errors.websiteUrl)}
                aria-describedby={errors.websiteUrl ? "websiteUrl-error" : undefined}
                className={`${fieldBase} h-12`}
              />
              <FieldError id="websiteUrl-error" message={errors.websiteUrl} />
            </div>

            <div>
              <label htmlFor="location" className={labelClass}>
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                autoComplete="address-level2"
                defaultValue={hasCompany ? company.location || "" : ""}
                placeholder="City, Country"
                aria-invalid={Boolean(errors.location)}
                aria-describedby={errors.location ? "location-error" : undefined}
                className={`${fieldBase} h-12`}
              />
              <FieldError id="location-error" message={errors.location} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              id="employeeRange"
              name="employeeRange"
              label="Team size"
              placeholder="Select a range"
              options={EMPLOYEE_RANGES}
              defaultValue={hasCompany ? company.employeeRange : ""}
              error={errors.employeeRange}
            />

            <div>
              <span className={labelClass}>Company logo</span>
              <label className="flex h-12 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 px-4 transition-colors focus-within:ring-2 focus-within:ring-blue-500 hover:border-blue-600 dark:border-white/20 dark:hover:border-blue-400">
                <Upload
                  className="h-4 w-4 flex-shrink-0 text-slate-500 dark:text-slate-400"
                  aria-hidden="true"
                />
                <span className="flex-1 truncate text-sm text-slate-600 dark:text-slate-400">
                  {logoFile ? logoFile.name : "PNG or JPG, up to 5 MB"}
                </span>
                {logoPreview && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="h-7 w-7 rounded object-cover"
                  />
                )}
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="sr-only"
                  aria-label="Upload company logo"
                  onChange={handleFileChange}
                />
              </label>
              <FieldError id="logo-error" message={errors.logo} />
            </div>
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              About the company
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              defaultValue={hasCompany ? company.description || "" : ""}
              onChange={(e) => setDescriptionLength(e.target.value.length)}
              placeholder="Tell candidates about your company’s mission and culture..."
              aria-invalid={Boolean(errors.description)}
              aria-describedby="description-hint"
              className={`${fieldBase} resize-y py-3`}
            />
            <div className="mt-1.5 flex items-start justify-between gap-3">
              <div id="description-hint">
                {errors.description ? (
                  <FieldError message={errors.description} />
                ) : (
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    At least 50 characters.
                  </p>
                )}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {descriptionLength}
              </span>
            </div>
          </div>

          {formError && (
            <div
              role="alert"
              className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
            >
              {formError}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 dark:border-white/10 sm:flex-row sm:justify-end">
            {hasCompany && (
              <button type="button" onClick={cancelEditing} className={outlineBtn}>
                Cancel
              </button>
            )}
            <button type="submit" disabled={loading} className={primaryBtn}>
              {loading
                ? "Saving…"
                : hasCompany
                  ? "Update company"
                  : "Register company"}
            </button>
          </div>
        </form>
      )}

      {/* Profile view */}
      {hasCompany && !isEditing && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0B1530] dark:shadow-none sm:p-7">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-white/10 sm:flex-row sm:items-center">
            <CompanyLogo src={company.logoUrl} name={company.companyName} />

            <div className="min-w-0 flex-1">
              <h2
                className={`${display.className} text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white`}
              >
                {company.companyName}
              </h2>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-600 dark:text-slate-400">
                {industryName && (
                  <li className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" aria-hidden="true" />
                    {industryName}
                  </li>
                )}
                {company.location && (
                  <li className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {company.location}
                  </li>
                )}
                {rangeName && (
                  <li className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    {rangeName}
                  </li>
                )}
              </ul>
            </div>

            {company.websiteUrl && (
              <a
                href={company.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={outlineBtn}
              >
                Website
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>

          <div className="pt-6">
            <h3
              className={`${display.className} text-base font-bold text-slate-950 dark:text-white`}
            >
              About the company
            </h3>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
              {company.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}