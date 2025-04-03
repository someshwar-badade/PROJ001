import { useForm } from '@inertiajs/react';
import CompanyJobsLayout from './CompanyJobsLayout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
type Props = {
    job: {
        id: number;
        job_name: string;
        dimensions: string;
        job_url: string;
        description: string;
    };
};

export default function Edit({ job }: Props) {
    const { data, setData, put, processing } = useForm({
        job_name: job.job_name,
        dimensions: job.dimensions,
        job_url: job.job_url,
        description: job.description,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/company-jobs/${job.id}`);
    };

    return (
        <CompanyJobsLayout title="Edit Job">     
        
        <form onSubmit={submit} className="space-y-6">
                
                <div>
                    <Label>Job Name</Label>
                    <Input value={data.job_name} onChange={(e) => setData('job_name', e.target.value)} required />
                </div>
                <div>
                    <Label>Dimensions</Label>
                    <Input value={data.dimensions} onChange={(e) => setData('dimensions', e.target.value)} required />
                </div>
                <div>
                    <Label>Job URL</Label>
                    <Input value={data.job_url} onChange={(e) => setData('job_url', e.target.value)} required />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input value={data.description} onChange={(e) => setData('description', e.target.value)} required />
                </div>
             
            <Button type="submit" disabled={processing}>Update</Button>
        </form>
        </CompanyJobsLayout>
    );
}