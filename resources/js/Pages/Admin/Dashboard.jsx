import {Head, usePage} from '@inertiajs/react';
import AdminLayout from "@/Layouts/AdminLayout.jsx";

export default function Dashboard({  }) {

    const { props: { auth: { user } } } = usePage();

    return (
        <AdminLayout header="Admin Dashboard">

            {/* Meta title */}
            <Head title="Admin Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-xl font-bold">Admin Details</h2>

                            <div className="mt-6">
                                <p>
                                    Username: <span className="font-medium">{user.username}</span>
                                </p>

                                <p>
                                    Email: <span className="font-medium">{user.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AdminLayout>
    )
}
