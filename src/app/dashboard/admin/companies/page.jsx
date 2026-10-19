import CompaniesTable from "@/components/dashboard/CompaniesTable";
import { getALlCompanies } from "@/lib/actions/company";


const AdminCompaniesManagePage = async () => {
  const companies = await getALlCompanies();

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Companies</h1>
        <p className="text-sm text-default-500">
          Review, view details, and approve pending employer applications.
        </p>
      </div>

      {/* Companies Table */}
      <CompaniesTable initialCompanies={companies} />
    </div>
  );
};

export default AdminCompaniesManagePage;