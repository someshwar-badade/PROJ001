import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { router, useForm } from "@inertiajs/react";
import { Plus,CircleEllipsis,UserRoundPen,Trash2 } from 'lucide-react';


interface DeleteUserModalProps {
    userId: number;
    userName: string;
    onDeleteSuccess: () => void;
}

export default function DeleteUserModal({ userId, userName, onDeleteSuccess}: DeleteUserModalProps) {
    const { delete: destroy, processing } = useForm();
    const [isOpen, setIsOpen] = React.useState(false); 


    const handleDelete = () => {
        router.delete(route("deleteUser", userId), {
            onSuccess: () => {
                onDeleteSuccess();
                setIsOpen(false);
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="m-2" size="sm" variant="destructive"> <Trash2 className=''/></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription>Are you sure you want to delete {userName}?</DialogDescription>
                <div className="flex justify-end gap-2 mt-4">
                    <Button onClick={() => setIsOpen(false)} variant="secondary">Cancel</Button>
                    <Button variant="destructive" onClick={handleDelete} disabled={processing}>
                        {processing ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
