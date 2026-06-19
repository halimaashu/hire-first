"use client";

import React, { useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  Button,
  Switch,
  Card,
  Fieldset,
  FieldGroup, // FIXED: Imported explicitly instead of using Fieldset.Group
} from "@heroui/react";

// Gravity UI Icons
import {
  Briefcase,
  FileText,
  Factory,
  Calendar,
  MapPin,
  ArrowUpFromLine,
  ChevronDown,
} from "@gravity-ui/icons";

const JobPostForm = ({ companyData, planLimits }) => {
  const [isRemote, setIsRemote] = useState(false);
  const [loading, setLoading] = useState(false);

  // Controlled states for Select elements
  const [companyCategory, setCompanyCategory] = useState(null);
  const [employeeRange, setEmployeeRange] = useState(null);
  const [jobCategory, setJobCategory] = useState(null);
  const [jobType, setJobType] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    payload.companyCategory = companyCategory;
    payload.employeeRange = employeeRange;
    payload.jobCategory = jobCategory;
    payload.jobType = jobType;
    payload.isRemote = isRemote;

    try {
      const response = await fetch("YOUR_NESTJS_API_URL/company-with-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(
          "Company profile registered and Job post published successfully!",
        );
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <Form
          onSubmit={handleSubmit}
          validationBehavior="native"
          className="space-y-8"
        >
          {/* STEP 1: COMPANY REGISTRATION SECTION */}
          <Card className="w-full bg-[#121214] text-white border border-neutral-800 p-2 shadow-2xl rounded-xl">
            <Card.Header className="flex flex-col gap-1 px-6 pt-6 pb-2 items-start">
              <div className="flex items-center gap-2 text-md font-bold text-neutral-100 uppercase tracking-wider">
                <Factory className="w-5 h-5 text-primary" /> Step 1: Register
                New Company
              </div>
              <p className="text-sm text-neutral-400">
                Enter your business details to set up your profile on HireLoop.
              </p>
            </Card.Header>

            <Card.Body className="px-6 py-4 space-y-5">
              {/* Row 1: Company Name & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  isRequired
                  name="companyName"
                  className="flex flex-col gap-1 w-full"
                >
                  <Label className="text-neutral-300 font-medium text-sm">
                    Company Name
                  </Label>
                  <Input
                    placeholder="e.g. Acme Corp"
                    className="bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 text-sm text-white focus:border-neutral-600 outline-none w-full"
                  />
                </TextField>

                <div className="flex flex-col gap-1 w-full">
                  <Label className="text-neutral-300 font-medium text-sm">
                    Industry / Category
                  </Label>
                  <Select
                    value={companyCategory}
                    onChange={setCompanyCategory}
                    placeholder="Select Industry"
                    isRequired
                  >
                    <Select.Trigger className="bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 flex justify-between items-center text-neutral-300 text-sm">
                      <Select.Value />
                      <Select.Indicator>
                        <ChevronDown className="w-4 h-4 text-neutral-500" />
                      </Select.Indicator>
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox className="bg-[#1a1a1e] border border-neutral-800 text-white rounded-medium p-1 text-sm">
                        <ListBox.Item
                          id="technology"
                          textValue="Technology"
                          className="hover:bg-neutral-800 p-2 rounded cursor-pointer"
                        >
                          Technology
                        </ListBox.Item>
                        <ListBox.Item
                          id="design"
                          textValue="Design & Creative"
                          className="hover:bg-neutral-800 p-2 rounded cursor-pointer"
                        >
                          Design & Creative
                        </ListBox.Item>
                        <ListBox.Item
                          id="marketing"
                          textValue="Marketing"
                          className="hover:bg-neutral-800 p-2 rounded cursor-pointer"
                        >
                          Marketing
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>
              </div>

              {/* Row 2: Website URL & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField
                  isRequired
                  name="websiteUrl"
                  type="url"
                  className="flex flex-col gap-1 w-full"
                >
                  <Label className="text-neutral-300 font-medium text-sm">
                    Website URL
                  </Label>
                  <div className="relative flex items-center bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 focus-within:border-neutral-600">
                    <span className="text-neutral-500 text-sm select-none pr-2 border-r border-neutral-800 mr-2">
                      https://
                    </span>
                    <Input
                      placeholder="www.company.com"
                      className="bg-transparent text-sm text-white outline-none w-full"
                    />
                  </div>
                </TextField>

                <TextField
                  isRequired
                  name="companyLocation"
                  className="flex flex-col gap-1 w-full"
                >
                  <Label className="text-neutral-300 font-medium text-sm">
                    Company Location
                  </Label>
                  <div className="relative flex items-center bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 focus-within:border-neutral-600">
                    <MapPin className="w-4 h-4 text-neutral-500 mr-2 shrink-0" />
                    <Input
                      placeholder="City, Country"
                      className="bg-transparent text-sm text-white outline-none w-full"
                    />
                  </div>
                </TextField>
              </div>

              {/* Row 3: Employee Count & Logo Drag/Drop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div className="flex flex-col gap-1 w-full">
                  <Label className="text-neutral-300 font-medium text-sm">
                    Employee Count Range
                  </Label>
                  <Select
                    value={employeeRange}
                    onChange={setEmployeeRange}
                    placeholder="Select Range"
                    isRequired
                  >
                    <Select.Trigger className="bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 flex justify-between items-center text-neutral-300 text-sm">
                      <Select.Value />
                      <Select.Indicator>
                        <ChevronDown className="w-4 h-4 text-neutral-500" />
                      </Select.Indicator>
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox className="bg-[#1a1a1e] border border-neutral-800 text-white rounded-medium p-1 text-sm">
                        <ListBox.Item
                          id="1-10"
                          textValue="1-10 employees"
                          className="hover:bg-neutral-800 p-2 rounded cursor-pointer"
                        >
                          1-10 employees
                        </ListBox.Item>
                        <ListBox.Item
                          id="11-50"
                          textValue="11-50 employees"
                          className="hover:bg-neutral-800 p-2 rounded cursor-pointer"
                        >
                          11-50 employees
                        </ListBox.Item>
                        <ListBox.Item
                          id="51-200"
                          textValue="51-200 employees"
                          className="hover:bg-neutral-800 p-2 rounded cursor-pointer"
                        >
                          51-200 employees
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-neutral-300">
                    Company Logo
                  </span>
                  <label className="flex items-center gap-3 bg-[#1a1a1e] border border-dashed border-neutral-800 rounded-medium px-4 py-1.5 cursor-pointer hover:border-neutral-600 transition-all duration-200 h-10">
                    <ArrowUpFromLine className="w-4 h-4 text-neutral-400 shrink-0" />
                    <div className="flex items-baseline gap-2 text-left">
                      <span className="text-sm font-medium text-neutral-200">
                        Upload image
                      </span>
                      <span className="text-xs text-neutral-500">
                        (PNG, JPG up to 5MB)
                      </span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      name="logo"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Row 4: Brief Description */}
              <TextField
                isRequired
                name="companyDescription"
                className="flex flex-col gap-1 w-full"
              >
                <Label className="text-neutral-300 font-medium text-sm">
                  Brief Description
                </Label>
                <Input
                  elementType="textarea"
                  placeholder="Tell us about your company's mission and culture..."
                  rows={3}
                  className="bg-[#1a1a1e] border border-neutral-800 rounded-medium p-3 text-sm text-white focus:border-neutral-600 outline-none w-full resize-none"
                />
              </TextField>
            </Card.Body>
          </Card>

          {/* STEP 2: JOB OPENING DETAILS */}
          <Card className="w-full bg-[#121214] text-white border border-neutral-800 p-2 shadow-2xl rounded-xl">
            <Card.Header className="flex flex-col gap-1 px-6 pt-6 pb-2 items-start">
              <div className="flex items-center gap-2 text-md font-bold text-neutral-100 uppercase tracking-wider">
                <Briefcase className="w-5 h-5 text-primary" /> Step 2: Create
                First Job Position
              </div>
              <p className="text-sm text-neutral-400">
                Provide position structural requirements and descriptions.
              </p>
            </Card.Header>

            <Card.Body className="px-6 py-4 space-y-6">
              {/* Job Structural Information */}
              <Fieldset className="border border-neutral-800 rounded-xl p-4 bg-[#161619] space-y-4">
                <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <TextField
                    isRequired
                    name="jobTitle"
                    className="flex flex-col gap-1 w-full"
                  >
                    <Label className="text-neutral-300 font-medium text-sm">
                      Job Title
                    </Label>
                    <Input
                      placeholder="e.g. Senior React Developer"
                      className="bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 text-sm text-white focus:border-neutral-600 outline-none w-full"
                    />
                  </TextField>

                  <div className="flex flex-col gap-1 w-full">
                    <Label className="text-neutral-300 font-medium text-sm">
                      Job Category
                    </Label>
                    <Select
                      value={jobCategory}
                      onChange={setJobCategory}
                      placeholder="Select field"
                      isRequired
                    >
                      <Select.Trigger className="bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 flex justify-between items-center text-neutral-300 text-sm">
                        <Select.Value />
                        <Select.Indicator>
                          <ChevronDown className="w-4 h-4 text-neutral-500" />
                        </Select.Indicator>
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox className="bg-[#1a1a1e] border border-neutral-800 text-white rounded-medium p-1 text-sm">
                          <ListBox.Item
                            id="tech"
                            textValue="Technology & IT"
                            className="hover:bg-neutral-800 p-2 rounded cursor-pointer"
                          >
                            Technology & IT
                          </ListBox.Item>
                          <ListBox.Item
                            id="design"
                            textValue="Design & Creative"
                            className="hover:bg-neutral-800 p-2 rounded cursor-pointer"
                          >
                            Design & Creative
                          </ListBox.Item>
                          <ListBox.Item
                            id="marketing"
                            textValue="Marketing"
                            className="hover:bg-neutral-800 p-2 rounded cursor-pointer"
                          >
                            Marketing
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>
                </FieldGroup>

                <FieldGroup className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <Label className="text-neutral-300 font-medium text-sm">
                      Job Type
                    </Label>
                    <Select
                      value={jobType}
                      onChange={setJobType}
                      placeholder="Select type"
                      isRequired
                    >
                      <Select.Trigger className="bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 flex justify-between items-center text-neutral-300 text-sm">
                        <Select.Value />
                        <Select.Indicator>
                          <ChevronDown className="w-4 h-4 text-neutral-500" />
                        </Select.Indicator>
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox className="bg-[#1a1a1e] border border-neutral-800 text-white rounded-medium p-1 text-sm">
                          <ListBox.Item
                            id="Full-time"
                            textValue="Full-time"
                            className="hover:bg-neutral-800 p-2 rounded cursor-pointer"
                          >
                            Full-time
                          </ListBox.Item>
                          <ListBox.Item
                            id="Part-time"
                            textValue="Part-time"
                            className="hover:bg-neutral-800 p-2 rounded cursor-pointer"
                          >
                            Part-time
                          </ListBox.Item>
                          <ListBox.Item
                            id="Contract"
                            textValue="Contract"
                            className="hover:bg-neutral-800 p-2 rounded cursor-pointer"
                          >
                            Contract
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </div>

                  <TextField
                    isRequired
                    name="minSalary"
                    type="number"
                    className="flex flex-col gap-1 w-full"
                  >
                    <Label className="text-neutral-300 font-medium text-sm">
                      Min Salary ($)
                    </Label>
                    <Input
                      placeholder="0.00"
                      className="bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 text-sm text-white focus:border-neutral-600 outline-none w-full"
                    />
                  </TextField>

                  <TextField
                    isRequired
                    name="maxSalary"
                    type="number"
                    className="flex flex-col gap-1 w-full"
                  >
                    <Label className="text-neutral-300 font-medium text-sm">
                      Max Salary ($)
                    </Label>
                    <Input
                      placeholder="0.00"
                      className="bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 text-sm text-white focus:border-neutral-600 outline-none w-full"
                    />
                  </TextField>
                </FieldGroup>

                {/* Dynamic Job Location Section */}
                <div className="flex flex-col gap-4 border border-neutral-800 p-4 rounded-xl bg-[#121214]">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center text-sm">
                      <MapPin className="w-4 h-4 text-neutral-400" />
                      <span className="text-neutral-300 font-medium">
                        Job Location Setting
                      </span>
                    </div>
                    <Switch
                      isSelected={isRemote}
                      onValueChange={setIsRemote}
                      size="sm"
                    >
                      Remote Role
                    </Switch>
                  </div>

                  {!isRemote && (
                    <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 w-full">
                      <TextField
                        isRequired={!isRemote}
                        name="jobCity"
                        className="flex flex-col gap-1 w-full"
                      >
                        <Label className="text-neutral-300 font-medium text-sm">
                          Target City
                        </Label>
                        <Input
                          placeholder="e.g. Dhaka"
                          className="bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 text-sm text-white focus:border-neutral-600 outline-none w-full"
                        />
                      </TextField>

                      <TextField
                        isRequired={!isRemote}
                        name="jobCountry"
                        className="flex flex-col gap-1 w-full"
                      >
                        <Label className="text-neutral-300 font-medium text-sm">
                          Target Country
                        </Label>
                        <Input
                          placeholder="e.g. Bangladesh"
                          className="bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 text-sm text-white focus:border-neutral-600 outline-none w-full"
                        />
                      </TextField>
                    </FieldGroup>
                  )}
                </div>

                <FieldGroup className="w-full">
                  <TextField
                    isRequired
                    name="deadline"
                    type="date"
                    className="flex flex-col gap-1 w-full"
                  >
                    <Label className="text-neutral-300 font-medium text-sm">
                      Application Deadline
                    </Label>
                    <div className="relative flex items-center bg-[#1a1a1e] border border-neutral-800 rounded-medium h-10 px-3 focus-within:border-neutral-600">
                      <Calendar className="w-4 h-4 text-neutral-400 pointer-events-none mr-2 shrink-0" />
                      <Input className="bg-transparent text-sm text-white outline-none w-full filter invert dark:invert-0" />
                    </div>
                  </TextField>
                </FieldGroup>
              </Fieldset>

              {/* Job Descriptions block */}
              <Fieldset className="border border-neutral-800 rounded-xl p-4 bg-[#161619] space-y-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-neutral-200">
                  <FileText className="w-4 h-4 text-primary" /> Core Scope &
                  Requirements
                </div>
                <FieldGroup className="space-y-4 w-full">
                  <TextField
                    isRequired
                    name="responsibilities"
                    className="flex flex-col gap-1 w-full"
                  >
                    <Label className="text-neutral-300 font-medium text-sm">
                      Responsibilities
                    </Label>
                    <Input
                      elementType="textarea"
                      placeholder="List core duties and role expectations..."
                      rows={3}
                      className="bg-[#1a1a1e] border border-neutral-800 rounded-medium p-3 text-sm text-white focus:border-neutral-600 outline-none w-full resize-none"
                    />
                  </TextField>

                  <TextField
                    isRequired
                    name="requirements"
                    className="flex flex-col gap-1 w-full"
                  >
                    <Label className="text-neutral-300 font-medium text-sm">
                      Requirements
                    </Label>
                    <Input
                      elementType="textarea"
                      placeholder="Required tech skills, qualifications, or experience milestones..."
                      rows={3}
                      className="bg-[#1a1a1e] border border-neutral-800 rounded-medium p-3 text-sm text-white focus:border-neutral-600 outline-none w-full resize-none"
                    />
                  </TextField>
                </FieldGroup>
              </Fieldset>
            </Card.Body>

            <Card.Footer className="flex justify-end gap-3 px-6 pb-6 pt-2">
              <Button
                type="submit"
                className="bg-white text-black font-bold px-8 py-6 rounded-xl hover:bg-neutral-200 transition-all w-full sm:w-auto text-sm"
                isLoading={loading}
              >
                Complete Registration & Post Job
              </Button>
            </Card.Footer>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default JobPostForm;
