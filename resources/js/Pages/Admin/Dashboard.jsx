import {Head, usePage} from '@inertiajs/react';
import AdminLayout from "@/Layouts/AdminLayout.jsx";


export default function Dashboard({ admin }) {

    const { props } = usePage();

    return (
        <AdminLayout
            admin={admin}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-xl font-bold">Admin Details</h2>

                            <div className="mt-6">
                                <p>
                                    Name: <span className="font-medium">{admin.username}</span>
                                </p>

                                <p>
                                    Email: <span className="font-medium">{admin.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
