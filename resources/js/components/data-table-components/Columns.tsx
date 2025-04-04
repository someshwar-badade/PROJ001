"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

import { UserRoundPen } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import EditUserForm from "@/pages/usersManage/editUserForm"
import DeleteUserModal from "@/pages/usersManage/deleteUser"

export type User = {
  id: number,
  name: string,
  email: string,
  roles: { id: number; user_id: number; display_name: string }[],
  companies: { id: number; user_id: number; name: string }[],
  phone_numbers: { id: number; user_id: number; phone_number: string }[];
}

export const getColumns = (fetchUsers: () => void, message?: string): ColumnDef<User>[] => [
    {
      accessorKey: "id",
      header: () => <div className="text-center font-bold ">Id</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: () => <div className="text-center font-bold ">Name</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: () => <div className="text-center font-bold">Email</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "mobile",
      header: () => <div className="text-center font-bold">Mobile Number</div>,
      cell: ({ row }) => {
        const phoneNumbers = row.original.phone_numbers || [];
        const mobileData = phoneNumbers.length
          ? phoneNumbers.map((m) => m.phone_number).join(", ")
          : "N/A";
  
        return <div className="text-center font-medium">{mobileData}</div>;
      },
    },
    {
      accessorKey: "company",
      header: () => <div className="text-center font-bold">Company</div>,
      cell: ({ row }) => {
        const userCompanies = row.original.companies || [];
        const companyData = userCompanies.length
          ? userCompanies.map((m) => m.name).join(", ")
          : "N/A";
  
        return <div className="text-center font-medium">{companyData}</div>;
      },
    },
    {
      accessorKey: "roles",
      header: () => <div className="text-center font-bold">Assigned Roles</div>,
      cell: ({ row }) => {
        const userRoles = row.original.roles || [];
        const rolesData = userRoles.length
          ? userRoles.map((m) => m.display_name).join(", ")
          : "N/A";
  
        return <div className="text-center font-medium">{rolesData}</div>;
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center font-bold">Actions</div>,
      cell: ({ row }) => {
        const dataUser = row.original;
  
        return (
          <div className="text-center font-medium">
            <Dialog>
                    <DialogTrigger asChild>
                      <Button className="m-2" size="sm" variant="warning">
                        <UserRoundPen />
                      </Button>
                    </DialogTrigger>
                    <DialogPortal>
                      <DialogOverlay className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm" />
                      <DialogContent className="fixed inset-0 z-50 mx-auto mt-4 flex h-[90vh] max-w-2xl flex-col items-center justify-center rounded-lg bg-white p-6 dark:bg-gray-900">
                        <DialogTitle className="mt-2 text-2xl font-bold">Edit User</DialogTitle>
                        <DialogDescription className="mt-2 text-gray-600 dark:text-gray-400">
                          Update user details below.
                        </DialogDescription>
  
                        {/* Message */}
                        {message && <p className="m-2 p-3 dark:bg-green-900">{message}</p>}
  
                        {/* User Form */}
                        <div className="mt-2 w-full max-w-2xl">
                          <EditUserForm onFormSubmit={fetchUsers} userId={dataUser.id} />
                        </div>
  
                        {/* Close Button */}
                        <DialogClose asChild>
                          <Button variant="outline" className="mt-4">
                            Cancel
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </DialogPortal>
                  </Dialog>
  
                  {/* Delete Modal Component */}
                  <DeleteUserModal
                    userId={dataUser.id}
                    userName={dataUser.name}
                    onDeleteSuccess={() => fetchUsers()}
                  />
          </div>
        );
      },
    },
  ];
  