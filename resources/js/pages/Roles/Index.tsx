import { Link, usePage } from '@inertiajs/react';
import RolesLayout from './RolesLayout';
import { Button } from '@/components/ui/button';

interface Role {
    id: number;
    name: string;
    display_name: string;
    description: string;
}

export default function Index() {
    const { roles } = usePage<{ roles: Role[] }>().props;

    return (
        <RolesLayout title="Role List">
            <ul className="space-y-3">
                {roles.map((role) => (
                    <li key={role.id} className="flex justify-between p-4 bg-gray-100 rounded-lg">
                        <div>
                            <p className="font-medium">{role.name} ({role.display_name})</p>
                            <p className="text-sm text-gray-500">{role.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/roles/${role.id}/edit`}>
                                <Button>Edit</Button>
                            </Link>
                            <Link href={`/roles/${role.id}`}>
                                <Button variant="outline">View</Button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </RolesLayout>
    );
}