import { usePage } from '@inertiajs/react';
import CompaniesLayout from './CompaniesLayout';

interface Company {
    id: number;
    name: string;
    email: string;
    website?: string;
}

export default function Show() {
    const { company } = usePage<{ company: Company }>().props;

    return (
        <CompaniesLayout title="Company Details">
            <div className="space-y-4">
                <p><strong>Name:</strong> {company.name}</p>
                <p><strong>Email:</strong> {company.email}</p>
                {company.website && (
                    <p><strong>Website:</strong> <a href={company.website} className="text-blue-600" target="_blank" rel="noopener noreferrer">{company.website}</a></p>
                )}
            </div>
        </CompaniesLayout>
    );
}