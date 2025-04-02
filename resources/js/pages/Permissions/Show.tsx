import { usePage } from '@inertiajs/react';
import PermissionLayout from './PermissionLayout';

interface Permission {
    id: number;
    name: string;
    display_name: string;
    description: string;
}

export default function Show() {
    const { permission } = usePage<{ permission: Permission }>().props;

    return (
        <PermissionLayout title="Permission Details">
            <div className="space-y-4">
                <p><strong>Name:</strong> {permission.name}</p>
                <p><strong>Display Name:</strong> {permission.display_name}</p>
                <p><strong>Description:</strong> {permission.description}</p>
               
            </div>
        </PermissionLayout>
    );
}