"use client"; // Required for form interactions and submissions
import { useRouter } from "next/navigation";



import {
  Form,
  Button,
  TextField,
  Label,
  Input,
  Description,
  FieldError,
  Card,
} from "@heroui/react";
import { ArrowLeft } from "@gravity-ui/icons";
import { postApplication } from "@/lib/actions/application";

const ApplyForm = ({ applicant, jobInfo }) => {
    const router=useRouter()
  // Extracting data safely from props
  const jobId = jobInfo?.id || jobInfo?._id || ""; // Dynamic job ID fallback
  const jobTitle = jobInfo?.jobTitle || "Speculative Role";
  const companyName = jobInfo?.companyName || "Our Company";
  const applicantName = applicant?.name || "";
  const applicantEmail = applicant?.email || "";
  const applicantId = applicant?.id;

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const applicationFullData={
        jobId,
        jobTitle,
        applicantId,
        companyName,

        ...data
      }
      const res = await postApplication(applicationFullData);
      alert("success");
      router.push("/jobs")
      
    } catch (error) {
      alert(`error :${error.message}`);
    }
    // This will now output your text links and the corresponding jobId
  };


  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation Action */}
        <div>
          <Button
            type="button"
            variant="light"
            className="text-neutral-500 hover:text-neutral-900"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2" /> Back to Job Details
          </Button>
        </div>

        {/* Main Application Interface */}
        <Card className="p-2 sm:p-6 shadow-md border border-neutral-200/60 dark:border-neutral-800">
          <Card.Header className="pb-6 border-b border-neutral-100 dark:border-neutral-800">
            <Card.Title className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Apply for {jobTitle}
            </Card.Title>
            <Card.Description className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              You are submitting an application to{" "}
              <span className="font-semibold">{companyName}</span>.
            </Card.Description>
          </Card.Header>

          <Card.Content className="pt-6">
            <Form onSubmit={handleSubmit} className="space-y-6">
              {/* HIDDEN FIELD: Captures the unique Job ID during submission */}
              <input type="hidden" name="jobId" value={jobId} />

              {/* Responsive Layout: Name and Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                <TextField
                  isRequired
                  name="fullName"
                  defaultValue={applicantName}
                >
                  <Label className="text-sm font-semibold mb-1.5 block">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                  />
                  <Description className="text-xs text-neutral-400 mt-1">
                    As it appears on your official IDs.
                  </Description>
                  <FieldError className="text-xs text-red-500 mt-1">
                    Please enter your full name.
                  </FieldError>
                </TextField>

                <TextField
                  isRequired
                  type="email"
                  name="email"
                  defaultValue={applicantEmail}
                >
                  <Label className="text-sm font-semibold mb-1.5 block">
                    Email Address
                  </Label>
                  <Input
                    placeholder="john@example.com"
                    className="w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                  />
                  <FieldError className="text-xs text-red-500 mt-1">
                    Please enter a valid email address.
                  </FieldError>
                </TextField>
              </div>

              {/* Contact Phone */}
              <TextField type="tel" name="phone">
                <Label className="text-sm font-semibold mb-1.5 block">
                  Phone Number (Optional)
                </Label>
                <Input
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                />
              </TextField>

              {/* NEW LINKS GRID: Responsive side-by-side design for Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {/* Resume Link instead of file upload */}
                <TextField isRequired type="url" name="resumeLink">
                  <Label className="text-sm font-semibold mb-1.5 block">
                    Resume Link
                  </Label>
                  <Input
                    placeholder="https://drive.google.com/..."
                    className="w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                  />
                  <Description className="text-xs text-neutral-400 mt-1">
                    Link to Google Drive, Dropbox, or Notion CV.
                  </Description>
                  <FieldError className="text-xs text-red-500 mt-1">
                    Please provide a valid URL to your resume.
                  </FieldError>
                </TextField>

                {/* Portfolio Link Input */}
                <TextField type="url" name="portfolioLink">
                  <Label className="text-sm font-semibold mb-1.5 block">
                    Portfolio Link (Optional)
                  </Label>
                  <Input
                    placeholder="https://yourportfolio.com"
                    className="w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
                  />
                  <Description className="text-xs text-neutral-400 mt-1">
                    Link to your personal website, GitHub, or Behance.
                  </Description>
                  <FieldError className="text-xs text-red-500 mt-1">
                    Please provide a valid web address.
                  </FieldError>
                </TextField>
              </div>

              {/* Cover Letter/Message text block */}
              <TextField name="coverLetter">
                <Label className="text-sm font-semibold mb-1.5 block">
                  Cover Letter / Note
                </Label>
                <Input
                  as="textarea"
                  rows={4}
                  placeholder="Introduce yourself to the recruiter..."
                  className="w-full px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700 resize-none min-h-[100px]"
                />
              </TextField>

              {/* Form Control Buttons matching HeroUI layout principles */}
              <Card.Footer className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                <Button
                  type="reset"
                  className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md font-medium text-sm transition-colors hover:bg-neutral-50"
                >
                  Clear Form
                </Button>
                <Button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md text-sm transition-colors"
                >
                  Submit Application
                </Button>
              </Card.Footer>
            </Form>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default ApplyForm;
