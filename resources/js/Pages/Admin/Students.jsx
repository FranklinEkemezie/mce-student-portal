import {Head, usePage} from '@inertiajs/react';
import AdminLayout from "@/Layouts/AdminLayout.jsx";


export default function Dashboard({ admin, students }) {

    const {
        data: students_data,
        from, to
    } = students;
    console.log(students);

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
                            <h2 className="text-xl font-bold">Students ({from} - {to})</h2>

                            <div className="mt-6 overflow-y-auto">
                                <table className="w-full">
                                    <thead>
                                    <tr className="font-bold bg-gray-100 ">
                                        <th className="text-start px-2 py-4">S/N</th>
                                        <th className="text-start px-2 py-4">First Name</th>
                                        <th className="text-start px-2 py-4">Last Name</th>
                                        <th className="text-start px-2 py-4">Reg. No.</th>
                                        <th className="text-start px-2 py-4">Email</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        students_data.map((student, index) => {
                                            const { firstname, lastname, reg_no, user: { email } } = student;

                                            return (
                                                <tr key={reg_no} className="border-b hover:bg-gray-50">
                                                    <td className="p-2">{from + index}</td>
                                                    <td className="p-2">{firstname}</td>
                                                    <td className="p-2">{lastname}</td>
                                                    <td className="p-2">{reg_no}</td>
                                                    <td className="p-2">{email}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>

                            <div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
