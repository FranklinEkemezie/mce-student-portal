import StudentLayout from '@/Layouts/StudentLayout.jsx'
import { Head } from '@inertiajs/react'
import SecondaryLink from "@/Components/SecondaryLink.jsx";

export default function Index({ results }) {
    return (
        <StudentLayout
            header="Results"
        >
            <Head title="Results"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 text-gray-900">
                            <div>
                                <h2 className="text-xl font-bold">Results</h2>
                            </div>

                            <div className="mt-6 overflow-y-auto">
                                <table className="table-auto w-full">
                                    <thead>
                                    <tr className="font-bold bg-gray-100 ">
                                        <th className="text-start px-2 py-4">S/N</th>
                                        <th className="text-start px-2 py-4">
                                            Course
                                            <span className="opacity-60 text-xs ms-2">(Unit)</span>
                                        </th>
                                        <th className="text-start px-2 py-4">Test</th>
                                        <th className="text-start px-2 py-4">Lab</th>
                                        <th className="text-start px-2 py-4">Exam</th>
                                        <th className="text-start px-2 py-4">Total</th>
                                        <th className="text-start px-2 py-4">Grade</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        results.map(([course, result], index) => {

                                            const { id, unit: courseUnit, code: courseCode } = course;

                                            return (
                                                <tr key={id} className="border-b hover:bg-gray-50">
                                                    <td className="p-2">{index + 1}</td>
                                                    <td className="p-2">
                                                        {courseCode}
                                                        <span className="opacity-60 text-sm ms-2"> ({courseUnit})</span>
                                                    </td>
                                                    <td className="p-2">{result['TEST'] || '-'}</td>
                                                    <td className="p-2">{result['LAB'] || '-'}</td>
                                                    <td className="p-2">{result['EXAM'] || '-'}</td>
                                                    <td className="p-2">{result['TOTAL'] || '-'}</td>
                                                    <td className="p-2 text-center">{result['GRADE'] || '-'}</td>
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
        </StudentLayout>
    )
}
