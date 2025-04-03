import { Head, Link } from '@inertiajs/react';
import CompanyJobsLayout from './CompanyJobsLayout';
import { Button } from '@/components/ui/button';
type CompanyJob = {
    id: number;
    job_name: string;
    dimensions: string;
};

type Props = {
    jobs: CompanyJob[];
};

export default function Index({ jobs }: Props) {
    return (
        <CompanyJobsLayout title="Job List">       
            <ul className="space-y-3">
            {jobs.map((job) => (
                    <li key={job.id} className="flex justify-between p-4 bg-gray-100 rounded-lg">
                        <div>
                            <p className="font-medium">{job.job_name}</p>
                            <p className="text-sm text-gray-500">{job.dimensions}</p>
                            
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/company-jobs/${job.id}/edit`}>
                                <Button>Edit</Button>
                            </Link>
                            <Link href={`/company-jobs/${job.id}`}>
                                <Button variant="outline">View</Button>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </CompanyJobsLayout>
    );
}