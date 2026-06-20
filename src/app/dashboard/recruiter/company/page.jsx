import React from "react";
import CompanyProfile from "./CompanyProfile";
import { getUser } from "@/lib/actions/core/session";
import { getRecruiterCompany } from "@/lib/api/companyes";

const RecruiterCompanyPage = async () => {
  const userData = await getUser();

  const company = await getRecruiterCompany(userData?.id);

  return (
    <div>
      <CompanyProfile recruiter={userData} recruiterCompany={company} />
    </div>
  );
};

export default RecruiterCompanyPage;
