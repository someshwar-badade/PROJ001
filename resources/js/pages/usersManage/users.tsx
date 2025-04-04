import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogOverlay,
    DialogPortal,
    DialogTitle,
    DialogTrigger,
} from '@radix-ui/react-dialog';
import { Plus, UserRoundPen } from 'lucide-react';
import { useEffect, useState } from 'react';
import DeleteUserModal from './deleteUser';
import EditUserForm from './editUserForm';
import AddUserForm from './userForm';
// import './users.css';
import UsersPaginate from './usersPaginate';
import { getColumns, User } from '@/components/data-table-components/Columns';
import { DataTable } from '@/components/data-table-components/Data-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/manageusers',
    },
];

interface PaginatedUsers {
    data: User[];
    // data: Array<{
    //     id: number;
    //     name: string;
    //     email: string;
    //     mobile?: { mobile: string }[];
    // }>;
    // links: Array<{ url: string | null; label: string; active: boolean }>;
    // meta: {
    //     current_page: number;
    //     last_page: number;
    //     per_page: number;
    //     total: number;
    // };
}

export default function users() {
    const { props } = usePage(); //  Get Inertia page props

    const [message, setMessage] = useState('');
    const [roles, setRoles] = useState<Array<{ id: number; name: string }>>([]);
const [company, setCompany] = useState<Array<{ id: number; name: string }>>([]);

    const [users, setUsers] = useState<PaginatedUsers>({
        data: [],
        // data: [],
        // links: [],
        // meta: { current_page: 1, last_page: 1, per_page: 10, total: 0 },
});

    // Function to reload users after form submission
    const fetchUsers = (messageString: string) => {
        setMessage(messageString);
        setTimeout(() => {
            setMessage('');
        }, 2000);

        router.reload({ only: ['users'] }); // Reload only users
    };

    useEffect(() => {
        if (props.users && typeof props.users === 'object') {
            const newUsers = props.users  as PaginatedUsers;
            setUsers({
                data: Array.isArray(newUsers.data) ? newUsers.data : [],

                // data: Array.isArray(newUsers) ? newUsers : [],
                // links: Array.isArray(newUsers.links) ? newUsers.links : [],
                // meta:
                //     typeof newUsers.meta === 'object'
                //         ? newUsers.meta
                //         : {
                //               current_page: 1,
                //               last_page: 1,
                //               per_page: 10,
                //               total: 0,
                //           },
            });

            if (Array.isArray(props.roles)) {
              setRoles(props.roles);
          }
      
          if (Array.isArray(props.companies)) {
              setCompany(props.companies);
          }
        }
    }, [props.users,props.roles, props.companies]);

    function getData(): User[] {
        // console.log(roles)
        return users.data;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="users-main-div flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                    <div className="relative overflow-hidden"></div>
                    <div className="relative overflow-hidden"></div>
                    <div className="relative overflow-hidden"></div>

                    <div className="relative grid h-[60px] overflow-hidden md:col-span-2">
                        <Dialog>
                            {/* Button to Open Dialog */}
                            <DialogTrigger asChild>
                                <Button className="absolute self-end justify-self-end" size="lg" variant="secondary">
                                    <Plus className="mr-2" /> Add User
                                </Button>
                            </DialogTrigger>

                            {/* Fullscreen Dialog */}
                            <DialogPortal>
                                <DialogOverlay className="fixed inset-0 z-99 bg-black/10 backdrop-blur-sm" />

                                <DialogContent className="fixed inset-0 z-99 mx-auto mt-4 flex h-[90vh] max-w-2xl flex-col items-center justify-center rounded-lg bg-white p-6 dark:bg-gray-900">
                                    <DialogTitle className="mt-2 text-2xl font-bold">Add New User</DialogTitle>
                                    <DialogDescription className="mt-2 text-gray-600 dark:text-gray-400">Enter user details below.</DialogDescription>

                                    {/* User Form */}
                                    <div className="mt-2 w-full max-w-2xl">
                                        {message ? <p className="m-2 p-3 dark:bg-green-900">{message}</p> : ''}
                                        <AddUserForm onFormSubmit={fetchUsers} roles={roles} company={company} />
                                    </div>

                                    {/* Close Button */}
                                    <DialogClose asChild>
                                        <Button variant="outline" className="mt-4">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                </DialogContent>
                            </DialogPortal>
                        </Dialog>
                    </div>
                </div>
                {/* Users Table */}
                <div className=" ">
                   
                <DataTable 
                    columns={getColumns(() => fetchUsers, message,roles,company)} 
                    data={getData()} 
                    />
                    
                
                   

                    {/* <UsersPaginate links={users.links} /> */}
                </div>
            </div>
        </AppLayout>
    );
}
