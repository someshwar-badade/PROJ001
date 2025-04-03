import { Head } from '@inertiajs/react';
import CompanyJobsLayout from './CompanyJobsLayout';

type Props = {
    job: {
        id: number;
        job_name: string;
        dimensions: string;
        job_url: string;
        description: string;
        images: { url: string }[];
    };
};

export default function Show({ job }: Props) {
    return (
        <CompanyJobsLayout title="Job Details">
                    <div className="space-y-4">
                    <p>Job Name: {job.job_name}</p>
                    <p>Dimensions: {job.dimensions}</p>
            <p>URL: <a href={job.job_url}>{job.job_url}</a></p>
            <p>Description: {job.description}</p>
            <h2>Images</h2>
            {job.images.map((image, index) => (
                <img key={index} src={image.url} alt="Job Image" width={200} />
            ))}
                    </div>
                </CompanyJobsLayout>
        
    );
}