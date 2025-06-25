import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, usePage} from '@inertiajs/react';

/**
 *
 * @param student {{
 *     first_name: string,
 *     last_name: string,
 *     reg_no: string,
 *     user: {
 *         email: string
 *     }
 * }}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Dashboard({ student }) {

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-xl font-bold">User Details</h2>

                            <div className="mt-6">
                                <p>
                                    First Name: <span className="font-medium">{student.first_name}</span>
                                </p>
                                <p>
                                    Last Name: <span className="font-medium">{student.last_name}</span>
                                </p>
                                <p>
                                    Reg. No.: <span className="font-medium">{student.reg_no}</span>
                                </p>
                                <p>
                                    Email: <span className="font-medium">{student.user.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
