import JobActions from "@/components/job/JobAction";
import { getLoggedInRecruiterCompany } from "@/lib/api/companyes";
import { getJobs } from "@/lib/api/job";
import { Button } from "@heroui/react";


const AllJobPage = async () => {
  const company=await getLoggedInRecruiterCompany()
  // console.log(company._id)
  const jobs = await getJobs({
    companyId:company._id,
    status: "active",
  });

  if (!jobs?.length) {
    return (
      <div className="border border-dashed border-neutral-800 rounded-2xl py-16 text-center">
        <p className="text-sm text-neutral-500">No job posts yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#121214] border border-neutral-800/80 rounded-2xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#0f0f11] border-b border-neutral-800">
          <tr className="">
            <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
              Job Title
            </th>

            <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
              Position
            </th>
            <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
              Status
            </th>

            <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr
              key={job._id}
              className="border-b border-neutral-800/60 hover:bg-neutral-900/40 transition-colors"
            >
              <td className="px-5 py-4">
                <p className="text-sm font-medium text-white">
                  {job.jobTitle}
                </p>
              </td>

              <td className="px-5 py-4">
                <p className="text-sm text-neutral-300 capitalize">
                  {job.jobCategory}
                </p>
              </td>
              <td className="px-5 py-4">
                <Button variant="secondary" className="bg-none text-sm capitalize text-green-500">
                  {job.status}
                </Button>
              </td>

              <td className="px-5 py-4">
                <JobActions job={job} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllJobPage;