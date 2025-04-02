import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

interface AddUserFormProps {
  onFormSubmit: (message: string) => void; // Pass success message to parent component
} 

  

export default function AddUserForm({ onFormSubmit }: AddUserFormProps) {
  // Initialize form state using useForm
  const { data, setData, get, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    mobile: "",
    password: "",
    password_confirmation: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(name as keyof typeof data, value); 
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
          className="border p-2 w-full rounded-md"
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
