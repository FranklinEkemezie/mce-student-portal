import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'
import PrimaryLink from "@/Components/SecondaryLink.jsx";
import SecondaryLink from "@/Components/SecondaryLink.jsx";

export default function Index({ results }) {


    return (
        <AdminLayout
            header="Published Results"
        >
            <Head title="Published Results" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 text-gray-900">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Published Results</h2>
                                <div>
                                    <PrimaryLink href={route('admin.results.create')}>Upload Result</PrimaryLink>
                                </div>
                            </div>

                            <div className="mt-6 overflow-y-auto">
                                <table className="table-auto w-full">
                                    <thead>
                                    <tr className="font-bold bg-gray-100 ">
                                        <th className="text-start px-2 py-4">S/N</th>
                                        <th className="text-start px-2 py-4">Course</th>
                                        <th className="text-start px-2 py-4">Session</th>
                                        <th className="text-start px-2 py-4">Created At</th>
                                        <th className="text-start px-2 py-4">Updated At</th>
                                        <th className="text-start px-2 py-4">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        results.map((result, index) => {
                                            const {
                                                id, session, created_at, updated_at,
                                                course: {code: courseCode}
                                            } = result;

                                            return (
                                                <tr key={id} className="border-b hover:bg-gray-50">
                                                    <td className="p-2">{index + 1}</td>
                                                    <td className="p-2">{courseCode}</td>
                                                    <td className="p-2">{session}</td>
                                                    <td className="p-2">{new Date(created_at).toLocaleString()}</td>
                                                    <td className="p-2">{new Date(updated_at).toLocaleString()}</td>
                                                    <td className="p-2">
                                                        <SecondaryLink href={`/results/${id}`}>
                                                            View Result
                                                        </SecondaryLink>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </AdminLayout>
    )
}
