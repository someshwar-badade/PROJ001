import { useForm } from '@inertiajs/react';
import CompanyJobsLayout from './CompanyJobsLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Create() {
    const { data, setData, post, processing } = useForm({
        job_name: '',
        dimensions: '',
        job_url: '',
        description: '',
        images: [] as File[]
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/company-jobs');
    };

    return (
        <CompanyJobsLayout title="Add Job">
        <form onSubmit={submit} className="space-y-6">
                <div>
                    <Label>Job Name</Label>
                    <Input value={data.job_name} onChange={(e) => setData('job_name', e.target.value)} required />
                </div>
                <div>
                    <Label>dimensions</Label>
                    <Input value={data.dimensions} onChange={(e) => setData('dimensions', e.target.value)} required />
                </div>
                <div>
                    <Label>job_url</Label>
                    <Input value={data.job_url} onChange={(e) => setData('job_url', e.target.value)} required />
                </div>
                <div>
                    <Label>Description</Label>
                    <Textarea placeholder="Type your message here." value={data.description} onChange={(e) => setData('description', e.target.value)} required />
                    
                </div>
              <input type="file" multiple onChange={(e) => setData('images', e.target.files ? Array.from(e.target.files) : [])} />
            <Button type="submit" disabled={processing}>Create</Button>
        </form>
        </CompanyJobsLayout>
    );
}