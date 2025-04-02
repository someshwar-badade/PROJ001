import React, { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface EditUserFormProps {
    onFormSubmit: (message: string) => void; // Pass success message to parent component
    userId?: number;
}

export default function EditUserForm({ onFormSubmit, userId }: EditUserFormProps) {
    const { data, setData, put, processing, errors } = useForm({
        id: userId,
        name: "",
        email: "",
        mobile: "",
        password: "",
        password_confirmation: "",
        address: "",
    });

    const [mobileNumbers, setMobileNumbers] = useState<{ phone_number: string }[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(name as keyof typeof data, value);
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

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={processing}>
                {processing ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
}
