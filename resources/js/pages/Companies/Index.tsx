import { Link, usePage } from '@inertiajs/react';
import CompaniesLayout from './CompaniesLayout';
import { Button } from '@/components/ui/button';

interface Company {
    id: number;
    name: string;
    email: string;
    website?: string;
}

export default function Index() {
    const { companies } = usePage<{ companies: Company[] }>().props;

    return (
        <CompaniesLayout title="Company List">
            <ul className="space-y-3">
                {companies.map((company) => (
                    <li key={company.id} className="flex justify-between p-4 bg-gray-100 rounded-lg">
                        <div>
                            <p className="font-medium">{company.name}</p>
                            <p className="text-sm text-gray-500">{company.email}</p>
                            {company.website && (
                                <p className="text-sm text-blue-600">
                                    <a href={company.website} target="_blank" rel="noopener noreferrer">
                                        {company.website}
                                    </a>
                                </p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/companies/${company.id}/edit`}>
                                <Button>Edit</Button>
                            </Link>
                            <Link href={`/companies/${company.id}`}>
                                <Button variant="outline">View</Button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </CompaniesLayout>
    );
}