import {Head, usePage} from '@inertiajs/react';
import StudentLayout from "@/Layouts/StudentLayout.jsx";

export default function Dashboard({ student }) {

    const { props: { auth: { user }} } = usePage();

    const { student: studentInfo } = user;

    return (
        <StudentLayout header="Dashboard">

            {/* Meta title */}
            <Head title="Student Dashboard"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm rounded sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-xl font-bold">User Details</h2>

                            <div className="mt-6">
                                <p>
                                    First Name: <span className="font-medium">{studentInfo.first_name}</span>
                                </p>
                                <p>
                                    Last Name: <span className="font-medium">{studentInfo.last_name}</span>
                                </p>
                                <p>
                                    Reg. No.: <span className="font-medium">{studentInfo.reg_no}</span>
                                </p>
                                <p>
                                    Email: <span className="font-medium">{user.email}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </StudentLayout>
    )

}
