import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface EditUserFormProps {
    onFormSubmit: (message: string) => void; // Pass success message to parent component
    userId?: number;
    roles: Array<{ id: number; name: string }>;
    company: Array<{ id: number; name: string }>;
}

export default function EditUserForm({ onFormSubmit, userId,roles, company }: EditUserFormProps) {
    const { data, setData, put, processing, errors } = useForm({
        id: userId,
        name: "",
        email: "",
        mobile: "",
        password: "",
        password_confirmation: "",
        address: "",
        role_id: [] as number[],
        company_id: "",
    });

    const [mobileNumbers, setMobileNumbers] = useState<{ phone_number: string }[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
    };

     const [dropdownOpen, setDropdownOpen] = useState(false);
    
     const toggleRole = (roleId: number) => {
        setData(
          "role_id",
          data.role_id.includes(roleId)
            ? data.role_id.filter((id) => id !== roleId)
            : [...data.role_id, roleId]
        );
      };

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
        }
       
    }, [userId]);
    
    const fetchUser = async (userId: number) => {
        try {
            const response = await axios.get(`/get-edit-user-details/${userId}`);
            if (response?.data?.user) {
                const user = response.data.user;

                setData({
                    id: userId,
                    name: user.name ?? "",
                    email: user.email ?? "",
                    mobile: "",
                    address: user.address ?? "",
                    password: "",
                    password_confirmation: "",
                    role_id: user.roles?.map((r: any) => r.id) ?? [],
                    company_id: user.company_id ?? "",
                });

                setMobileNumbers(Array.isArray(user.mobile) ? user.mobile : []);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put("update-user", {
            onSuccess: () => {
                console.log("User updated successfully!");
                fetchUser(userId!); // Refresh user details after update
                onFormSubmit("User updated successfully!");
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 h-[100%] p-2 overflow-x-auto">
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

            {/* Mobile Numbers */}
            {(mobileNumbers.length > 0) ? 
            (<div className=" border p-2 mt-2 rounded-md">
                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    className="border p-2 w-full rounded-md"
                    value={data.mobile}
                    onChange={handleChange}
                />
                {/* ✅ Corrected map function */}
               
                    <p className="text-green-600">Available Numbers </p>
                    {mobileNumbers.map((moNo, index) => (
                        <span key={index} className=" text-gray-400">
                            {moNo.phone_number+' , '}
                        </span>
                    ))}
                {/* </div> */}
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
            </div>)
            : 
            (
                <div>
                      <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    className="border p-2 w-full rounded-md"
                    value={data.mobile}
                    onChange={handleChange}
                />
                {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                </div>
            )}

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
                    className="border p-2 w-full border-stone-700 rounded-md"
                    value={data.password_confirmation}
                    onChange={handleChange}
                />
            </div>
             {/* Role & Company Dropdowns */}
      <div className="flex flex-row w-full space-x-4">
        {/* Roles Dropdown */}
        <div className="w-1/2">
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between overflow-hidden">
                {data.role_id.length > 0
                  ? roles
                      .filter((role) => data.role_id.includes(role.id))
                      .map((role) => role.name)
                      .join(", ")
                  : "Select Roles"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2 bg-secondary border rounded-md shadow-lg">
              {roles.map((role) => (
                <label
                  key={role.id}
                  className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                >
                  <input
                    type="checkbox"
                    value={role.id}
                    checked={data.role_id.includes(role.id)}
                    onChange={() => toggleRole(role.id)}
                    className="mr-2"
                  />
                  {role.name}
                </label>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {errors.role_id && <p className="text-red-500 text-sm">{errors.role_id}</p>}
        </div>

        {/* Company Dropdown */}
        <div className="w-1/2">
          <select
            name="company_id"
            value={data.company_id}
            onChange={handleChange}
            className="border p-2 w-full border-stone-700 rounded-md"
          >
            <option className="bg-secondary" value="">Select Company</option>
            {company.map((comp) => (
              <option className="bg-secondary" key={comp.id} value={comp.id}>
                {comp.name}
              </option>
            ))}
          </select>
          {errors.company_id && <p className="text-red-500 text-sm">{errors.company_id}</p>}
        </div>
      </div>


            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={processing}>
                {processing ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
}
