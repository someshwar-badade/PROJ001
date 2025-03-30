import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Roles', href: '/roles' },
];

export default function RolesLayout({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="p-6 bg-white rounded-lg shadow">
                <div className="flex justify-between mb-4">
                    <h1 className="text-xl font-semibold">{title}</h1>
                    <Link href="/roles/create">
                        <Button>Add Role</Button>
                    </Link>
                </div>
                {children}
            </div>
        </AppLayout>
    );
}