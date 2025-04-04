import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import MultiSelectDropdown from "@/pages/usersManage/MultiSelect";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface AddUserFormProps {
  onFormSubmit: (message: string) => void; // Pass success message to parent component
  roles: Array<{ id: number; name: string }>;
  company: Array<{ id: number; name: string }>;
} 

  

export default function AddUserForm({ onFormSubmit,roles, company }: AddUserFormProps) {
  // Initialize form state using useForm
  const { data, setData, get, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    mobile: "",
    password: "",
    password_confirmation: "",
    address: "",
    role_id: [] as number[], // Ensure role_id is an array
    company_id: '',
  });

  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value); 
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleRole = (roleId: number) => {
    setData("role_id", data.role_id.includes(roleId) ? data.role_id.filter((id) => id !== roleId) : [...data.role_id, roleId]);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/add-user", {
      onSuccess: () => {
        console.log("User added successfully!");
        reset(); 
        onFormSubmit("User added successfully!");
      },
    });
  };
  // console.log(company)
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border p-2 w-full border-stone-700 rounded-md"
          value={data.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="border p-2 w-full border-stone-700 rounded-md"
          value={data.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Mobile */}
      <div>
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          className="border p-2 w-full border-stone-700 rounded-md"
          value={data.mobile}
          onChange={handleChange}
        />
        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full border-stone-700 rounded-md"
          value={data.password}
          onChange={handleChange}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      {/* Confirm Password */}
      <div>
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          className="border p-2 w-full  border-stone-700 rounded-md"
          value={data.password_confirmation}
          onChange={handleChange}
        />
      </div>
        <div className="flex flex-row w-full space-x-4">
         {/* Roles Dropdown */}
         <div className="w-[50%]">
          {/* Roles Multi-Select Dropdown */}
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {data.role_id.length > 0
              ? roles.filter((role) => data.role_id.includes(role.id)).map((role) => role.name).join(", ")
              : "Select Roles"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-2 bg-secondary border rounded-md shadow-lg">
          {roles.map((role) => (
            <label key={role.id} className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md">
              <input type="checkbox" value={role.id} checked={data.role_id.includes(role.id)} onChange={() => toggleRole(role.id)} className="mr-2" />
              {role.name}
            </label>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>



          {errors.role_id && <p className="text-red-500 text-sm">{errors.role_id}</p>}
        </div>

        {/* <MultiSelectDropdown roles={roles} selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} /> */}

           
           {/* {errors.role_id && <p className="text-red-500 text-sm">{errors.role_id}</p>}
           </div> */}
            {/* Company Dropdown */}
            <div className="w-[50%]">
            <select name="company_id" value={data.company_id} onChange={handleChange} className="border p-2 w-full  border-stone-700 rounded-md">
                <option className=" bg-secondary " value="">Select Company</option>
                {company.map((comp) => (
                    <option className=" bg-secondary " key={comp.id} value={comp.id}>
                        {comp.name}
                    </option>
                ))}
            </select>
            {errors.company_id && <p className="text-red-500 text-sm">{errors.company_id}</p>}
           </div>
</div>
      {/* Address */}
      {/* <div>
        <textarea
          name="address"
          placeholder="Address"
          className="border p-2 w-full rounded-md"
          value={data.address}
          onChange={handleChange}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
      </div> */}

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={processing}>
        {processing ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
