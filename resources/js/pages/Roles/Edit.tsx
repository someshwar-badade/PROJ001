import { useForm, usePage } from '@inertiajs/react';
import RolesLayout from './RolesLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Role {
    id: number;
    name: string;
    display_name: string;
    description: string;
}

export default function Edit() {
    const { role } = usePage<{ role: Role }>().props;
    const { data, setData, put, errors, processing } = useForm({
        name: role.name,
        display_name: role.display_name,
        description: role.description,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/roles/${role.id}`);
    };

    return (
        <RolesLayout title="Edit Role">
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <Label>Name</Label>
                    <Input value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                </div>
                <div>
                    <Label>Display Name</Label>
                    <Input value={data.display_name} onChange={(e) => setData('display_name', e.target.value)} required />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input value={data.description} onChange={(e) => setData('description', e.target.value)} />
                </div>
                <Button type="submit" disabled={processing}>Update</Button>
            </form>
        </RolesLayout>
    );
}