import { Link, usePage } from '@inertiajs/react';
import PermissionLayout from './PermissionLayout';
import { Button } from '@/components/ui/button';

interface Permission {
    id: number;
    name: string;
    display_name: string;
    description: string;
}

export default function Index() {
    const { permissions } = usePage<{ permissions: Permission[] }>().props;

    return (
        <PermissionLayout title="Permission List">
            <ul className="space-y-3">
                {permissions.map((permission) => (
                    <li key={permission.id} className="flex justify-between p-4 bg-gray-100 rounded-lg">
                        <div>
                            <p className="font-medium">{permission.name} ({permission.display_name})</p>
                            <p className="text-sm text-gray-500">{permission.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/permissions/${permission.id}/edit`}>
                                <Button>Edit</Button>
                            </Link>
                            <Link href={`/permissions/${permission.id}`}>
                                <Button variant="outline">View</Button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </PermissionLayout>
    );
}