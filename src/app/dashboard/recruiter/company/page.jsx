"use client";

import React, { useState } from "react";
import { 
  Button, 
  Input, 
  Select, 
  Label, 
  ListBox,
  Card,
  Avatar,
  Chip,
  Spinner
} from "@heroui/react";
import { 
  Building2, 
  Globe, 
  MapPin, 
  Upload, 
  Edit3, 
  ExternalLink, 
  Users 
} from "lucide-react";

const INDUSTRIES = [
  { id: "technology", name: "Technology" },
  { id: "finance", name: "Finance & Banking" },
  { id: "healthcare", name: "Healthcare" }
];

const EMPLOYEE_RANGES = [
  { id: "1-10", name: "1-10 employees" },
  { id: "11-50", name: "11-50 employees" },
  { id: "51-200", name: "51-200 employees" }
];

export default function RecruiterCompanyPage() {
  const [company, setCompany] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [industry, setIndustry] = useState(null);
  const [employeeRange, setEmployeeRange] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [errors, setErrors] = useState({});

  const startEditing = () => {
    if (company) {
      setIndustry(company.industry);
      setEmployeeRange(company.employeeRange);
      setLogoPreview(company.logoUrl);
    }
    setIsEditing(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const companyName = formData.get("companyName");
    const websiteUrl = formData.get("websiteUrl");
    const location = formData.get("location");
    const description = formData.get("description");

    let currentErrors = {};
    if (!companyName) currentErrors.companyName = "Required";
    if (!industry) currentErrors.industry = "Required";
    if (!websiteUrl) currentErrors.websiteUrl = "Required";
    if (!location) currentErrors.location = "Required";
    if (!employeeRange) currentErrors.employeeRange = "Required";
    if (!description || description.length < 50) currentErrors.description = "Min 50 characters required";

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      setLoading(false);
      return;
    }

    try {
      let imgbbUrl = company?.logoUrl || "";

      if (logoFile) {
        const imgFormData = new FormData();
        imgFormData.append("image", logoFile);
        
        const imgbbRes = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`, {
          method: "POST",
          body: imgFormData,
        });
        const imgbbData = await imgbbRes.json();
        imgbbUrl = imgbbData.data.url;
      }

      const payload = {
        companyName,
        industry,
        websiteUrl,
        location,
        employeeRange,
        description,
        logoUrl: imgbbUrl,
        status: "Pending" 
      };

      setCompany(payload);
      setIsEditing(false);
    } catch (err) {
      console.error("Submission operational failure", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 text-white">
      
      {/* ── HEADER REGION ──────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div>
          <h1 className="text-xl font-bold">My Company</h1>
          <p className="text-xs text-neutral-400 mt-0.5">Manage your organization details and status.</p>
        </div>
        {company && !isEditing && (
          <div className="flex items-center gap-2">
            <Chip 
              variant="outline" 
              className={
                company.status === "Approved" ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" :
                company.status === "Rejected" ? "text-rose-400 border-rose-500/30 bg-rose-500/10" :
                "text-amber-400 border-amber-500/30 bg-amber-500/10"
              }
            >
              {company.status}
            </Chip>
            <Button size="sm" variant="secondary" onPress={startEditing} className="flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </Button>
          </div>
        )}
      </div>

      {/* ── EMPTY RECORD PROMPT STATE ─────────────────────────────────── */}
      {!company && !isEditing && (
        <Card className="p-8 text-center bg-[#0f0f11] border border-neutral-800 space-y-4">
          <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto">
            <Building2 className="w-6 h-6 text-neutral-500" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm">No Company Registered</h3>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto">
              You need to register your company profile first to publish hiring posts publicly on the network.
            </p>
          </div>
          <Button variant="primary" onPress={() => setIsEditing(true)} className="bg-violet-600 hover:bg-violet-500 text-xs font-semibold px-6">
            Register Company
          </Button>
        </Card>
      )}

      {/* ── FORM MODE STATE (REGISTER OR EDIT) ───────────────────────── */}
      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-[#0f0f11] border border-neutral-800 p-6 rounded-xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-2">
            {company ? "Update Business Profile" : "Register New Company"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-neutral-300">Company Name</Label>
              <Input name="companyName" defaultValue={company?.companyName || ""} placeholder="e.g. Acme Corp" variant="secondary" />
              {errors.companyName && <span className="text-xs text-rose-400">{errors.companyName}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-neutral-300">Industry / Category</Label>
              <Select value={industry} onChange={setIndustry} placeholder="Select Industry" className="w-full">
                <Select.Trigger className="rounded-lg border bg-[#0f0f11] border-neutral-800 px-3 py-2 text-sm text-left flex justify-between items-center h-10">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#0f0f11] border border-neutral-800 rounded-lg shadow-xl p-1 min-w-[200px]">
                  <ListBox>
                    {INDUSTRIES.map((item) => (
                      <ListBox.Item id={item.id} key={item.id} textValue={item.name} className="px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800 rounded cursor-pointer transition">
                        {item.name}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
              {errors.industry && <span className="text-xs text-rose-400">{errors.industry}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-neutral-300">Website URL</Label>
              <Input name="websiteUrl" type="url" defaultValue={company?.websiteUrl || ""} placeholder="https://company.com" variant="secondary" />
              {errors.websiteUrl && <span className="text-xs text-rose-400">{errors.websiteUrl}</span>}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-neutral-300">Location</Label>
              <Input name="location" defaultValue={company?.location || ""} placeholder="City, Country" variant="secondary" />
              {errors.location && <span className="text-xs text-rose-400">{errors.location}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-neutral-300">Employee Count Range</Label>
              <Select value={employeeRange} onChange={setEmployeeRange} placeholder="Select Range" className="w-full">
                <Select.Trigger className="rounded-lg border bg-[#0f0f11] border-neutral-800 px-3 py-2 text-sm text-left flex justify-between items-center h-10">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#0f0f11] border border-neutral-800 rounded-lg shadow-xl p-1 min-w-[200px]">
                  <ListBox>
                    {EMPLOYEE_RANGES.map((range) => (
                      <ListBox.Item id={range.id} key={range.id} textValue={range.name} className="px-3 py-1.5 text-sm text-neutral-300 hover:bg-neutral-800 rounded cursor-pointer transition">
                        {range.name}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
              {errors.employeeRange && <span className="text-xs text-rose-400">{errors.employeeRange}</span>}
            </div>

            <div>
              <label className="flex items-center gap-3 bg-neutral-900 border border-dashed border-neutral-800 rounded-lg px-4 h-10 cursor-pointer hover:border-neutral-700 transition">
                <Upload className="w-4 h-4 text-neutral-500" />
                <span className="text-xs text-neutral-400 truncate flex-1">
                  {logoFile ? logoFile.name : "Upload image PNG, JPG up to 5MB"}
                </span>
                {logoPreview && <Avatar src={logoPreview} size="sm" className="w-6 h-6 rounded" />}
                <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
          </div>

          {/* ── FIXED TEXTAREA IMPLEMENTATION FOR HEROUI V3 ── */}
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs font-medium text-neutral-300">Brief Description</Label>
            <Input 
              type="textarea" 
              name="description" 
              defaultValue={company?.description || ""} 
              placeholder="Tell us about your company's mission and culture..." 
              variant="secondary" 
            />
            {errors.description && <span className="text-xs text-rose-400">{errors.description}</span>}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
            {company && (
              <Button size="sm" variant="ghost" onPress={() => setIsEditing(false)} className="text-neutral-400 hover:text-white">
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={loading} className="bg-white text-black font-semibold text-xs px-5 h-9 rounded-lg">
              {loading ? <Spinner size="sm" className="text-black" /> : "Register Company"}
            </Button>
          </div>
        </form>
      )}

      {/* ── STATIC DATA RENDERING VIEW STATE ─────────────────────────── */}
      {company && !isEditing && (
        <Card className="p-6 bg-[#0f0f11] border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b border-neutral-800">
            <Avatar src={company.logoUrl} className="w-16 h-16 rounded-xl border border-neutral-800 object-cover" />
            <div className="flex-1 space-y-1">
              <h2 className="text-lg font-bold tracking-tight">{company.companyName}</h2>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
                <span className="flex items-center gap-1 capitalize"><Building2 className="w-3.5 h-3.5" /> {company.industry}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {company.location}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {company.employeeRange}</span>
              </div>
            </div>
            <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="secondary" className="text-xs flex items-center gap-1 border border-neutral-800 bg-neutral-950 hover:bg-neutral-900">
                Website <ExternalLink className="w-3 h-3" />
              </Button>
            </a>
          </div>

          <div className="space-y-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">About Company</h3>
            <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap">{company.description}</p>
          </div>
        </Card>
      )}
    </div>
  );
}