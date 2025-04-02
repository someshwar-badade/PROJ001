import React from "react";
import { Link } from "@inertiajs/react";

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface UsersPaginateProps {
  links: PaginationLink[];
}

const UsersPaginate: React.FC<UsersPaginateProps> = ({ links = [] }) => {
  return (
    <div className="pagination flex justify-center gap-2 mt-4">
      {links?.map((link, index) => (
        <Link
          key={index}
          href={link.url || "#"}
          className={`px-3 py-2 border rounded ${
            link.active ? "bg-blue-500 text-white" : "bg-gray-800"
          }`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
};

export default UsersPaginate;
