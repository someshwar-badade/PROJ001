import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Jobs', href: '/company-jobs' },
];

export default function CompanyJobsLayout({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="p-6 bg-white rounded-lg shadow">
                <div className="flex justify-between mb-4">
                    <h1 className="text-xl font-semibold">{title}</h1>
                    <Link href="/company-jobs/create">
                        <Button>Create Job</Button>
                    </Link>
                </div>
                {children}
            </div>
        </AppLayout>
    );
}