import { useForm } from '@inertiajs/react';
import CompaniesLayout from './CompaniesLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        email: '',
        website: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/companies');
    };

    return (
        <CompaniesLayout title="Add Company">
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <Label>Name</Label>
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                </div>
                <div>
                    <Label>Website</Label>
                    <Input type="url" value={data.website} onChange={(e) => setData('website', e.target.value)} />
                </div>
                <Button type="submit" disabled={processing}>Save</Button>
            </form>
        </CompaniesLayout>
    );
}