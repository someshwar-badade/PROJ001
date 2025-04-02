import { useForm, usePage } from '@inertiajs/react';
import CompaniesLayout from './CompaniesLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Company {
    id: number;
    name: string;
    email: string;
    website?: string;
}

export default function Edit() {
    const { company } = usePage<{ company: Company }>().props;
    const { data, setData, put, errors, processing } = useForm({
        name: company.name,
        email: company.email,
        website: company.website || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/companies/${company.id}`);
    };

    return (
        <CompaniesLayout title="Edit Company">
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
                <Button type="submit" disabled={processing}>Update</Button>
            </form>
        </CompaniesLayout>
    );
}