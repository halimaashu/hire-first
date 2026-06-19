"use client";

import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

export default function JobActions({ job }) {
  const router = useRouter();

  const handleView = () => {
    router.push(`/jobs/${job._id}`);
  };

  const handleEdit = () => {
    router.push(`/jobs/edit/${job._id}`);
  };

  const handleDelete = async () => {
    console.log("Delete job:", job._id);

    // call delete API here
  };

  return (
    <div className="flex items-center justify-end gap-1.5">
      <button
        onClick={handleView}
        aria-label="View job"
        className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800"
      >
        <Eye className="w-4 h-4" />
      </button>

      <button
        onClick={handleEdit}
        aria-label="Edit job"
        className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800"
      >
        <Pencil className="w-4 h-4" />
      </button>

      <button
        onClick={handleDelete}
        aria-label="Delete job"
        className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10"
      >
        <TrashBin className="w-4 h-4" />
      </button>
    </div>
  );
}