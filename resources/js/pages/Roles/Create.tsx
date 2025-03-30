import { useForm } from '@inertiajs/react';
import RolesLayout from './RolesLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create() {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        display_name: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/roles');
    };

    return (
        <RolesLayout title="Add Role">
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
                <Button type="submit" disabled={processing}>Save</Button>
            </form>
        </RolesLayout>
    );
}