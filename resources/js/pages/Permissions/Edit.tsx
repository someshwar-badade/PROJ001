import { useForm, usePage } from '@inertiajs/react';
import PermissionLayout from './PermissionLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Permission {
    id: number;
    name: string;
    display_name: string;
    description: string;
}

export default function Edit() {
    const { permission } = usePage<{ permission: Permission }>().props;
    const { data, setData, put, errors, processing } = useForm({
        name: permission.name,
        display_name: permission.display_name,
        description: permission.description,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/permissions/${permission.id}`);
    };

    return (
        <PermissionLayout title="Edit Permission">
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
        </PermissionLayout>
    );
}