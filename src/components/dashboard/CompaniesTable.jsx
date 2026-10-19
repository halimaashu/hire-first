"use client";

import { useState } from "react";
import {
  Table,
  Chip,
  Button,
  Modal,
  Avatar,
  useOverlayState,
} from "@heroui/react";
import {
  Eye,
  Check,
  Globe,
  LocationArrowFill,
  LocationDot,
  Briefcase,
  Persons,
  Calendar,
} from "@gravity-ui/icons";
import toast from "react-hot-toast";

export default function CompaniesTable({ initialCompanies = [] }) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  // HeroUI v3 uses useOverlayState instead of useDisclosure
  const modalState = useOverlayState();

  // Handle Detail Modal Open
  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    modalState.open();
  };

  // Handle Approve Action & Trigger Toast
  const handleApprove = async (company) => {
    // Update local state
    setCompanies((prev) =>
      prev.map((item) =>
        item._id === company._id ? { ...item, status: "Approved" } : item
      )
    );

    toast.success(`${company.companyName} has been approved successfully!`);
  };

  // Status Chip Color Helper
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-4">
      {/* Table Section */}
      <div className="border border-default-200 rounded-2xl overflow-hidden shadow-sm bg-background">
        <Table aria-label="Companies management table">
          <Table.ScrollContainer>
            <Table.Content className="min-w-[700px]">
              <Table.Header>
                <Table.Column isRowHeader>Company Name</Table.Column>
                <Table.Column>Industry</Table.Column>
                <Table.Column>Location</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column className="text-center">Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {companies.map((company) => {
                  const isApproved = company.status === "Approved";

                  return (
                    <Table.Row key={company._id}>
                      {/* Name & Logo */}
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={company.logoUrl || undefined}
                            name={company.companyName}
                            className="w-10 h-10 border border-default-200 bg-default-100 font-semibold"
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold text-foreground">
                              {company.companyName}
                            </span>
                            {company.websiteUrl && (
                              <a
                                href={company.websiteUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs text-default-400 hover:text-primary flex items-center gap-1"
                              >
                                <Globe className="w-3 h-3" />
                                {new URL(company.websiteUrl).hostname}
                              </a>
                            )}
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Industry */}
                      <Table.Cell>
                        <span className="capitalize text-default-600 text-sm">
                          {company.industry || "N/A"}
                        </span>
                      </Table.Cell>

                      {/* Location */}
                      <Table.Cell>
                        <span className="text-default-600 text-sm flex items-center gap-1">
                          <LocationArrowFill className="w-3.5 h-3.5 text-default-400" />
                          {company.location || "N/A"}
                        </span>
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell>
                        <Chip
                          color={getStatusColor(company.status)}
                          variant="flat"
                          size="sm"
                          className="capitalize font-medium"
                        >
                          {company.status || "Pending"}
                        </Chip>
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell>
                        <div className="flex items-center justify-center gap-2">
                          {/* Details Button */}
                          <Button
                            size="sm"
                            variant="flat"
                            color="default"
                            onPress={() => handleViewDetails(company)}
                            startContent={<Eye className="w-4 h-4" />}
                          >
                            Detail
                          </Button>

                          {/* Approved Button */}
                          <Button
                            size="sm"
                            color="success"
                            variant={isApproved ? "light" : "solid"}
                            isDisabled={isApproved}
                            onPress={() => handleApprove(company)}
                            startContent={<Check className="w-4 h-4" />}
                          >
                            {isApproved ? "Approved" : "Approve"}
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* Details Modal (HeroUI v3 Compound Structure) */}
      <Modal isOpen={modalState.isOpen} onOpenChange={modalState.setOpen}>
        <Modal.Backdrop />
        <Modal.Container>
          <Modal.Dialog className="max-w-lg">
            <Modal.Header className="flex items-center gap-3">
              <Avatar
                src={selectedCompany?.logoUrl || undefined}
                name={selectedCompany?.companyName}
                className="w-10 h-10 border border-default-200"
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold">
                  {selectedCompany?.companyName}
                </span>
                <Chip
                  color={getStatusColor(selectedCompany?.status)}
                  variant="flat"
                  size="sm"
                  className="capitalize w-fit"
                >
                  {selectedCompany?.status}
                </Chip>
              </div>
            </Modal.Header>

            <Modal.Body className="space-y-4 py-2">
              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold text-default-500 uppercase tracking-wider mb-1">
                  Description
                </h4>
                <p className="text-sm text-default-700 bg-default-50 p-3 rounded-lg border border-default-100 leading-relaxed">
                  {selectedCompany?.description || "No description available."}
                </p>
              </div>

              {/* Grid Information */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-default-600">
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span className="font-medium">Industry:</span>
                  <span className="capitalize">{selectedCompany?.industry || "N/A"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-default-600">
                  <Persons className="w-4 h-4 text-primary" />
                  <span className="font-medium">Employees:</span>
                  <span>{selectedCompany?.employeeRange || "N/A"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-default-600">
                  <LocationArrowFill className="w-4 h-4 text-primary" />
                  <span className="font-medium">Location:</span>
                  <span>{selectedCompany?.location || "N/A"}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-default-600">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="font-medium">Created:</span>
                  <span>
                    {selectedCompany?.createDate
                      ? new Date(selectedCompany.createDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button color="danger" variant="light" onPress={modalState.close}>
                Close
              </Button>
              {selectedCompany?.status !== "Approved" && (
                <Button
                  color="success"
                  onPress={() => {
                    handleApprove(selectedCompany);
                    modalState.close();
                  }}
                  startContent={<Check className="w-4 h-4" />}
                >
                  Approve Now
                </Button>
              )}
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal>
    </div>
  );
}