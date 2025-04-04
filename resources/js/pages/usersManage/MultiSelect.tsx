import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Role {
  id: number;
  name: string;
}

interface MultiSelectDropdownProps {
  roles: Role[];
  selectedRoles: number[];
  setSelectedRoles: (roles: number[]) => void;
}

export default function MultiSelectDropdown({ roles, selectedRoles, setSelectedRoles }: MultiSelectDropdownProps) {
  const toggleRole = (roleId: number) => {
    setSelectedRoles(
      selectedRoles.includes(roleId)
        ? selectedRoles.filter((id) => id !== roleId) // Remove if already selected
        : [...selectedRoles, roleId] // Add if not selected
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          {/* {selectedRoles.length > 0
            ? roles
                .filter((role) => selectedRoles.includes(role.id))
                .map((role) => role.name)
                .join(", ")
            : "Select Roles"} */}
            Select Roles
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2">
        {roles.map((role) => (
          <DropdownMenuCheckboxItem
            key={role.id}
            checked={selectedRoles.includes(role.id)}
            onCheckedChange={() => toggleRole(role.id)}
          >
            {role.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
