import { usePage } from '@inertiajs/react';
import RolesLayout from './RolesLayout';

interface Role {
    id: number;
    name: string;
    display_name: string;
    description: string;
}

export default function Show() {
    const { role } = usePage<{ role: Role }>().props;

    return (
        <RolesLayout title="Role Details">
            <div className="space-y-4">
                <p><strong>Name:</strong> {role.name}</p>
                <p><strong>Display Name:</strong> {role.display_name}</p>
                <p><strong>Description:</strong> {role.description}</p>
               
            </div>
        </RolesLayout>
    );
}